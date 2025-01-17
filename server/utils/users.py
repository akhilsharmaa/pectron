import jwt
from pydantic import BaseModel 
from fastapi import Depends, FastAPI, HTTPException, status
from jwt.exceptions import InvalidTokenError
from ..config import oauth2_scheme, JWT_SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES, pwd_context
from server.models.users import Users 
from ..services.database import db_dependency, get_db
from ..utils.passwords import verify_password

    
def get_user(username: str, db: db_dependency):
    return db.query(Users).filter(Users.username == username).first()


def authenticate_user(db: db_dependency, username: str, password: str): 
    user = get_user(username, db=db); 
    if not user: 
        return False; 
    if not verify_password(password, user.password):
            return False
    return user
    
def get_current_user(token: str = Depends(oauth2_scheme)): 
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except InvalidTokenError:
        raise credentials_exception
    user = get_user(email=token_data.email)
    if user is None:
        raise credentials_exception
    return user
 