from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel, Field
from fastapi.responses import JSONResponse 
import motor.motor_asyncio 
from typing import Annotated, List
from bson import ObjectId 
from datetime import datetime 
from dotenv import load_dotenv
import os 
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()
app = FastAPI()

origins = [" "]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

connection = motor.motor_asyncio.AsyncIOMotorClient(os.getenv("MONGODB_URL"))
patient_db = connection.patient

#PyObjectId = Annotated[str, BeforeValidator(str)]

class Patient_Profile(BaseModel):
    id: str| None = Field(default=None, alias="_id")
    #id: PyObjectId | None = Field(default = None, alias="patient_id")
    patient_name: str
    #visit_date : datetime
    #patient_gender: str
    #patient_age: int
    #patient_bp: int 
    patient_weight: float
    #patient_temp: float
    #patient_pre_conditions: str 
    #patient_meds: str 
    #next_visit_date: datetime

class Patient_Profile_Collection(BaseModel):
    profile_patient: List[Patient_Profile]

@app.get("/patient_profile")
async def get_patient_profile():
    patient_profile_collection = await patient_db["patient_profiles"].find().to_list(100)
    for profile in patient_profile_collection:
        profile["_id"] = str(profile["_id"])
    return Patient_Profile_Collection(profile_patient = patient_profile_collection)

@app.post("/patient_profile")
async def create_patient_profile(profile_request: Patient_Profile):
    patient_profile_dictionary = profile_request.model_dump(by_alias=True)
    created_profile = await patient_db["patient_profiles"].insert_one(patient_profile_dictionary)

    new_patient_profile = await patient_db["patient_profiles"].find_one({"_id":created_profile.inserted_id})

    new_patient_profile["_id"] = str(new_patient_profile["_id"])

    patient_new_profile = Patient_Profile(**new_patient_profile)

    updated_profile_json = jsonable_encoder(patient_new_profile)
    return JSONResponse(updated_profile_json, status_code = 201)


