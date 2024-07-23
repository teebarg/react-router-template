from pydantic import BaseModel


class ContactFormCreate(BaseModel):
    name: str
    email: str
    phone: str | int | None = ""
    message: str = "bearer"


class UploadStatus(BaseModel):
    total_rows: int
    processed_rows: int
    status: str
