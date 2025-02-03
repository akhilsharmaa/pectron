from fastapi import APIRouter, Depends, HTTPException, status
from typing import Annotated
from pydantic import BaseModel    
from ..services.database import db_dependency
from ..models.users import Users
from ..models.session import SessionModel
from ..utils.users import get_current_user
from ..utils.logger import logger
from fastapi.responses import JSONResponse


router = APIRouter(
    prefix="/session",
    tags=["session"],
    responses={404: {"description": "Not found"}},
)
  
class SessionBase(BaseModel):
    sessionId: str
    title: str
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
            title=session.title,
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
         
    return JSONResponse(
        status_code=400,
        content={
                "message": "Something went wrong."
        }
    )     
        
        
@router.post("/getall")
async def getall( db: db_dependency,
                current_user: Annotated[Users, Depends(get_current_user)]): 

    try:
        result = db.query(SessionModel).filter(
            SessionModel.username == current_user.username).all();  
        print(result)
        return result; 
    
    except Exception as e:
        logger.error(e);
        




@router.post("/getsessioncontent")
async def getsessioncontent(sessionId: str,
                 db: db_dependency,
                current_user: Annotated[Users, Depends(get_current_user)]): 

    try:
        result = db.query(SessionModel).filter(
            SessionModel.sessionId == sessionId,
            SessionModel.username == current_user.username
        ).first()
                
        if result:        
            return result
        
    except Exception as e:
        logger.error(f"Error fetching session content: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

    return JSONResponse(
        status_code=401,
        content={"message": "You are trying to access an unreachable page."}
    )