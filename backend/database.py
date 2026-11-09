from dotenv import load_dotenv
import os
from sqlalchemy import create_engine, Integer, Float, String, Column, text
from sqlalchemy.orm import DeclarativeBase, sessionmaker, Session
from pydantic import BaseModel
from fastapi import Depends

# The purpose of this file is to define database models, sessions, and helper functions for interacting with the database.
# Additionally, the file also contains the functions necesary for the "complete_adoption" endpoint.

# Database setup
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL, echo="debug", pool_pre_ping=True)

# Define the base class for SQLAlchemy models
class Base(DeclarativeBase):
    pass

# Define the UserData model for the database
class UserData(Base):
    __tablename__ = "user_data"

    id = Column(Integer, primary_key=True, index=True)
    sociability = Column(Float)
    persistence = Column(Float)
    patience = Column(Float)
    spontaneity = Column(Float)
    chosen_pet = Column(String)

# Create the database tables based on the models defined above
Base.metadata.create_all(bind=engine)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# UserDataPydantic is the Pydantic model used to validate the user's data submitted to the endpoint.
# It takes the user's scores (calculated in application.py and given by the frontend when sending a 
# post request) and the pet the user ultimately chose to adopt.
class UserDataPydantic(BaseModel):
    sociability: float
    persistence: float
    patience: float
    spontaneity: float
    chosen_pet: str

# ResponseUserData is the model used to return the data to the frontend after calculating the percentiles.
# Pet Percentile may sound slightly misleading, but it essentially returns the percentage of users who have 
# chosen the same pet as the current user.
class ResponseUserData(BaseModel):
    sociability_percentile: float
    persistence_percentile: float
    patience_percentile: float
    spontaneity_percentile: float
    pet_percent: float

# Function to get a database session
# This function is used as a dependency in FastAPI endpoints to provide a database session.
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Function to add user data to the database and returns the result as a UserData object.
def add_user_data(user_data: UserDataPydantic, db: Session):
    new_user_data = UserData(
        sociability=user_data.sociability,
        persistence=user_data.persistence,
        patience=user_data.patience,
        spontaneity=user_data.spontaneity,
        chosen_pet=user_data.chosen_pet.lower()
    )
    db.add(new_user_data)
    db.commit()
    db.refresh(new_user_data)
    return new_user_data

# Function to calculate the percentiles of user data compared to all other user data in the database.
def get_percentiles(user_data: UserDataPydantic, db: Session):
    # Execute the SQL query to calculate the percentiles for the given user data.
    result = db.execute(text("""
        SELECT 
            COUNT(*) FILTER (WHERE sociability < :sociability) * 100.0 / COUNT(*) AS sociability_percentile,
            COUNT(*) FILTER (WHERE persistence < :persistence) * 100.0 / COUNT(*) AS persistence_percentile,
            COUNT(*) FILTER (WHERE patience < :patience) * 100.0 / COUNT(*) AS patience_percentile,
            COUNT(*) FILTER (WHERE spontaneity < :spontaneity) * 100.0 / COUNT(*) AS spontaneity_percentile,
            COUNT(*) FILTER (WHERE chosen_pet = :chosen_pet) * 100.0 / COUNT(*) AS pet_percent
        FROM user_data
    """),
    {
        "sociability": user_data.sociability,
        "persistence": user_data.persistence,
        "patience": user_data.patience,
        "spontaneity": user_data.spontaneity,
        "chosen_pet": user_data.chosen_pet.lower()
    }
    ).fetchone()

    # Convert the result to a ResponseUserData object to be returned to the frontend.
    response = ResponseUserData(
        sociability_percentile=result.sociability_percentile,
        persistence_percentile=result.persistence_percentile,
        patience_percentile=result.patience_percentile,
        spontaneity_percentile=result.spontaneity_percentile,
        pet_percent=result.pet_percent
    )
    return response