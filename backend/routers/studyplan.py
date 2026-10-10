from fastapi import APIRouter

router = APIRouter()

study_plans = {
    "AI Engineer": {
        "Monday": "Learn Python",
        "Tuesday": "Practice Python",
        "Wednesday": "Learn Data Structures",
        "Thursday": "Learn Machine Learning",
        "Friday": "Build AI Mini Project",
        "Saturday": "Practice Coding",
        "Sunday": "Revision"
    },

    "Python Developer": {
        "Monday": "Learn Python Basics",
        "Tuesday": "Practice OOP",
        "Wednesday": "Learn FastAPI",
        "Thursday": "Learn Databases",
        "Friday": "Build Backend Project",
        "Saturday": "Practice Git & GitHub",
        "Sunday": "Revision"
    },

    "Data Scientist": {
        "Monday": "Learn Python",
        "Tuesday": "Learn Statistics",
        "Wednesday": "Practice Pandas",
        "Thursday": "Practice NumPy",
        "Friday": "Learn SQL",
        "Saturday": "Build Data Project",
        "Sunday": "Revision"
    }
}

@router.get("/studyplan/{career}")
def get_study_plan(career: str):
    plan = study_plans.get(career)

    if plan is None:
        return {
            "message": "Study plan not found"
        }

    return {
        "career": career,
        "study_plan": plan
    }