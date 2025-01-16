from fastapi import APIRouter, Depends, HTTPException

from ..dependencies import get_token_header

router = APIRouter(
    prefix="/users",
    tags=["users"],
    dependencies=[Depends(get_token_header)],
    responses={404: {"description": "Not found"}},
) 

@router.get("/")
async def read_users():
    return {"message": "users"}
 
@router.get("/signin")
async def read_users():
    return {"message": "users"}
 