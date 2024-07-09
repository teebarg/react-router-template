from typing import Any

from fastapi import (
    APIRouter,
    HTTPException,
    Query,
)
from sqlmodel import func, or_, select

import crud
from core.deps import (
    SessionDep,
)
from models.message import Message
from models.product import (
    Product,
    ProductCreate,
    ProductPublic,
    Products,
    ProductUpdate,
)

# Create a router for products
router = APIRouter()


@router.get(
    "/",
    response_model=Products,
)
def index(
    db: SessionDep,
    name: str = "",
    page: int = Query(default=1, gt=0),
    per_page: int = Query(default=20, le=100),
) -> Any:
    """
    Retrieve products.
    """
    query = {"name": name}
    filters = crud.product.build_query(query)

    count_statement = select(func.count()).select_from(Product)
    if filters:
        count_statement = count_statement.where(or_(*filters))
    total_count = db.exec(count_statement).one()

    products = crud.product.get_multi(
        db=db,
        filters=filters,
        per_page=per_page,
        offset=(page - 1) * per_page,
    )

    total_pages = (total_count // per_page) + (total_count % per_page > 0)

    return Products(
        products=products,
        page=page,
        per_page=per_page,
        total_pages=total_pages,
        total_count=total_count,
    )


@router.post("/", response_model=ProductPublic)
def create(*, db: SessionDep, product_in: ProductCreate) -> ProductPublic:
    """
    Create new product.
    """
    product = crud.product.get_by_key(db=db, value=product_in.name)
    if product:
        raise HTTPException(
            status_code=400,
            detail="The product already exists in the system.",
        )

    product = crud.product.create(db=db, obj_in=product_in)
    return product


@router.get("/{id}", response_model=ProductPublic)
def read(id: int, db: SessionDep) -> ProductPublic:
    """
    Get a specific product by id.
    """
    if product := crud.product.get(db=db, id=id):
        return product
    else:
        raise HTTPException(status_code=404, detail="Product not found")


@router.patch(
    "/{id}",
    response_model=ProductPublic,
)
def update(
    *,
    db: SessionDep,
    id: int,
    product_in: ProductUpdate,
) -> ProductPublic:
    """
    Update a product.
    """
    db_product = crud.product.get(db=db, id=id)
    if not db_product:
        raise HTTPException(
            status_code=404,
            detail="Product not found",
        )
    db_product = crud.product.update(db=db, db_obj=db_product, obj_in=product_in)
    return db_product


@router.delete("/{id}")
def delete(db: SessionDep, id: int) -> Message:
    """
    Delete a product.
    """
    product = crud.product.get(db=db, id=id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    crud.product.remove(db=db, id=id)
    return Message(message="Product deleted successfully")
