# api/tags.py

from typing import Any

from fastapi import APIRouter, HTTPException, Query
from sqlalchemy.exc import IntegrityError

import crud
from core import deps
from models.product import Tag

# Create a router for tags
router = APIRouter()


@router.get("/", response_model=dict[str, Any])
async def index(
    db: deps.SessionDep,
    name: str = "",
    page: int = Query(default=1, gt=0),
    per_page: int = Query(default=20, le=100),
):
    """
    Get all tags.

    :param db: The database session dependency.
    :param name: Optional name parameter to filter tags by name.
    :param page: Optional page parameter for pagination.
    :param per_page: Optional per_page parameter for pagination (default: 20, max: 100).
    :return: A dictionary containing the list of tags, page, and per_page.
    """
    tags = crud.tag.get_multi(
        db=db, queries={"name": name}, per_page=per_page, offset=(page - 1) * per_page
    )

    # Get total count
    total_count = crud.tag.all(db=db).count()

    # Calculate total pages
    total_pages = (total_count // per_page) + (total_count % per_page > 0)
    return {
        "tags": tags,
        "page": page,
        "per_page": per_page,
        "total_count": total_count,
        "total_pages": total_pages,
    }


@router.get("/{id}", response_model=Tag)
async def show(id: str, db: deps.SessionDep):
    """
    Get a specific tag by ID.
    """
    if tag := crud.tag.get(db=db, id=id):
        return tag
    raise HTTPException(status_code=404, detail="Tag not found.")


@router.post("/", response_model=Tag, status_code=201)
async def create(tag: Any, db: deps.SessionDep):
    """
    Create a new tag.
    """
    try:
        return crud.tag.create(db=db, obj_in=tag)
    except IntegrityError as e:
        raise HTTPException(
            status_code=422, detail=f"Error creating tag, {e.orig.pgerror}"
        ) from e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating tag, {e}") from e


@router.put("/{id}", response_model=Tag)
async def update(id: int, update: Any, db: deps.SessionDep):
    """
    Update a specific tag by ID.
    """
    try:
        if tag := crud.tag.get(db=db, id=id):
            return crud.tag.update(db=db, db_obj=tag, obj_in=update)
        raise HTTPException(status_code=404, detail="Tag not found.")
    except IntegrityError as e:
        raise HTTPException(
            status_code=422, detail=f"Error updating tag, {e.orig.pgerror}"
        ) from e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating tag, {e}") from e


@router.delete("/{id}", response_model=Tag)
async def delete(id: int, db: deps.SessionDep):
    """
    Delete a specific tag by ID.
    """
    try:
        if tag := crud.tag.remove(db=db, id=id):
            return tag
        raise HTTPException(status_code=404, detail="Tag not found.")
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error deleting tag, invalid tag id, {e}"
        ) from e
