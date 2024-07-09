import secrets
from typing import List, Optional

from sqlmodel import Field, Relationship, SQLModel

from models.base import BaseModel


# Shared properties
class ProductBase(BaseModel):
    name: str
    description: str | None
    price: float
    old_price: float
    status: bool = False


# Properties to receive via API on creation
class ProductCreate(ProductBase):
    pass


# Properties to receive via API on update, all are optional
class ProductUpdate(ProductBase):
    pass


# Database model, database table inferred from class name
class Product(ProductBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    categories: List["ProductCategory"] = Relationship(back_populates="products")

class Category(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True, unique=True)
    products: List["ProductCategory"] = Relationship(back_populates="categories")

class ProductCategory(SQLModel, table=True):
    product_id: int = Field(foreign_key="products.id", primary_key=True)
    category_id: int = Field(foreign_key="categories.id", primary_key=True)
    products: "Product" = Relationship(back_populates="categories")
    categories: "Category" = Relationship(back_populates="products")