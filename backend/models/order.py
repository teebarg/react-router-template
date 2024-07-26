from models.base import BaseModel

class OrderBase(BaseModel):
    order_date: str
    status: str
    subtotal: float
    tax: float
    delivery_fee: float
    total_amount: float

class OrderCreate(OrderBase):
    pass

class OrderUpdate(OrderBase):
    pass
