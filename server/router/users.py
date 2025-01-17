from datetime import datetime, timedelta, timezone
from typing import Annotated
from pydantic import BaseModel
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.exc import IntegrityError
from ..services.database import db_dependency
from ..models.users import Users

router = APIRouter(
    prefix="/users",
    tags=["Users"],
    responses={404: {"description": "Not found"}},
) 


class UserBase(BaseModel): 
    email: str
    first_name: str
    last_name: str
    password: str


@router.post("/register")
async def create_user(user: UserBase, db: db_dependency):
    
    db_user = Users( 
            email=user.email,
            first_name=user.first_name, 
            last_name=user.last_name, 
            password=user.password, 
        )

    try:
        # Add the new user to the database
        db.add(db_user)
        db.commit()
        db.refresh(db_user)

        return {
            "message": "User registered successfully.",
            "user_id": db_user.id,
            "email": db_user.email
        }

    except IntegrityError as e: 
        
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A user with this email already exists."
        )
        
    except Exception as e:
        # Catch any other unexpected errors
        db.rollback()  
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to register user. Error: {str(e)}"
        )