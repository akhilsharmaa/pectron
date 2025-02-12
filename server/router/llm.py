from fastapi import APIRouter , Depends
from fastapi.responses import JSONResponse
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
    user = db.query(Users).filter(
        Users.username == current_user.username).first();  
    
    if user.credits >= 4: 
        
        # updating creding points (Decrementing the credit points). 
        user.credits -= 4;  
        db.commit()
        
        return ask_question(question)
    
    return JSONResponse(
        status_code=400,
        content={"message": "Your credit points are empty."}
    )  
 
class ContentBase(BaseModel): 
    content: str 
                
@router.post("/fetchimage")
async def getimage(
                content: ContentBase, 
                db: db_dependency,
                current_user: Annotated[Users, Depends(get_current_user)]): 
    
    return search_image(
                get_summary(content.content)); 