from typing import Annotated, Generator, Union

import firebase_admin
import jwt
from fastapi import Cookie, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from firebase_admin import credentials, storage
from google.cloud.storage.bucket import Bucket
from jwt.exceptions import InvalidTokenError
from pydantic import ValidationError
from sqlmodel import Session

import crud
from core import security
from core.config import settings
from core.logging import logger
from db.engine import engine
from models.token import TokenPayload
from models.user import Cart, User

reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_V1_STR}/auth/login/access-token"
)


def get_db() -> Generator:
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_db)]
TokenDep = Annotated[str, Depends(reusable_oauth2)]
# TokenDep2 = Annotated[str, Depends(APIKeyHeader(name="X-Auth"))]
TokenDep2 = Annotated[Union[str, None], Cookie()]


def get_storage() -> Generator:
    try:
        if not firebase_admin._apps:  # Check if the app is not already initialized
            cred = credentials.Certificate(settings.FIREBASE_CRED)
            firebase_admin.initialize_app(
                cred, {"storageBucket": settings.STORAGE_BUCKET}
            )

        # Get a reference to the bucket
        yield storage.bucket()
    except Exception as e:
        logger.error(f"storage init error, {e}")
        raise
    finally:
        logger.debug("storage closed")


Storage = Annotated[Bucket, Depends(get_storage)]


def get_current_user(session: SessionDep, access_token: TokenDep2) -> User:
    try:
        payload = jwt.decode(
            access_token, settings.SECRET_KEY, algorithms=[security.ALGORITHM]
        )
        token_data = TokenPayload(**payload)
    except (InvalidTokenError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
        ) from None
    user = crud.user.get_by_email(db=session, email=token_data.sub)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return user


def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)]
) -> User:
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthenticated user"
        )
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


CurrentUser = Annotated[User, Depends(get_current_user)]

def get_cart(
    db: SessionDep, current_user: CurrentUser
) -> Cart:
    if cart := crud.cart.get_by_key(db=db, key="user_id", value=current_user.id):
        return cart
    
    cart = Cart(**{"user_id": current_user.id})
    db.add(cart)
    db.commit()
    db.refresh(cart)
    return cart


def get_cart_path_param(
    id: str, db: SessionDep, current_user: CurrentUser
) -> Cart:
    if cart := crud.cart.get(db=db, id=id):
        if current_user.id != cart.user_id:
            raise HTTPException(
                status_code=401, detail="Unauthorized to access this cart."
            )
        return cart
    raise HTTPException(status_code=404, detail="Cart not found.")


UserCart = Annotated[Cart, Depends(get_cart)]
CurrentCart = Annotated[Cart, Depends(get_cart_path_param)]


def get_current_active_superuser(current_user: CurrentUser) -> User:
    if not current_user.is_superuser:
        raise HTTPException(
            status_code=403, detail="The user doesn't have enough privileges"
        )
    return current_user


AdminUser = Annotated[User, Depends(get_current_active_superuser)]
