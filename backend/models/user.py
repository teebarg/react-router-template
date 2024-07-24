import secrets
from typing import List, Optional

from pydantic import EmailStr
from models.cart import CartBase
from models.cart_item import CartItemBase
from sqlmodel import Field, Relationship

from models.base import BaseModel


# Shared properties
class UserBase(BaseModel):
    email: EmailStr | None = Field(unique=True, index=True, max_length=255)
    is_active: bool = True
    is_superuser: bool = False
    firstname: str | None = Field(default=None, max_length=255)
    lastname: str | None = Field(default=None, max_length=255)


# Properties to receive via API on creation
class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=40)


# Properties to receive via API on update, all are optional
class UserUpdate(UserBase):
    email: EmailStr | None = Field(default=None, max_length=255)  # type: ignore
    password: str | None = Field(default=None, min_length=8, max_length=40)


# Database model, database table inferred from class name
# class User(UserBase, table=True):
#     id: int | None = Field(default=None, primary_key=True)
#     hashed_password: str = secrets.token_urlsafe(6)
#     carts: List["Cart"] = Relationship(back_populates="user")


# class Cart(CartBase, table=True):
#     id: int | None = Field(default=None, primary_key=True)

#     items: list["CartItem"] = Relationship(back_populates="cart")

#     user_id: int | None = Field(default=None, foreign_key="user.id")
#     user: User | None = Relationship(back_populates="carts")


# class CartItem(CartItemBase, table=True):
#     id: Optional[int] = Field(default=None, primary_key=True)
#     cart_id: int | None = Field(default=None, foreign_key="cart.id")
#     cart: Cart | None = Relationship(back_populates="items")
#     product_id: int | None = Field(default=None, foreign_key="product.id")
#     product: "Cart" = Relationship(back_populates="cart_items")
