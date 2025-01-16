from fastapi import FastAPI

app = FastAPI()

# Root route
@app.get("/")
async def root():
    return {"message": "Hello, World!"}

# GET route
@app.get("/hello")
async def say_hello():
    return {"message": "Hello from GET route!"}

# POST route
@app.post("/hello")
async def post_hello():
    return {"message": "Hello from POST route!"}

# PUT route
@app.put("/hello")
async def put_hello():
    return {"message": "Hello from PUT route!"}

# DELETE route
@app.delete("/hello")
async def delete_hello():
    return {"message": "Hello from DELETE route!"}

# Route with a path parameter
@app.get("/hello/{name}")
async def say_hello_name(name: str):
    return {"message": f"Hello, {name}!"}

# Route with a query parameter
@app.get("/greet")
async def greet_user(name: str = "World"):
    return {"message": f"Hello, {name}!"}

# Route with both path and query parameters
@app.get("/welcome/{name}")
async def welcome_user(name: str, city: str = "Unknown"):
    return {"message": f"Welcome, {name} from {city}!"}
