from typing import Optional
from sqlmodel import Field, SQLModel
from models.base import BaseModel

class CartItemBase(BaseModel):
    quantity: int = 0


class CartItemCreate(CartItemBase):
    pass

class CartItemUpdate(CartItemBase):
    pass


class CartItemPublic(CartItemBase):
    id: int

class CartItems(SQLModel):
    cart_items: list[CartItemPublic]
    page: int
    per_page: int
    total_count: int
    total_pages: int
