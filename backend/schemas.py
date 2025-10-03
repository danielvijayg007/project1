from pydantic import BaseModel

class UserCreate(BaseModel):
    email: str
    password: str
    name: str
    age: int

class UserLogin(BaseModel):
    email: str
    password: str
