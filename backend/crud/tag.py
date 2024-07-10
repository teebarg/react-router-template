
from sqlmodel import Session, select

from core.utils import generate_slug
from crud.base import CRUDBase
from models.tag import  TagCreate, TagUpdate
from models.product import Tag


class CRUDTag(CRUDBase[Tag, TagCreate, TagUpdate]):
    def create(self, db: Session, obj_in: TagCreate) -> Tag:
        db_obj = Tag.model_validate(
            obj_in,
            update={"slug":generate_slug(name=obj_in.name)},
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

tag = CRUDTag(Tag)
