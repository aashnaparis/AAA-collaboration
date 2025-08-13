from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import motor.motor_asyncio
import os

# -------- MongoDB Connection --------
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
db = client["hospital"]
patients_collection = db["patients"]

# -------- FastAPI App --------
app = FastAPI()

# -------- Request Model --------
class Patient(BaseModel):
    patient_name: str
    patient_age: int

# -------- POST Route --------
@app.post("/patients")
async def add_patient(patient: Patient):
    data = patient.dict()
    result = await patients_collection.insert_one(data)

    if result.inserted_id:
        return {"message": "Patient added successfully", "id": str(result.inserted_id)}
    else:
        raise HTTPException(status_code=500, detail="Failed to add patient")

# -------- Run Command --------
# Save this file as app.py
# Install dependencies: pip install fastapi uvicorn motor
# Run: uvicorn app:app --reload
