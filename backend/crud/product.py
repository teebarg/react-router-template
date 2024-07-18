from typing import Any, Dict, Optional

from sqlmodel import Session, or_, select

import crud
from core.logging import logger
from core.utils import generate_slug
from crud.base import CRUDBase
from models.product import (
    Collection,
    Product,
    ProductCollection,
    ProductCreate,
    ProductTag,
    ProductUpdate,
    Tag,
)


class CRUDProduct(CRUDBase[Product, ProductCreate, ProductUpdate]):
    def get_multi(
        self,
        db: Session,
        filters: list,
        tag: str,
        collection: str,
        per_page: int,
        offset: int,
        sort: str = "desc",
    ) -> list[Product]:
        statement = select(self.model)
        if tag:
            statement = statement.join(ProductTag).join(Tag).where(Tag.slug == tag)
        if collection:
            statement = (
                statement.join(ProductCollection)
                .join(Collection)
                .where(Collection.slug == collection)
            )
        if filters:
            statement = statement.where(or_(*filters))
        if sort == "desc":
            statement = statement.order_by(self.model.created_at.desc())
        return db.exec(statement.offset(offset).limit(per_page))

    def create(self, db: Session, obj_in: ProductCreate) -> Product:
        db_obj = Product.model_validate(
            obj_in,
            update={
                "slug": generate_slug(name=obj_in.name),
                "tags": self.get_tag_update(db=db, update=obj_in),
                "collections": self.get_collection_update(db=db, update=obj_in),
            },
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self,
        db: Session,
        *,
        db_obj: Product,
        obj_in: Any,
    ) -> Product:
        try:
            if isinstance(obj_in, dict):
                update_data = obj_in
            else:
                update_data = obj_in.dict(exclude_unset=True)
            db_obj.sqlmodel_update(update_data)
            if "name" in update_data:
                db_obj.slug = generate_slug(name=update_data.get("name", ""))
            if "tags" in update_data:
                db_obj.tags = self.get_tag_update(db=db, update=obj_in)
            if "collections" in update_data:
                db_obj.collections = self.get_collection_update(db=db, update=obj_in)

            return self.sync(db=db, update=db_obj, type="update")
        except Exception as e:
            raise e

    async def bulk_upload(self, db: Session, *, records: list[Dict[str, Any]]) -> None:
        for product in records:
            try:
                if model := db.exec(
                    select(Product).where(Product.slug == product.get("slug"))
                ).first():
                    model.sqlmodel_update(product)
                else:
                    model = Product(**product)
                    db.add(model)
                db.commit()
            except Exception as e:
                logger.error(e)

    def get_collection_update(
        self, db: Session, update: Product
    ) -> Optional[list[Collection]]:
        collections: list[Collection] = []
        for i in update.collections:
            if collection := crud.collection.get(db=db, id=i):
                collections.append(collection)
        return collections

    def get_tag_update(self, db: Session, update: Product) -> Optional[list[Tag]]:
        tags: list[Tag] = []
        for i in update.tags:
            if tag := crud.tag.get(db=db, id=i):
                tags.append(tag)
        return tags


product = CRUDProduct(Product)
