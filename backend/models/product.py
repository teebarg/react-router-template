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
    collections: List["ProductCollection"] = Relationship(back_populates="products")
    tags: List["ProductTag"] = Relationship(back_populates="products")
    brands: List["ProductBrand"] = Relationship(back_populates="products")


# Properties to receive via API on creation
class ProductCreate(ProductBase):
    pass


# Properties to receive via API on update, all are optional
class ProductUpdate(ProductBase):
    pass


# Database model, database table inferred from class name
class Product(ProductBase, table=True):
    id: int | None = Field(default=None, primary_key=True)


class BrandBase(BaseModel):
    name: str = Field(index=True, unique=True)
    products: List["ProductCollection"] = Relationship(back_populates="brands")


# Properties to receive via API on creation
class BrandCreate(BrandBase):
    pass


# Properties to receive via API on update, all are optional
class BrandUpdate(BrandBase):
    pass

class Brand(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True, unique=True)
    products: List["ProductCollection"] = Relationship(back_populates="tags")

class Collection(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True, unique=True)
    products: List["ProductCollection"] = Relationship(back_populates="collections")

class Tag(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True, unique=True)
    products: List["ProductCollection"] = Relationship(back_populates="tags")

class ProductBrand(SQLModel, table=True):
    product_id: int = Field(foreign_key="product.id", primary_key=True)
    brand_id: int = Field(foreign_key="brand.id", primary_key=True)
    products: "Product" = Relationship(back_populates="collections")
    brands: "Collection" = Relationship(back_populates="products")

class ProductCollection(SQLModel, table=True):
    product_id: int = Field(foreign_key="product.id", primary_key=True)
    category_id: int = Field(foreign_key="collection.id", primary_key=True)
    products: "Product" = Relationship(back_populates="collections")
    collections: "Collection" = Relationship(back_populates="products")

class ProductTag(SQLModel, table=True):
    product_id: int = Field(foreign_key="product.id", primary_key=True)
    tag_id: int = Field(foreign_key="tag.id", primary_key=True)
    products: "Product" = Relationship(back_populates="tags")
    tags: "Tag" = Relationship(back_populates="products")