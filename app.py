from fastapi import FastAPI, HTTPException
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel, Field
from fastapi.responses import JSONResponse 
from pydantic import BaseModel,Field, BeforeValidator
import motor.motor_asyncio 
from typing import Annotated, List
from bson import ObjectId 
from datetime import date
from dotenv import load_dotenv
import os 
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()
app = FastAPI()


origins = ["https://heathcareserveca.netlify.app",
           "https://aaa-collaboration-nij9.onrender.com",
           ] 
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
    last_visit: date
    doc_remarks: str
    prescription: str

class Patient_Profile_Collection(BaseModel):
    profile_patient: List[Patient_Profile]

@app.get("/profile")
async def get_patient_profile():
    try:
      patient_profile_collection = await info["patient_profiles"].find().to_list(100)

      if not patient_profile_collection:
          raise HTTPException(404, "Patient Profile is not found")
      
      for profile in patient_profile_collection:
            profile["_id"] = str(profile["_id"])
      return Patient_Profile_Collection(profile_patient = patient_profile_collection)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/data")
async def create_patient_profile(profile_request: Patient_Profile):
    patient_profile_dictionary = profile_request.model_dump(by_alias=True)
    created_profile = await info["patient_profiles"].insert_one(patient_profile_dictionary)

    new_patient_profile = await info["patient_profiles"].find_one({"_id":created_profile.inserted_id})

    new_patient_profile["_id"] = str(new_patient_profile["_id"])

    patient_new_profile = Patient_Profile(**new_patient_profile)

    updated_profile_json = jsonable_encoder(patient_new_profile)
    return JSONResponse(updated_profile_json, status_code = 201)


