from fastapi import FastAPI, HTTPException, Query
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
from passlib.hash import bcrypt

load_dotenv()
app = FastAPI()


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
secure = db.input




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


class SignUpData(BaseModel):
    firstname: str
    lastname: str
    username: str
    password: str
    email: str
    
class WorkerLoginRequest(BaseModel):
    username: str
    password: str
    email: str


@app.get("/profile/{username}")
async def get_patient_profile(username: str):
    try:
        username = username.strip()
        print(f"Debug: Searching for username '{username}'")  # Debug log

        user_data = await secure.find_one({"username": username})
        print(f"Debug: User found: {user_data}")  # Debug log

        if not user_data:
            # Check if it's a case issue
            user_data = await secure.find_one({"username": {"$regex": f"^{username}$", "$options": "i"}})
            print(f"Debug: User after case-insensitive search: {user_data}")  # Debug log


        if not user_data:
            raise HTTPException(status_code=404, detail="User not found in input database")

        firstname = user_data.get("firstname")
        lastname = user_data.get("lastname")
        if not firstname:
            raise HTTPException(status_code=404, detail="Firstname not found for user")
        if not lastname:
            raise HTTPException(status_code=404, detail="Lastname not found for user")
        
        result_name = f"{firstname.strip()} {lastname.strip()}"

        
        profile = await info.find_one({"patient_name": result_name})
        if not profile:
            raise HTTPException(status_code=404, detail="No patient profile matches this user")

        
        profile["_id"] = str(profile["_id"])

        return Patient_Profile(**profile)
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

@app.post("/login", status_code=201)
async def securityCheck(credentials: WorkerLoginRequest):

    # check if the person logging in sign up first
    existing = await secure.find_one({"username": credentials.username})

    if not existing:
        raise HTTPException(status_code=404, detail="Invalid username and/or password")
    if bcrypt.verify(credentials.password, existing["password"]):
        return {"username": existing["username"], "email": existing["email"]}
    else:
        raise HTTPException(status_code=404, detail="Invalid username or password")


@app.post("/signup")
async def clientSignUp(signup_request: SignUpData, status_code=201): 

    existing = await secure.find_one({"username": signup_request.username})
    

    # check if username already exists
    if existing :
        raise HTTPException(status_code=400, detail="Username already taken")
    
        
    # insert user if not exists
    new_user_dict = signup_request.model_dump(by_alias=True, exclude_none=True)
    new_user_dict["password"] =  bcrypt.hash(signup_request.password)
    
    created_user = await secure.insert_one(new_user_dict)


    return{"username": signup_request.username,
        "message": "User Registration Successful"}

