from sqlmodel import Session

from core.utils import generate_slug
from crud.base import CRUDBase
from models.collection import CollectionCreate, CollectionUpdate
from models.product import Collection


class CRUDCollection(CRUDBase[Collection, CollectionCreate, CollectionUpdate]):
    def create(self, db: Session, obj_in: CollectionCreate) -> Collection:
        db_obj = Collection.model_validate(
            obj_in,
            update={"slug": generate_slug(name=obj_in.name)},
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj


collection = CRUDCollection(Collection)
