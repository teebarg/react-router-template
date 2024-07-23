
from models.user import Cart
from sqlmodel import Session, select

from core.utils import generate_slug
from crud.base import CRUDBase
from models.cart import CartCreate, CartUpdate


class CRUDCart(CRUDBase[Cart, CartCreate, CartUpdate]):
    def create(self, db: Session, obj_in: CartCreate) -> Cart:
        db_obj = Cart.model_validate(
            obj_in,
            update={"slug": generate_slug(name=obj_in.session_id)},
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

cart = CRUDCart(Cart)
