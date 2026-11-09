import random

from dotenv import load_dotenv
import os
from sqlalchemy import create_engine, Integer, Float, String, Column, text
from sqlalchemy.orm import DeclarativeBase, sessionmaker, Session
from pydantic import BaseModel
from fastapi import Depends
from database import UserDataPydantic, add_user_data
from application import UserApplication, ApplicationResults, evaluate_compatibility

# The purpose of this file is to seed the databased with a specified number of users (given by NUM_USERS_TO_SEED).
# The program will simulate a user answering an application with randomized answers and then evaluate their compatibility
# with the pets. From there, the program will pick a pet from thelist of compatible pets and submit the fake data to the database. 

# Database setup
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
db = SessionLocal()

NUM_USERS_TO_SEED = 400

question_answers = ["a", "b", "c", "d"]

def generate_application():
    return UserApplication(
        q1=random.choice(question_answers),
        q2=random.choice(question_answers),
        q3=random.choice(question_answers),
        q4=random.choice(question_answers),
        q5=random.choice(question_answers),
        q6=random.choice(question_answers),
        q7=random.choice(question_answers),
        q8=random.choice(question_answers)
    )

def generate_compatible(result: ApplicationResults):
    compatible = []

    compatible.append("biscuit") if result.biscuit_result else None
    compatible.append("kevin") if result.kevin_result else None
    compatible.append("geraldine") if result.geraldine_result else None
    compatible.append("greg") if result.greg_result else None
    compatible.append("pickle") if result.pickle_result else None
    compatible.append("momo") if result.momo_result else None

    return compatible

for _ in range(NUM_USERS_TO_SEED):
    application = generate_application()
    result = evaluate_compatibility(application)
    compatible = generate_compatible(result)

    userdata = UserDataPydantic(
        sociability=result.scores[0],
        persistence=result.scores[1],
        patience=result.scores[2],
        spontaneity=result.scores[3],
        chosen_pet=random.choice(compatible)
    )

    add_user_data(userdata, db)
    db.commit()

db.close()