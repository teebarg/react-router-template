import asyncio
import os
from datetime import datetime
from io import BytesIO
from typing import Annotated, Dict

import pandas as pd
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
from sqlalchemy.exc import IntegrityError
from sqlmodel import func, or_, select

import crud
from api.websocket import manager
from core import deps
from core.deps import (
    SessionDep,
    get_current_user,
)
from core.logging import logger
from core.utils import generate_data_export_email, send_email
from models.generic import UploadStatus
from models.message import Message
from models.product import Tag
from models.tag import (
    TagCreate,
    TagPublic,
    Tags,
    TagUpdate,
)
from services.pd import data_to_csv
from services.storage import upload_to_firebase

# Create a router for tags
router = APIRouter()


@router.get(
    "/",
    # dependencies=[Depends(get_current_user)],
    response_model=Tags,
)
async def index(
    db: SessionDep,
    name: str = "",
    page: int = Query(default=1, gt=0),
    per_page: int = Query(default=20, le=100),
) -> Tags:
    """
    Retrieve tags.
    """
    query = {"name": name}
    filters = crud.tag.build_query(query)

    count_statement = select(func.count()).select_from(Tag)
    if filters:
        count_statement = count_statement.where(or_(*filters))
    total_count = db.exec(count_statement).one()

    tags = crud.tag.get_multi(
        db=db,
        filters=filters,
        per_page=per_page,
        offset=(page - 1) * per_page,
    )

    total_pages = (total_count // per_page) + (total_count % per_page > 0)

    return Tags(
        tags=tags,
        page=page,
        per_page=per_page,
        total_pages=total_pages,
        total_count=total_count,
    )


@router.post("/", response_model=TagPublic)
def create(*, db: SessionDep, create_data: TagCreate) -> TagPublic:
    """
    Create new tag.
    """
    tag = crud.tag.get_by_key(db=db, value=create_data.name)
    if tag:
        raise HTTPException(
            status_code=400,
            detail="The tag already exists in the system.",
        )

    tag = crud.tag.create(db=db, obj_in=create_data)
    return tag


@router.get("/{id}", response_model=TagPublic)
def read(id: int, db: SessionDep) -> TagPublic:
    """
    Get a specific tag by id.
    """
    tag = crud.tag.get(db=db, id=id)
    if not tag:
        raise HTTPException(status_code=404, detail="Tag not found")
    return tag


@router.patch(
    "/{id}",
    # dependencies=[Depends(get_current_user)],
    response_model=TagPublic,
)
def update(
    *,
    db: SessionDep,
    id: int,
    update_data: TagUpdate,
) -> TagPublic:
    """
    Update a tag.
    """
    db_tag = crud.tag.get(db=db, id=id)
    if not db_tag:
        raise HTTPException(
            status_code=404,
            detail="Tag not found",
        )

    try:
        db_tag = crud.tag.update(db=db, db_obj=db_tag, obj_in=update_data)
        return db_tag
    except IntegrityError as e:
        logger.error(f"Error updating tag, {e.orig.pgerror}")
        raise HTTPException(status_code=422, detail=str(e.orig.pgerror)) from e
    except Exception as e:
        logger.error(f"An error occurred: {e}")
        raise HTTPException(
            status_code=400,
            detail=str(e),
        ) from e


@router.delete("/{id}", dependencies=[Depends(get_current_user)])
def delete(db: SessionDep, id: int) -> Message:
    """
    Delete a tag.
    """
    try:
        tag = crud.tag.get(db=db, id=id)
        if not tag:
            raise HTTPException(status_code=404, detail="Tag not found")
        crud.tag.remove(db=db, id=id)
        return Message(message="Tag deleted successfully")
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        ) from e


upload_statuses: Dict[str, UploadStatus] = {}


async def process_file(file, task_id: str, db: SessionDep):
    chunk_size = 100
    try:
        df = pd.read_excel(BytesIO(file))
        total_rows = len(df)
        upload_statuses[task_id] = UploadStatus(
            total_rows=total_rows, processed_rows=0, status="Processing"
        )
        await send_status_update(task_id)

        for i in range(0, total_rows, chunk_size):
            chunk = df.iloc[i : i + chunk_size]
            tags = chunk.to_dict("records")
            await crud.tag.bulk_upload(db=db, tags=tags)
            upload_statuses[task_id].processed_rows += len(tags)
            await send_status_update(task_id)
            await asyncio.sleep(0.1)  # Allow other tasks to run

        if upload_statuses.get(task_id):
            upload_statuses[task_id].status = "Completed"
        await send_status_update(task_id)
    except Exception as e:
        logger.error(f"Error: {e}")
        if upload_statuses.get(task_id):
            upload_statuses[task_id].status = f"Error: {str(e)}"
            await send_status_update(task_id)


async def send_status_update(task_id: str):
    await manager.broadcast(
        id=task_id,
        data=upload_statuses.get(task_id).model_dump(),
        type="sheet-processor",
    )


@router.post("/excel/{task_id}")
async def upload_products(
    file: Annotated[UploadFile, File()],
    batch: Annotated[str, Form()],
    task_id: str,
    db: SessionDep,
    background_tasks: BackgroundTasks,
):
    if file is None:
        logger.error("Invalid file provided")
        raise HTTPException(status_code=422, detail="No file provided")

    size_in_mb = file.size / 1024 / 1024
    if size_in_mb > 1.5:
        logger.error("Uploaded file is greater than 1.5MB")
        raise HTTPException(
            status_code=422, detail="File size should not be more than 1.5MB"
        )

    contents = await file.read()
    background_tasks.add_task(process_file, contents, task_id, db)
    return {"batch": batch, "message": "File upload started"}


@router.post("/export")
async def export_tags(
    current_user: deps.CurrentUser, db: SessionDep, bucket: deps.Storage
):
    try:
        tags = db.exec(select(Tag))
        # Get the current date
        current_date = datetime.now().strftime("%Y-%m-%d")
        filename = f"tags_export_{current_date}.csv"
        csv = data_to_csv(items=tags, filename=filename)
        file_url = upload_to_firebase(file_path=csv, bucket=bucket)

        # Send download link
        email_data = generate_data_export_email(download_link=file_url)
        print("🚀 ~ email_data:", email_data)
        send_email(
            email_to=current_user.email,
            subject=email_data.subject,
            html_content=email_data.html_content,
        )

        # Clean up
        os.remove(f"./{filename}")
        return {"message": "Export successful", "file_url": file_url}
    except Exception as e:
        logger.error(f"Export tags error: {e}")
        raise HTTPException(status_code=500, detail=str(e)) from e
