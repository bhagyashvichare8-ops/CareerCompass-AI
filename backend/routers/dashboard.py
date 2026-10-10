from fastapi import APIRouter

router = APIRouter()

@router.get("/dashboard")
def dashboard():

    return {
         "message": "Welcome to CareerCompass Dashboard",
    "stats": {
        "Career Recommendation": "Completed",
        "Roadmap": "Completed",
        "Study Plan": "Completed",
        "Resume Upload": "Completed",
        "Resume Analysis": "Completed",
        "Career Match": "Completed",
        "Interview Questions": "Completed"
    }
}