from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from animals import Animals
from application import UserApplication, ApplicationResults, evaluate_compatibility
from database import ResponseUserData, UserDataPydantic, UserData, get_db, add_user_data, get_percentiles
from sqlalchemy.orm import Session

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://very-small-pet-shop.onrender.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/animals")
def get_animals():
    return Animals

@app.get("/animals/{animal_name}")
def get_animal(animal_name: str):
    for animal in Animals:
        if animal["Name"].lower() == animal_name.lower():
            return animal
    raise HTTPException(status_code=404, detail="Animal not found")

@app.post("/submit_application/")
def create_user(user_application: UserApplication):
    return evaluate_compatibility(user_application)

@app.post("/complete_adoption/")
def complete_adoption(user_data: UserDataPydantic, db: Session = Depends(get_db)):
    percentiles:ResponseUserData = get_percentiles(user_data, db)
    response:UserData = add_user_data(user_data, db)

    if not response or not percentiles:
        raise HTTPException(status_code=400, detail="Failed to add user data or calculate percentiles")

    db.commit()

    return percentiles