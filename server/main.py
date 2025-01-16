from fastapi import Depends, FastAPI
 
from server.router import users

app = FastAPI()
 
app.include_router(users.router) 

@app.get("/")
async def root():
    return {
                "message": "welcome to pectron", 
                "description": "create presentation in second with ai, enabling ai." 
            }