from fastapi import APIRouter
from pydantic import BaseModel
from routers.roadmap import roadmaps

router = APIRouter()

class CareerInput(BaseModel):
    skills: list[str]
    interests: list[str]
    education: str

@router.post("/career")
def recommend_career(data: CareerInput):

    recommendations = []

    if "python" in [skill.lower() for skill in data.skills]:
        recommendations.append("Python Developer")

    if "ai" in [interest.lower() for interest in data.interests]:
        recommendations.append("AI Engineer")

    if "data science" in [interest.lower() for interest in data.interests]:
        recommendations.append("Data Scientist")

    if not recommendations:
        recommendations.append("Software Developer")

    result = []
    for career in recommendations:
        result.append({"career":career,"roadmap":roadmaps.get(career, [])})

    return{"recommendations":result}