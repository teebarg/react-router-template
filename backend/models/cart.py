from models.base import BaseModel


class CartBase(BaseModel):
    session_id: str


class CartCreate(CartBase):
    pass


class CartUpdate(CartBase):
    pass


# class Cart(SQLModel, table=True):
#     id: Optional[int] = Field(default=None, primary_key=True)
#     user_id: int | None = Field(default=None, foreign_key="user.id")
#     user: Cart | None = Relationship(back_populates="cart")
#     items: list["CartItem"] = Relationship(back_populates="cart")


# class CartPublic(CartBase):
#     id: int
#     items: list["CartItem"]


# class Carts(SQLModel):
#     carts: list[CartPublic]
#     page: int
#     per_page: int
#     total_count: int
#     total_pages: int
