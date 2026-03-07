from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List

class DeadlineBase(BaseModel):
    title: str
    subject: str
    due_date: datetime
    is_completed: bool = False

class DeadlineCreate(DeadlineBase):
    pass

class Deadline(DeadlineBase):
    id: int
    owner_id: int

    class Config:
        from_attributes = True

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    deadlines: List[Deadline] = []

    class Config:
        from_attributes = True