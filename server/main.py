from fastapi import Depends, FastAPI
from .router import users, auth, llm
from .services.database import create_tables
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
 

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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