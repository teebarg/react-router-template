from core import deps
from models.generic import Order, OrderPublic, Orders
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
from models.order import (
    OrderCreate,
    OrderUpdate,
)
from core.logging import logger
from services.export import export, process_file, validate_file

# Create a router for orders
router = APIRouter()

@router.get(
    "/",
    dependencies=[Depends(get_current_user)],
    response_model=Orders,
)
def index(
    db: SessionDep,
    current_user: CurrentUser,
    page: int = Query(default=1, gt=0),
    per_page: int = Query(default=20, le=100),
) -> Orders:
    """
    Retrieve orders.
    """
    query = {}
    if not current_user.is_superuser:
        query.update({"user_id": current_user.id})
    count_statement = select(func.count()).select_from(Order)
    count_statement = crud.order.generate_statement(
        statement=count_statement, query=query
    )
    total_count = db.exec(count_statement).one()


    orders = crud.order.get_multi(
        db=db,
        query=query,
        per_page=per_page,
        offset=(page - 1) * per_page,
    )

    total_pages = (total_count // per_page) + (total_count % per_page > 0)

    return Orders(
        orders=orders,
        page=page,
        per_page=per_page,
        total_pages=total_pages,
        total_count=total_count,
    )


@router.post(
    "/", dependencies=[Depends(get_current_user)], response_model=OrderPublic
)
def create(*, db: SessionDep, create_data: OrderCreate) -> OrderPublic:
    """
    Create new order.
    """
    order = crud.order.get_by_key(db=db, value=create_data.name)
    if order:
        raise HTTPException(
            status_code=400,
            detail="The order already exists in the system.",
        )

    order = crud.order.create(db=db, obj_in=create_data)
    return order


@router.get("/{id}", response_model=OrderPublic)
def read(
    id: int, db: SessionDep
) -> OrderPublic:
    """
    Get a specific order by id.
    """
    order = crud.order.get(db=db, id=id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


@router.patch(
    "/{id}",
    dependencies=[Depends(get_current_user)],
    response_model=OrderPublic,
)
def update(
    *,
    db: SessionDep,
    id: int,
    update_data: OrderUpdate,
) -> OrderPublic:
    """
    Update a order.
    """
    db_order = crud.order.get(db=db, id=id)
    if not db_order:
        raise HTTPException(
            status_code=404,
            detail="Order not found",
        )

    try:
        db_order = crud.order.update(db=db, db_obj=db_order, obj_in=update_data)
        return db_order
    except IntegrityError as e:
        logger.error(f"Error updating tag, str(e.orig.pgerror)")
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
    Delete a order.
    """
    try:
        order = crud.order.get(db=db, id=id)
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        crud.order.remove(db=db, id=id)
        return Message(message="Order deleted successfully")
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        ) from e


@router.post("/excel/{task_id}")
async def upload_orders(
    file: Annotated[UploadFile, File()],
    batch: Annotated[str, Form()],
    task_id: str,
    db: SessionDep,
    background_tasks: BackgroundTasks,
):
    await validate_file(file=file)

    contents = await file.read()
    background_tasks.add_task(process_file, contents, task_id, db, crud.order.bulk_upload)
    return {"batch": batch, "message": "File upload started"}


@router.post("/export")
async def export_orders(
    current_user: deps.CurrentUser, db: SessionDep, bucket: deps.Storage
):
    try:
        orders = db.exec(select(Order))
        file_url = await export(data=orders, name="Order", bucket=bucket, email=current_user.email)

        return {"message": "Data Export successful", "file_url": file_url}
    except Exception as e:
        logger.error(f"Export orders error: {e}")
        raise HTTPException(status_code=500, detail=str(e)) from e

