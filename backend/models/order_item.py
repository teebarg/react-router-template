from typing import Optional
from sqlmodel import Field, SQLModel
from models.base import BaseModel

class OrderItemBase(BaseModel):
    pass


class OrderItemCreate(OrderItemBase):
    pass

class OrderItemUpdate(OrderItemBase):
    pass
