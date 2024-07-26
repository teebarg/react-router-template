from models.base import BaseModel
from sqlmodel import Field

class AddressBase(BaseModel):
    address: str | None = Field(default=None, max_length=255)
    address_type: str | None = Field(default=None, max_length=255)
    street: str | None = Field(default=None, max_length=255)
    city: str | None = Field(default=None, max_length=255)
    state: str | None = Field(default=None, max_length=255)

class AddressCreate(AddressBase):
    pass

class AddressUpdate(AddressBase):
    pass
