from typing import Any, Optional
from sqlmodel import Field, SQLModel
from models.base import BaseModel

class CartItemBase(BaseModel):
    # cart_id: int = Field(foreign_key="cart.id", primary_key=True)
    product_id: int = Field(foreign_key="product.id")
    quantity: int = 0


class CartItemCreate(CartItemBase):
    pass


class CartItemUpdate(CartItemBase):
    pass


# class CartItemPublic(CartItemBase):
#     id: int
#     product: Any

# class CartItems(SQLModel):
#     cart_items: list[CartItemPublic]
#     page: int
#     per_page: int
#     total_count: int
#     total_pages: int
