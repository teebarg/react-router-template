
from typing import Any, Dict
from models.generic import OrderItem
from sqlmodel import Session, select

from core.utils import generate_slug
from crud.base import CRUDBase
from models.order_item import OrderItemCreate, OrderItemUpdate

from core.logging import logger


class CRUDOrderItem(CRUDBase[OrderItem, OrderItemCreate, OrderItemUpdate]):
    def create(self, db: Session, obj_in: OrderItemCreate) -> OrderItem:
        db_obj = OrderItem.model_validate(
            obj_in,
            update={},
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

order_item = CRUDOrderItem(OrderItem)
