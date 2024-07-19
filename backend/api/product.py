from io import BytesIO
from typing import Annotated, Any

from fastapi import (
    APIRouter,
    BackgroundTasks,
    File,
    Form,
    HTTPException,
    Query,
    UploadFile,
)
from sqlmodel import func, select

import crud
from core import deps
from core.deps import (
    SessionDep,
)
from core.logging import logger
from models.message import Message
from models.product import (
    Product,
    ProductCreate,
    ProductPublic,
    Products,
    ProductUpdate,
)
from services.export import export, process_file, validate_file

# Create a router for products
router = APIRouter()


@router.get(
    "/",
    response_model=Products,
)
async def index(
    db: SessionDep,
    sizes: str = None,
    name: str = "",
    tag: str = "",
    collection: str = "",
    maxPrice: int = Query(default=1000000, gt=0),
    minPrice: int = Query(default=1, gt=0),
    page: int = Query(default=1, gt=0),
    per_page: int = Query(default=20, le=100),
) -> Any:
    """
    Retrieve products.
    """
    query = {
        "name": name,
        "tag": tag,
        "collection": collection,
        "sizes": sizes,
        "price": [minPrice, maxPrice],
    }

    count_statement = select(func.count()).select_from(Product)
    count_statement = crud.product.generate_statement(
        statement=count_statement, query=query
    )
    print(count_statement)
    total_count = db.exec(count_statement).one()

    products = crud.product.get_multi(
        db=db,
        query=query,
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


@router.post("/excel/{id}")
async def upload_products(
    file: Annotated[UploadFile, File()],
    batch: Annotated[str, Form()],
    id: str,
    db: SessionDep,
    background_tasks: BackgroundTasks,
):
    await validate_file(file=file)

    contents = await file.read()
    background_tasks.add_task(process_file, contents, id, db, crud.product.bulk_upload)
    return {"batch": batch, "message": "File upload started"}


@router.post("/export")
async def export_products(
    current_user: deps.CurrentUser, db: SessionDep, bucket: deps.Storage
) -> Any:
    from sqlalchemy.sql import text

    try:
        statement = "SELECT name, slug, description, price, old_price FROM product;"
        products = db.exec(text(statement))

        file_url = await export(
            columns=["name", "slug", "description", "price", "old_price"],
            data=products,
            name="Product",
            bucket=bucket,
            email=current_user.email,
        )

        return {"message": "Data Export successful", "file_url": file_url}
    except Exception as e:
        logger.error(f"Export products error: {e}")
        raise HTTPException(status_code=500, detail=str(e)) from e


# Upload Image
@router.patch("/{id}/image", response_model=Any)
async def upload_product_image(
    id: str,
    file: Annotated[UploadFile, File()],
    db: SessionDep,
    bucket: deps.Storage,
):
    """
    Upload a product image.
    """
    try:
        await validate_file(file=file)
        contents = await file.read()

        file_name = f"{id}.jpeg"

        blob = bucket.blob(f"products/{file_name}")
        blob.upload_from_file(BytesIO(contents), content_type=file.content_type)

        if product := crud.product.get(db=db, id=id):
            return crud.product.update(
                db=db, db_obj=product, obj_in={"image": file_name}
            )
        raise HTTPException(status_code=404, detail="Product not found.")
    except Exception as e:
        logger.error(f"{e}")
        raise HTTPException(
            status_code=500, detail=f"Error while uploading product image. {e}"
        ) from e
