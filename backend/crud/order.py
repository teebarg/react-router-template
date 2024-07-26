
from typing import Any, Dict
from models.generic import Order
from sqlmodel import Session, select

from crud.base import CRUDBase
from models.order import OrderCreate, OrderUpdate

from core.logging import logger


class CRUDOrder(CRUDBase[Order, OrderCreate, OrderUpdate]):
    def create(self, db: Session, obj_in: OrderCreate) -> Order:
        db_obj = Order.model_validate(
            obj_in,
            update={},
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    async def bulk_upload(self, db: Session, *, records: list[Dict[str, Any]]) -> None:
        for order in records:
            try:
                if model := db.exec(
                    select(Order).where(Order.name == order.get("slug"))
                ).first():
                    model.sqlmodel_update(order)
                else:
                    model = Order(**order)
                    db.add(model)
                db.commit()
            except Exception as e:
                logger.error(e)

order = CRUDOrder(Order)
