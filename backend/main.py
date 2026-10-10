from fastapi import FastAPI
from pydantic import BaseModel
from routers.users import router
from database import engine
from models import Base
from routers.career import router as career_router
from routers.roadmap import router as roadmap_router
from routers.studyplan import router as studyplan_router
from routers.resume import router as resume_router
from routers.career_match import router as career_match_router
from routers.interview import router as interview_router
from routers.dashboard import router as dashboard_router
from fastapi.middleware.cors import CORSMiddleware
from routers.resume_analysis import router as resume_analysis_router 
from routers.interview_evaluation import router as interview_evaluation_router

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

class User(BaseModel):
    name: str
    email: str
    password: str

@app.get("/")
def home():
    return{"message":"Welcome to CareerCompass API!"}

@app.get("/about")

def about():
    return {
        "app": "CareerCompass AI",
        "version": "1.0",
        "developer": "Bhagyash Prashant Vichare"
    }
app.include_router(router)
app.include_router(career_router)
app.include_router(roadmap_router)
app.include_router(studyplan_router)
app.include_router(resume_router)
app.include_router(career_match_router)
app.include_router(interview_router)
app.include_router(dashboard_router)
app.include_router(resume_analysis_router)
app.include_router(interview_evaluation_router)