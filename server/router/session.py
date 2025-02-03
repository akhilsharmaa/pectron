from fastapi import APIRouter, Depends, HTTPException, status
from typing import Annotated
from pydantic import BaseModel    
from ..services.database import db_dependency
from ..models.users import Users
from ..models.session import SessionModel
from ..utils.users import get_current_user
from ..utils.logger import logger

router = APIRouter(
    prefix="/session",
    tags=["session"],
    responses={404: {"description": "Not found"}},
)
  
class SessionBase(BaseModel):
    sessionId: str
    body: str


@router.post("/save")
async def askllm(
                session: SessionBase, 
                db: db_dependency,
                current_user: Annotated[Users, Depends(get_current_user)]): 
    
    session_obj = SessionModel(
            sessionId=session.sessionId,
            username=current_user.username, 
            body=session.body,
        )
  
    try:
        # Add the new user to the database
        db.add(session_obj)
        db.commit()
        db.refresh(session_obj)

        return {
            "message": "session saved successfully."
        }
 
    except Exception as e:
        
        logger.error(e);  
        db.rollback()   
        
        
@router.post("/getall")
async def askllm( db: db_dependency,
                current_user: Annotated[Users, Depends(get_current_user)]): 

    try:
        result = db.query(SessionModel).filter(
            SessionModel.username == current_user.username).all();  
        print(result)
        return result; 
    
    except Exception as e:
        logger.error(e);
        