from pydantic import BaseModel
from ..services.database import Base
from sqlalchemy import Column, ForeignKey, Integer, String

class Users(Base):
    __tablename__ = "users"  
    email = Column(String, primary_key=True, unique=True)
    first_name = Column(String)
    last_name = Column(String)
    password = Column(String)