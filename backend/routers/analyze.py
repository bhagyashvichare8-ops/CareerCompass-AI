from fastapi import APIRouter, UploadFile, File
import fitz

router = APIRouter()

skills_database = {
    "Python": ["python"],
    "SQL": ["sql"],
    "FastAPI": ["fastapi"],
    "Machine Learning": ["machine learning", "ml"],
    "Deep Learning": ["deep learning"],
    "Pandas": ["pandas"],
    "NumPy": ["numpy"],
    "Git": ["git"],
    "GitHub": ["github"],
    "Docker": ["docker"],
    "HTML": ["html"],
    "CSS": ["css"],
    "JavaScript": ["javascript", "js"],
    "Java": ["java"],
    "C++": ["c++"]
}

@router.post("/resume/analyze")
async def analyze_resume(file: UploadFile = File(...)):
    pdf_bytes = await file.read()

    doc = fitz.open(stream=pdf_bytes, filetype="pdf")

    text = ""

    for page in doc:
        text += page.get_text()

    doc.close()

    text = text.lower()

    found_skills = []

    for skill, keywords in skills_database.items():
        for keyword in keywords:
            if keyword in text:
                found_skills.append(skill)
                break

    all_skills = list(skills_database.keys())

    missing_skills = []

    for skill in all_skills:
        if skill not in found_skills:
            missing_skills.append(skill)

    score = min(len(found_skills) * 10, 100)

    suggestions = []

    if score < 40:
        suggestions.append("Add more technical skills.")
        suggestions.append("Build more projects.")
        suggestions.append("Mention certifications.")
    elif score < 70:
        suggestions.append("Improve your project section.")
        suggestions.append("Add GitHub and portfolio links.")
    else:
        suggestions.append("Your resume has a good technical foundation.")
        suggestions.append("Focus on adding achievements with measurable results.")

    return {
        "skills_found": found_skills,
        "missing_skills": missing_skills,
        "resume_score": score,
        "suggestions": suggestions
    }