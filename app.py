from fastapi import FastAPI, HTTPException
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel, Field
from fastapi.responses import JSONResponse 
from pydantic import BaseModel,Field, BeforeValidator
import motor.motor_asyncio 
from typing import Annotated, List
from bson import ObjectId 
from datetime import date, datetime
from dotenv import load_dotenv
import os 
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Depends   #use this delay running our security endpoint to ensure its actually a doctor gaining access
from passlib.hash import bcrypt

load_dotenv()
app = FastAPI()

worker_username = "work1work2work3r"
worker_password = "health-hub-secure"

origins = ["http://localhost:5500", "http://127.0.0.1:5500"] 
#is render part of origin?

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

PyObjectId = Annotated[str, BeforeValidator(str)]
connection = motor.motor_asyncio.AsyncIOMotorClient(os.getenv("MONGODB_URL"))
db = connection.patient
info = db.data




class Patient_Profile(BaseModel):
    id: PyObjectId | None = Field(default=None, alias="_id")
    patient_name: str
    patient_age: int
    patient_height: float
    patient_gender: str
    patient_weight: float
    patient_dia: float
    patient_sys:float
    patient_temp: float
    patient_cal: float
    last_visit: date
    pre_con: str
    next_visit: date
    doc_remarks: str
    prescription: str

class Patient_Profile_Collection(BaseModel):
    profile_patient: List[Patient_Profile]

class WorkerLoginRequest(BaseModel):
    username: str
    password: str

class SignUpData(BaseModel):
    firstname: str
    lastname: str
    username: str
    password: str
    email: str
    typeOfUser: str

@app.get("/profile")
async def get_patient_profile():
    try:
        profiles = await info.find().to_list(100)

        if not profiles:
            raise HTTPException(404, "No profiles found")

        for profile in profiles:
            profile["_id"] = str(profile["_id"])  # Convert ObjectId to string

        return Patient_Profile_Collection(profile_patient=profiles)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/data")
async def create_patient_profile(profile_request: Patient_Profile):

    patient_profile_dictionary = profile_request.model_dump(by_alias=True, exclude_none=True)

    # Convert all date objects to datetime
    for key in ["last_visit", "next_visit"]:
        if isinstance(patient_profile_dictionary[key], date):
            patient_profile_dictionary[key] = datetime(
                patient_profile_dictionary[key].year,
                patient_profile_dictionary[key].month,
                patient_profile_dictionary[key].day
            )


    created_profile = await info.insert_one(patient_profile_dictionary)

    new_patient_profile = await info.find_one({"_id":created_profile.inserted_id})

    new_patient_profile["_id"] = str(new_patient_profile["_id"])

    patient_new_profile = Patient_Profile(**new_patient_profile)

    updated_profile_json = jsonable_encoder(patient_new_profile)
    return JSONResponse(updated_profile_json, status_code = 201)

@app.post("/secureLogin")
async def securityCheck(credentials: WorkerLoginRequest):
    if credentials.username == worker_username and credentials.password == worker_password:
        return {
            "status": "Success",
            "message": "Login was succesful"
        }
    else:
        raise HTTPException(status_code=401, detail="Invalid username and/or password")

@app.post("/signUp")
async def clientSignUp(signup_request: SignUpData):
    password = bcrypt.hash(signup_request.password);

    #database insertion 
    await db.users.insert_one({
        "firstname": signup_request.firstname,
        "lastname": signup_request.lastname,
        "username": signup_request.username,
        "pasword": password,
        "email": signup_request.email,
        "typeOfUser": signup_request.typeOfUser
    })

    return{"username": signup_request.username,
        "message": "User Registration Successful"}
