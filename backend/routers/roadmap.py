from fastapi import APIRouter

router = APIRouter()

roadmaps = {
    "AI Engineer": [
        "Learn Python",
        "Learn Data Structures",
        "Learn Machine Learning",
        "Learn Deep Learning",
        "Build AI Projects",
        "Learn FastAPI",
        "Deploy AI Models"
    ],

    "Data Scientist": [
        "Learn Python",
        "Learn Statistics",
        "Learn Pandas",
        "Learn NumPy",
        "Learn SQL",
        "Learn Machine Learning",
        "Build Data Science Projects"
    ],

    "Python Developer": [
        "Learn Python",
        "Learn OOP",
        "Learn FastAPI",
        "Learn Databases",
        "Build Backend Projects",
        "Learn Git & GitHub"
    ]
}

@router.get("/roadmap/{career}")
def get_roadmap(career: str):
    roadmap = roadmaps.get(career)

    if roadmap is None:
        return {
            "message": "Roadmap not found"
        }

    return {
        "career": career,
        "roadmap": roadmap
    }