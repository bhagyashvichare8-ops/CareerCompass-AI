from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


# Skills required/recommended for each career
career_requirements = {
    "AI Engineer": [
        "Python",
        "Machine Learning",
        "Deep Learning",
        "Git",
        "GitHub",
        "FastAPI",
    ],

    "Data Scientist": [
        "Python",
        "SQL",
        "Pandas",
        "NumPy",
        "Machine Learning",
        "Statistics",
    ],

    "Python Developer": [
        "Python",
        "FastAPI",
        "Git",
        "GitHub",
        "SQL",
    ],

    "Full Stack Developer": [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Node.js",
        "SQL",
        "Git",
        "GitHub",
    ],

    "Cybersecurity Analyst": [
        "Networking",
        "Linux",
        "Cybersecurity",
        "Python",
        "SQL",
        "Git",
    ],

    "Cloud Engineer": [
        "AWS",
        "Docker",
        "Kubernetes",
        "Linux",
        "Python",
        "Git",
    ],

    "Android Developer": [
        "Kotlin",
        "Android",
        "Android Studio",
        "Firebase",
        "Git",
    ],
}


class CareerMatchInput(BaseModel):
    career: str
    skills: list[str]


def normalize_skill(skill: str) -> str:
    """
    Normalize skills so small differences such as
    HTML/html and JavaScript/javascript are treated equally.
    """
    return (
        skill.strip()
        .lower()
        .replace("-", "")
        .replace("_", "")
        .replace(" ", "")
    )


@router.post("/career/match")
def career_match(data: CareerMatchInput):

    required = career_requirements.get(data.career, [])

    # Normalize user's resume skills
    user_skills = {
        normalize_skill(skill)
        for skill in data.skills
        if skill.strip()
    }

    matched = []
    missing = []

    # Compare required skills with user's skills
    for skill in required:

        if normalize_skill(skill) in user_skills:
            matched.append(skill)
        else:
            missing.append(skill)

    # Calculate match percentage
    if len(required) == 0:
        score = 0
    else:
        score = int((len(matched) / len(required)) * 100)

    # Explain the match level
    if score >= 80:
        match_level = "Excellent Match"
        match_message = (
            "You already have most of the important skills "
            "required for this career."
        )

    elif score >= 60:
        match_level = "Strong Match"
        match_message = (
            "You have a strong foundation for this career, "
            "but a few important skills are still missing."
        )

    elif score >= 40:
        match_level = "Developing Match"
        match_message = (
            "You have some relevant skills for this career, "
            "but several important skills still need to be developed."
        )

    else:
        match_level = "Early Match"
        match_message = (
            "You currently have limited overlap with the skills "
            "required for this career. Focus on the missing skills "
            "to build your foundation."
        )

    # Treat the missing skills as the learning priorities.
    priority_missing_skills = missing[:3]

    # Return complete career-match result
    return {
        "career": data.career,
        "match_score": score,
        "match_level": match_level,
        "match_message": match_message,
        "matched_skills": matched,
        "missing_skills": missing,
        "priority_missing_skills": priority_missing_skills,
        "user_skills": data.skills,
        "required_skills": required,
    }