from fastapi import Depends, FastAPI
from .router import users, auth, llm
from .services.database import create_tables

app = FastAPI()
 
app.include_router(users.router) 
app.include_router(auth.router) 
app.include_router(llm.router) 

create_tables()

@app.get("/")
async def root():
    return {
                "message": "welcome to pectron", 
                "description": "create presentation in second with ai, enabling ai." 
            }