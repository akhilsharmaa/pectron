from fastapi import APIRouter, Depends, HTTPException
from datetime import timedelta, datetime 
from pydantic import BaseModel  
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from ..utils.passwords import create_access_token, verify_password, get_password_hash
from ..config import JWT_SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES
from ..services.database import engine
from sqlalchemy.orm import Session

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")