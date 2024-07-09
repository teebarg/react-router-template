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
from core.logging import logger
from models.collection import (
    CollectionCreate,
    Collections,
    CollectionUpdate,
)
from models.message import Message
from models.product import Collection

# Create a router for collections
router = APIRouter()


@router.get(
    "/",
    # dependencies=[Depends(get_current_user)],
    response_model=Collections,
)
def index(
    db: SessionDep,
    name: str = "",
    page: int = Query(default=1, gt=0),
    per_page: int = Query(default=20, le=100),
) -> Collections:
    """
    Retrieve collections.
    """
    query = {"name": name}
    filters = crud.collection.build_query(query)

    count_statement = select(func.count()).select_from(Collection)
    if filters:
        count_statement = count_statement.where(or_(*filters))
    total_count = db.exec(count_statement).one()

    collections = crud.collection.get_multi(
        db=db,
        filters=filters,
        per_page=per_page,
        offset=(page - 1) * per_page,
    )

    total_pages = (total_count // per_page) + (total_count % per_page > 0)

    return Collections(
        collections=collections,
        page=page,
        per_page=per_page,
        total_pages=total_pages,
        total_count=total_count,
    )


@router.post("/", response_model=Collection)
def create(*, db: SessionDep, create_data: CollectionCreate) -> Collection:
    """
    Create new collection.
    """
    collection = crud.collection.get_by_key(db=db, value=create_data.name)
    if collection:
        raise HTTPException(
            status_code=400,
            detail="The collection already exists in the system.",
        )

    collection = crud.collection.create(db=db, obj_in=create_data)
    return collection


@router.get("/{id}", response_model=Collection)
def read(id: int, db: SessionDep) -> Collection:
    """
    Get a specific collection by id.
    """
    collection = crud.collection.get(db=db, id=id)
    if not collection:
        raise HTTPException(status_code=404, detail="Collection not found")
    return collection


@router.patch(
    "/{id}",
    # dependencies=[Depends(get_current_user)],
    response_model=Collection,
)
def update(
    *,
    db: SessionDep,
    id: int,
    update_data: CollectionUpdate,
) -> Collection:
    """
    Update a collection.
    """
    db_collection = crud.collection.get(db=db, id=id)
    if not db_collection:
        raise HTTPException(
            status_code=404,
            detail="Collection not found",
        )
    try:
        db_collection = crud.collection.update(
            db=db, db_obj=db_collection, obj_in=update_data
        )
        return db_collection
    except Exception as e:
        logger.error(e)
        if "psycopg2.errors.UniqueViolation" in str(e):
            raise HTTPException(
                status_code=422,
                detail=f"{e}",
            ) from e
        raise HTTPException(
            status_code=400,
            detail=f"{e}",
        ) from e


@router.delete("/{id}")
def delete(db: SessionDep, id: int) -> Message:
    """
    Delete a collection.
    """
    collection = crud.collection.get(db=db, id=id)
    if not collection:
        raise HTTPException(status_code=404, detail="Collection not found")
    crud.collection.remove(db=db, id=id)
    return Message(message="Collection deleted successfully")
