from typing import Any, List, Optional
from models.cart import CartBase
from models.cart_item import CartItemBase
from models.collection import CollectionBase
from models.product import ProductBase
from models.tag import TagBase
from models.user import UserBase
from models.brand import BrandBase
from pydantic import BaseModel
from sqlmodel import Field, Relationship, SQLModel
import secrets


class ContactFormCreate(BaseModel):
    name: str
    email: str
    phone: str | int | None = ""
    message: str = "bearer"


class UploadStatus(BaseModel):
    total_rows: int
    processed_rows: int
    status: str


# Shared properties
class ProductBrand(SQLModel, table=True):
    product_id: int = Field(foreign_key="product.id", primary_key=True)
    brand_id: int = Field(foreign_key="brand.id", primary_key=True)


class ProductCollection(SQLModel, table=True):
    product_id: int = Field(foreign_key="product.id", primary_key=True)
    collection_id: int = Field(foreign_key="collection.id", primary_key=True)


class ProductTag(SQLModel, table=True):
    product_id: int = Field(foreign_key="product.id", primary_key=True)
    tag_id: int = Field(foreign_key="tag.id", primary_key=True)


class Brand(BrandBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    slug: str
    products: list["Product"] = Relationship(
        back_populates="brands", link_model=ProductBrand
    )


class Collection(CollectionBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    slug: str
    products: list["Product"] = Relationship(
        back_populates="collections", link_model=ProductCollection
    )


class Tag(TagBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    slug: str
    products: list["Product"] = Relationship(
        back_populates="tags", link_model=ProductTag
    )


class Product(ProductBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    slug: str
    collections: list["Collection"] = Relationship(
        back_populates="products", link_model=ProductCollection
    )
    tags: list["Tag"] = Relationship(back_populates="products", link_model=ProductTag)
    brands: list["Brand"] = Relationship(
        back_populates="products", link_model=ProductBrand
    )
    # cart_items: list["CartItem"] = Relationship(back_populates="product")


class ProductPublic(ProductBase):
    id: int
    slug: str
    collections: list[Collection] = []
    tags: list[Tag] = []
    brands: list[Brand] = []


class Products(SQLModel):
    products: list[ProductPublic]
    page: int
    per_page: int
    total_count: int
    total_pages: int


class User(UserBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    hashed_password: str = secrets.token_urlsafe(6)
    carts: List["Cart"] = Relationship(back_populates="user")


class Cart(CartBase, table=True):
    id: int | None = Field(default=None, primary_key=True)

    items: list["CartItem"] = Relationship(back_populates="cart")

    user_id: int | None = Field(default=None, foreign_key="user.id")
    user: User | None = Relationship(back_populates="carts")


class CartItem(CartItemBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    cart_id: int = Field(default=None, foreign_key="cart.id")
    cart: Cart | None = Relationship(back_populates="items")
    product_id: int | None = Field(default=None, foreign_key="product.id")
    # product: "Product" = Relationship(back_populates="cart_items")
    product: Product = Relationship()

class CartItemPublic(CartItemBase):
    id: int
    product: Product

class CartPublic(CartBase):
    id: int
    items: list[CartItemPublic] = []
