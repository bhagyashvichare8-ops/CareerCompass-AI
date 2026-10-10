from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class ResumeRequest(BaseModel):
    text: str


@router.post("/resume/analyze")
def analyze_resume(data: ResumeRequest):

    text = data.text.lower()

    # ---------------------------------------------------------
    # SKILLS DATABASE
    # ---------------------------------------------------------

    skills_database = [
        "python",
        "java",
        "javascript",
        "typescript",
        "react",
        "html",
        "css",
        "sql",
        "mysql",
        "postgresql",
        "mongodb",
        "fastapi",
        "flask",
        "django",
        "git",
        "github",
        "docker",
        "aws",
        "azure",
        "machine learning",
        "deep learning",
        "artificial intelligence",
        "data science",
        "data analytics",
        "pandas",
        "numpy",
        "tensorflow",
        "pytorch",
        "scikit-learn",
        "power bi",
        "excel",
        "firebase",
        "kotlin",
        "flutter",
        "rest api",
        "api",
    ]

    # ---------------------------------------------------------
    # FIND SKILLS
    # ---------------------------------------------------------

    skills_found = []

    for skill in skills_database:
        if skill in text:
            skills_found.append(skill.title())

    # Remove duplicates
    skills_found = list(dict.fromkeys(skills_found))

    # ---------------------------------------------------------
    # EDUCATION
    # ---------------------------------------------------------

    education_keywords = [
        "b.sc",
        "bsc",
        "btech",
        "b.tech",
        "b.e",
        "be ",
        "m.sc",
        "msc",
        "mtech",
        "m.tech",
        "degree",
        "bachelor",
        "master",
        "university",
        "college",
    ]

    education_found = any(
        keyword in text for keyword in education_keywords
    )

    # ---------------------------------------------------------
    # EXPERIENCE
    # ---------------------------------------------------------

    internship_found = "internship" in text or "intern" in text

    experience_keywords = [
        "experience",
        "work experience",
        "professional experience",
        "employment",
    ]

    experience_found = any(
        keyword in text for keyword in experience_keywords
    )

    # ---------------------------------------------------------
    # PROJECTS
    # ---------------------------------------------------------

    project_found = (
        "project" in text
        or "projects" in text
    )

    # ---------------------------------------------------------
    # GITHUB / LINKEDIN
    # ---------------------------------------------------------

    github_found = "github" in text
    linkedin_found = "linkedin" in text

    # ---------------------------------------------------------
    # SKILL-BASED MISSING SKILLS
    # ---------------------------------------------------------

    missing_skills = []

    recommended_skill_set = [
        "Python",
        "SQL",
        "Git",
        "REST API",
        "Machine Learning",
        "Docker",
        "Unit Testing",
        "CI/CD",
    ]

    for skill in recommended_skill_set:

        if skill.lower() not in text:
            missing_skills.append(skill)

    # ---------------------------------------------------------
    # STRENGTHS
    # ---------------------------------------------------------

    strengths = []

    if education_found:
        strengths.append(
            "Educational qualification detected"
        )

    if len(skills_found) >= 3:
        strengths.append(
            "Good range of technical skills detected"
        )

    elif len(skills_found) > 0:
        strengths.append(
            "Technical skills detected"
        )

    if project_found:
        strengths.append(
            "Projects section detected"
        )

    if internship_found:
        strengths.append(
            "Internship experience detected"
        )

    if github_found:
        strengths.append(
            "GitHub profile included"
        )

    if linkedin_found:
        strengths.append(
            "LinkedIn profile included"
        )

    # ---------------------------------------------------------
    # WEAKNESSES
    # ---------------------------------------------------------

    weaknesses = []

    if not education_found:
        weaknesses.append(
            "Education section missing or unclear"
        )

    if not project_found:
        weaknesses.append(
            "Projects section missing"
        )

    if not internship_found:
        weaknesses.append(
            "No internship experience detected"
        )

    if not github_found:
        weaknesses.append(
            "GitHub profile missing"
        )

    if not linkedin_found:
        weaknesses.append(
            "LinkedIn profile missing"
        )

    if len(skills_found) < 3:
        weaknesses.append(
            "Resume contains limited technical skills"
        )

    # ---------------------------------------------------------
    # SUGGESTIONS
    # ---------------------------------------------------------

    suggestions = []

    if not project_found:
        suggestions.append(
            "Add 2-3 relevant academic or personal projects"
        )

    if not internship_found:
        suggestions.append(
            "Add internship or practical experience"
        )

    if not github_found:
        suggestions.append(
            "Add your GitHub profile"
        )

    if not linkedin_found:
        suggestions.append(
            "Add your LinkedIn profile"
        )

    if "sql" not in text:
        suggestions.append(
            "Consider adding SQL if relevant to your target role"
        )

    if "rest api" not in text and "api" not in text:
        suggestions.append(
            "Add REST API experience if you have worked with APIs"
        )

    if "git" not in text:
        suggestions.append(
            "Add Git/version-control experience"
        )

    if not suggestions:
        suggestions.append(
            "Keep improving your resume with measurable achievements"
        )

    # ---------------------------------------------------------
    # RESUME SCORE
    # ---------------------------------------------------------

    score = 50

    if education_found:
        score += 10

    if len(skills_found) >= 3:
        score += 10

    if len(skills_found) >= 6:
        score += 5

    if project_found:
        score += 10

    if internship_found:
        score += 10

    if github_found:
        score += 3

    if linkedin_found:
        score += 2

    if experience_found:
        score += 5

    score = min(score, 100)

    # ---------------------------------------------------------
    # ATS SCORE
    # ---------------------------------------------------------

    ats_score = 50

    if education_found:
        ats_score += 10

    if len(skills_found) >= 3:
        ats_score += 10

    if len(skills_found) >= 6:
        ats_score += 10

    if project_found:
        ats_score += 10

    if internship_found:
        ats_score += 5

    if github_found:
        ats_score += 2

    if linkedin_found:
        ats_score += 3

    ats_score = min(ats_score, 100)

    # ---------------------------------------------------------
    # EXPERIENCE LEVEL
    # ---------------------------------------------------------

    if internship_found or experience_found:
        experience_level = "Junior"
    else:
        experience_level = "Fresher"

    # ---------------------------------------------------------
    # RECOMMENDED ROLES
    # ---------------------------------------------------------

    recommended_roles = []

    if "python" in text:
        recommended_roles.append(
            "Python Developer"
        )

    if (
        "machine learning" in text
        or "tensorflow" in text
        or "pytorch" in text
        or "scikit-learn" in text
        or "artificial intelligence" in text
    ):
        recommended_roles.append(
            "AI / Machine Learning Engineer"
        )

    if (
        "data science" in text
        or "pandas" in text
        or "numpy" in text
        or "data analytics" in text
    ):
        recommended_roles.append(
            "Data Analyst / Data Scientist"
        )

    if (
        "javascript" in text
        or "react" in text
        or "html" in text
        or "css" in text
    ):
        recommended_roles.append(
            "Frontend Developer"
        )

    if (
        "fastapi" in text
        or "flask" in text
        or "django" in text
        or "rest api" in text
    ):
        recommended_roles.append(
            "Backend Developer"
        )

    if "java" in text:
        recommended_roles.append(
            "Java Developer"
        )

    # Default roles
    if not recommended_roles:
        recommended_roles = [
            "Software Developer",
            "Python Developer",
            "Junior Data Analyst",
        ]

    # Remove duplicate roles
    recommended_roles = list(
        dict.fromkeys(recommended_roles)
    )

    # ---------------------------------------------------------
    # ATS KEYWORDS
    # ---------------------------------------------------------

    ats_keywords_missing = []

    important_keywords = [
        "REST API",
        "Unit Testing",
        "CI/CD",
        "Docker",
        "Git",
        "SQL",
        "Cloud",
        "Agile",
    ]

    for keyword in important_keywords:

        if keyword.lower() not in text:
            ats_keywords_missing.append(keyword)

    # ---------------------------------------------------------
    # INTERVIEW QUESTIONS
    # ---------------------------------------------------------

    interview_questions = [
        "Explain your biggest project.",
        "What are your strongest technical skills?",
        "How did you solve a difficult problem in your project?",
        "Explain how Git and GitHub are used in software development.",
        "What technology or skill are you currently learning?",
    ]

    if "python" in text:
        interview_questions[1] = (
            "Explain your experience with Python."
        )

    if "sql" in text:
        interview_questions[2] = (
            "Explain your experience with SQL and databases."
        )

    if "machine learning" in text:
        interview_questions[3] = (
            "Explain a machine learning project you have worked on."
        )

    # ---------------------------------------------------------
    # SUMMARY
    # ---------------------------------------------------------

    if experience_level == "Fresher":
        summary = (
            "Fresher with a technical background and "
            f"skills including {', '.join(skills_found[:6])}. "
            "The resume shows potential for entry-level "
            "technology roles."
        )
    else:
        summary = (
            f"Junior technology candidate with skills including "
            f"{', '.join(skills_found[:6])} and practical experience."
        )

    # ---------------------------------------------------------
    # FINAL RESPONSE
    # ---------------------------------------------------------

    return {

        # Frontend-compatible fields
        "score": score,
        "ats_score": ats_score,
        "strengths": strengths,
        "weaknesses": weaknesses,
        "suggestions": suggestions,

        # Advanced Resume Analyzer fields
        "resume_score": score,
        "skills_found": skills_found,
        "missing_skills": missing_skills,
        "summary": summary,
        "recommended_roles": recommended_roles,
        "experience_level": experience_level,
        "ats_keywords_missing": ats_keywords_missing,
        "interview_questions": interview_questions,

        # Extra information
        "education_detected": education_found,
        "internship_detected": internship_found,
        "projects_detected": project_found,
        "github_detected": github_found,
        "linkedin_detected": linkedin_found,
    }