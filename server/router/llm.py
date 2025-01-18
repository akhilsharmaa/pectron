from fastapi import APIRouter , Depends
from pydantic import BaseModel  
from ..services.llm_service import ask_question
from sqlalchemy.orm import Session
from fastapi_limiter.depends import RateLimiter
from ..services.database import db_dependency


router = APIRouter(
    prefix="/llm",
    tags=["llm"],
    responses={404: {"description": "Not found"}},
)

@router.get("/ask")
async def askllm(question: str):
    return ask_question(question)