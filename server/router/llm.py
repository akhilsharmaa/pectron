from fastapi import APIRouter 
from pydantic import BaseModel  
from ..services.llm_service import ask_question
from sqlalchemy.orm import Session
from ..services.database import db_dependency


router = APIRouter(
    prefix="/llm",
    tags=["llm"],
    responses={404: {"description": "Not found"}},
) 
 
class Question(BaseModel): 
    question: str
    
@router.post("/ask")
async def askllm(question: Question):
    return ask_question(question.question)