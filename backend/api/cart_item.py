from models.user import CartItem
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
    get_current_user,
)

from models.message import Message
from models.cart_item import (
    CartItems,
    CartItemCreate,
    CartItemPublic,
    CartItemUpdate,
)
from core.logging import logger

# Create a router for cart items
router = APIRouter()

@router.get(
    "/",
    dependencies=[Depends(get_current_user)],
    response_model=CartItems,
)
def index(
    db: SessionDep,
    name: str = "",
    page: int = Query(default=1, gt=0),
    per_page: int = Query(default=20, le=100),
) -> CartItems:
    """
    Retrieve cart_items.
    """
    query = {"name": name}
    filters = crud.cart_item.build_query(query)

    count_statement = select(func.count()).select_from(CartItem)
    if filters:
        count_statement = count_statement.where(or_(*filters))
    total_count = db.exec(count_statement).one()

    cart_items = crud.cart_item.get_multi(
        db=db,
        filters=filters,
        per_page=per_page,
        offset=(page - 1) * per_page,
    )

    total_pages = (total_count // per_page) + (total_count % per_page > 0)

    return CartItems(
        cart_items=cart_items,
        page=page,
        per_page=per_page,
        total_pages=total_pages,
        total_count=total_count,
    )


@router.post(
    "/", dependencies=[Depends(get_current_user)], response_model=CartItemPublic
)
def create(*, db: SessionDep, create_data: CartItemCreate) -> CartItemPublic:
    """
    Create new cart_item.
    """
    cart_item = crud.cart_item.get_by_key(db=db, value=create_data.name)
    if cart_item:
        raise HTTPException(
            status_code=400,
            detail="The cart item already exists in the system.",
        )

    cart_item = crud.cart_item.create(db=db, obj_in=create_data)
    return cart_item


@router.get("/{id}", response_model=CartItemPublic)
def read(
    id: int, db: SessionDep
) -> CartItemPublic:
    """
    Get a specific cart_item by id.
    """
    if cart_item := crud.cart_item.get(db=db, id=id):
        return cart_item
    else:
        raise HTTPException(status_code=404, detail="Cart item not found")


@router.patch(
    "/{id}",
    dependencies=[Depends(get_current_user)],
    response_model=CartItemPublic,
)
def update(
    *,
    db: SessionDep,
    id: int,
    update_data: CartItemUpdate,
) -> CartItemPublic:
    """
    Update a cart_item.
    """
    db_cartitem = crud.cart_item.get(db=db, id=id)
    if not db_cartitem:
        raise HTTPException(
            status_code=404,
            detail="Cartitem not found",
        )

    try:
        db_cartitem = crud.cart_item.update(db=db, db_obj=db_cartitem, obj_in=update_data)
        return db_cartitem
    except IntegrityError as e:
        logger.error(f"Error updating tag - {e.orig.pgerror}")
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
    Delete a cart_item.
    """
    try:
        cart_item = crud.cart_item.get(db=db, id=id)
        if not cart_item:
            raise HTTPException(status_code=404, detail="Cart item not found")
        crud.cart_item.remove(db=db, id=id)
        return Message(message="Cart item deleted successfully")
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        ) from e
