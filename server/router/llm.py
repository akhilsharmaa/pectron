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
from ..services.summary_service import get_summary
from ..services.search_image import search_image

router = APIRouter(
    prefix="/llm",
    tags=["llm"],
    responses={404: {"description": "Not found"}},
)

@router.get("/ask")
async def askllm(question: str, token: str, db: db_dependency): 
    current_user = get_current_user(db, token=token)  
    return ask_question(question)



@router.post("/fetchimage")
async def getimage(
                content: str, 
                db: db_dependency,
                current_user: Annotated[Users, Depends(get_current_user)]): 
    
    return search_image(
                get_summary(content)); 