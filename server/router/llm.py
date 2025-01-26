from fastapi import APIRouter , Depends
from typing import Annotated
from pydantic import BaseModel  
from ..services.llm_service import ask_question
from sqlalchemy.orm import Session
from fastapi_limiter.depends import RateLimiter
from ..services.database import db_dependency
from ..models.users import Users
from ..utils.users import get_current_user
from ..utils.logger import logger

router = APIRouter(
    prefix="/llm",
    tags=["llm"],
    responses={404: {"description": "Not found"}},
)

@router.get("/ask")
async def askllm(question: str, token: str, db: db_dependency): 
    current_user = get_current_user(db, token=token)  
    return ask_question(question)

