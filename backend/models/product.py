from sqlmodel import Field, Relationship, SQLModel

from models.base import BaseModel
from models.collection import CollectionBase

# Shared properties
# class ProductBrand(SQLModel, table=True):
#     product_id: int = Field(foreign_key="product.id", primary_key=True)
#     brand_id: int = Field(foreign_key="brand.id", primary_key=True)


class ProductCollection(SQLModel, table=True):
    product_id: int = Field(foreign_key="product.id", primary_key=True)
    collection_id: int = Field(foreign_key="collection.id", primary_key=True)


# class ProductTag(SQLModel, table=True):
#     product_id: int = Field(foreign_key="product.id", primary_key=True)
#     tag_id: int = Field(foreign_key="tag.id", primary_key=True)


# class BrandBase(BaseModel):
#     name: str = Field(index=True, unique=True)


# # Properties to receive via API on creation
# class BrandCreate(BrandBase):
#     pass


# # Properties to receive via API on update, all are optional
# class BrandUpdate(BrandBase):
#     pass

# class Brand(SQLModel, table=True):
#     id: int | None = Field(default=None, primary_key=True)
#     products: List["ProductBrand"] = Relationship(back_populates="brands")


class Collection(CollectionBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    slug: str
    products: list["Product"] = Relationship(
        back_populates="collections", link_model=ProductCollection
    )


# class Collections(SQLModel):
#     collections: list[CollectionPublic]
#     page: int
#     per_page: int
#     total_count: int
#     total_pages: int


# class TagBase(BaseModel):
#     name: str = Field(index=True, unique=True)


# # Properties to receive via API on creation
# class TagCreate(TagBase):
#     pass


# # Properties to receive via API on update, all are optional
# class TagUpdate(TagBase):
#     pass


# class Tag(TagBase, table=True):
#     id: int | None = Field(default=None, primary_key=True)
#     products: list["Product"] = Relationship(back_populates="tags", link_model=ProductTag)


class ProductBase(BaseModel):
    name: str
    description: str | None = ""
    price: float
    old_price: float = 0.0
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
    slug: str
    collections: list["Collection"] = Relationship(
        back_populates="products", link_model=ProductCollection
    )
    # tags: list["Tag"] = Relationship(back_populates="products", link_model=ProductTag)
    # brands: list["Brand"] = Relationship(back_populates="products", link_model=ProductBrand)


class ProductPublic(ProductBase):
    id: int
    collections: list[Collection] = []


class Products(SQLModel):
    products: list[ProductPublic]
    page: int
    per_page: int
    total_count: int
    total_pages: int
