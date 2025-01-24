from fastapi import APIRouter , Depends
from pydantic import BaseModel  
from ..services.llm_service import ask_question
from sqlalchemy.orm import Session
from fastapi_limiter.depends import RateLimiter
from ..services.database import db_dependency
from ..models.users import Users
from ..utils.users import get_current_user


router = APIRouter(
    prefix="/llm",
    tags=["llm"],
    responses={404: {"description": "Not found"}},
)

@router.get("/ask")
async def askllm(question: str, current_user: Users = Depends(get_current_user)): 
    return ask_question(question)