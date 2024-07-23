from models.user import Cart
from core import deps
from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Query,
)
from sqlalchemy.exc import IntegrityError
from sqlmodel import func, or_, select

import crud
from core.deps import (
    CurrentUser,
    SessionDep,
    get_cart_path_param,
    get_current_active_superuser,
    get_current_user,
)

from models.message import Message
from models.cart import (
    CartPublic,
    Carts,
    CartUpdate,
)
from core.logging import logger

# Create a router for carts
router = APIRouter()

@router.get(
    "/",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=Carts,
)
def index(
    db: SessionDep,
    name: str = "",
    page: int = Query(default=1, gt=0),
    per_page: int = Query(default=20, le=100),
) -> Carts:
    """
    Retrieve carts.
    """
    query = {"name": name}
    filters = crud.cart.build_query(query)

    count_statement = select(func.count()).select_from(Cart)
    if filters:
        count_statement = count_statement.where(or_(*filters))
    total_count = db.exec(count_statement).one()

    carts = crud.cart.get_multi(
        db=db,
        filters=filters,
        per_page=per_page,
        offset=(page - 1) * per_page,
    )

    total_pages = (total_count // per_page) + (total_count % per_page > 0)

    return Carts(
        Carts=carts,
        page=page,
        per_page=per_page,
        total_pages=total_pages,
        total_count=total_count,
    )


@router.get("/{id}", dependencies=[Depends(get_cart_path_param)],response_model=CartPublic)
def read(
    cart: deps.CurrentCart
) -> CartPublic:
    """
    Get a specific cart by id.
    """
    return cart


@router.patch(
    "/{id}",
    dependencies=[Depends(get_current_user)],
    response_model=CartPublic,
)
def update(
    *,
    db: SessionDep,
    db_cart: deps.CurrentCart,
    update_data: CartUpdate,
) -> CartPublic:
    """
    Update a cart.
    """

    try:
        db_cart = crud.cart.update(db=db, db_obj=db_cart, obj_in=update_data)
        return db_cart
    except IntegrityError as e:
        logger.error(f"Error updating tag, {e.orig.pgerror}")
        raise HTTPException(
            status_code=422, detail=str(e.orig.pgerror)
        ) from e
    except Exception as e:
        logger.error(e)
        raise HTTPException(
            status_code=400,
            detail=str(e),
        ) from e


@router.delete("/{id}", dependencies=[Depends(get_current_user)])
def delete(db: SessionDep, id: int) -> Message:
    """
    Delete a cart.
    """
    try:
        cart = crud.cart.get(db=db, id=id)
        if not cart:
            raise HTTPException(status_code=404, detail="Cart not found")
        crud.cart.remove(db=db, id=id)
        return Message(message="Cart deleted successfully")
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        ) from e
