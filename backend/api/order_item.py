from core import deps
from models.generic import OrderItem, OrderItemPublic, OrderItems
from fastapi import (
    APIRouter,
    BackgroundTasks,
    Depends,
    File,
    Form,
    HTTPException,
    Query,
    UploadFile,
)
from typing import Annotated
from sqlmodel import func, or_, select
from sqlalchemy.exc import IntegrityError

import crud
from core.deps import (
    CurrentUser,
    SessionDep,
    get_current_user,
)

from models.message import Message
from models.order_item import OrderItemUpdate, OrderItemCreate
from core.logging import logger
from services.export import export, process_file, validate_file

# Create a router for order_items
router = APIRouter()

@router.get(
    "/",
    dependencies=[Depends(get_current_user)],
    response_model=OrderItems,
)
def index(
    db: SessionDep,
    name: str = "",
    page: int = Query(default=1, gt=0),
    per_page: int = Query(default=20, le=100),
) -> OrderItems:
    """
    Retrieve order_items.
    """
    query = {"name": name}
    filters = crud.order_item.build_query(query)

    count_statement = select(func.count()).select_from(OrderItem)
    if filters:
        count_statement = count_statement.where(or_(*filters))
    total_count = db.exec(count_statement).one()

    order_items = crud.order_item.get_multi(
        db=db,
        filters=filters,
        per_page=per_page,
        offset=(page - 1) * per_page,
    )

    total_pages = (total_count // per_page) + (total_count % per_page > 0)

    return OrderItems(
        order_items=order_items,
        page=page,
        per_page=per_page,
        total_pages=total_pages,
        total_count=total_count,
    )


@router.post(
    "/", dependencies=[Depends(get_current_user)], response_model=OrderItemPublic
)
def create(*, db: SessionDep, create_data: OrderItemCreate) -> OrderItemPublic:
    """
    Create new order_item.
    """
    order_item = crud.order_item.get_by_key(db=db, value=create_data.name)
    if order_item:
        raise HTTPException(
            status_code=400,
            detail="The order_item already exists in the system.",
        )

    order_item = crud.order_item.create(db=db, obj_in=create_data)
    return order_item


@router.get("/{id}", response_model=OrderItemPublic)
def read(
    id: int, db: SessionDep
) -> OrderItemPublic:
    """
    Get a specific order_item by id.
    """
    order_item = crud.order_item.get(db=db, id=id)
    if not order_item:
        raise HTTPException(status_code=404, detail="Order item not found")
    return order_item


@router.patch(
    "/{id}",
    dependencies=[Depends(get_current_user)],
    response_model=OrderItemPublic,
)
def update(
    *,
    db: SessionDep,
    id: int,
    update_data: OrderItemUpdate,
) -> OrderItemPublic:
    """
    Update a order_item.
    """
    db_order_item = crud.order_item.get(db=db, id=id)
    if not db_order_item:
        raise HTTPException(
            status_code=404,
            detail="Order item not found",
        )

    try:
        db_order_item = crud.order_item.update(db=db, db_obj=db_order_item, obj_in=update_data)
        return db_order_item
    except IntegrityError as e:
        logger.error(f"Error updating tag - ${e.orig.pgerror}")
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
    Delete a order_item.
    """
    try:
        order_item = crud.order_item.get(db=db, id=id)
        if not order_item:
            raise HTTPException(status_code=404, detail="Order item not found")
        crud.order_item.remove(db=db, id=id)
        return Message(message="Order item deleted successfully")
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        ) from e


@router.post("/excel/{task_id}")
async def upload_order_items(
    file: Annotated[UploadFile, File()],
    batch: Annotated[str, Form()],
    task_id: str,
    db: SessionDep,
    background_tasks: BackgroundTasks,
):
    await validate_file(file=file)

    contents = await file.read()
    background_tasks.add_task(process_file, contents, task_id, db, crud.order_item.bulk_upload)
    return {"batch": batch, "message": "File upload started"}


@router.post("/export")
async def export_order_items(
    current_user: deps.CurrentUser, db: SessionDep, bucket: deps.Storage
):
    try:
        order_items = db.exec(select(OrderItem))
        file_url = await export(data=order_items, name="OrderItem", bucket=bucket, email=current_user.email)

        return {"message": "Data Export successful", "file_url": file_url}
    except Exception as e:
        logger.error(f"Export order items error: {e}")
        raise HTTPException(status_code=500, detail=str(e)) from e

