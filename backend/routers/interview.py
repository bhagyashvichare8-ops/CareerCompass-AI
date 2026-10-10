from fastapi import APIRouter
from pydantic import BaseModel
import random

router = APIRouter()


class InterviewRequest(BaseModel):
    role: str
    difficulty: str = "Easy"


questions = {
    "AI Engineer": {
        "Easy": [
            "What is Artificial Intelligence?",
            "What is Machine Learning?",
            "What is Deep Learning?",
            "What is a dataset?",
            "What is Python used for in AI?"
        ],
        "Medium": [
            "What is the difference between supervised and unsupervised learning?",
            "What is overfitting and how can you prevent it?",
            "Explain the difference between classification and regression.",
            "What is feature engineering?",
            "What is a neural network?"
        ],
        "Hard": [
            "Explain the vanishing gradient problem.",
            "How does backpropagation work?",
            "What is the bias-variance tradeoff?",
            "Explain attention mechanisms in Transformers.",
            "How would you evaluate a machine learning model in production?"
        ]
    },

    "Data Scientist": {
        "Easy": [
            "What is Data Science?",
            "What is Pandas?",
            "What is NumPy?",
            "What is a dataset?",
            "What is data visualization?"
        ],
        "Medium": [
            "What is feature engineering?",
            "Difference between mean and median?",
            "What is regression?",
            "What is a confusion matrix?",
            "What is cross-validation?"
        ],
        "Hard": [
            "Explain the bias-variance tradeoff.",
            "How would you handle missing data in a large dataset?",
            "Explain regularization and why it is useful.",
            "How would you detect data leakage?",
            "How would you evaluate an imbalanced classification model?"
        ]
    },

    "Full Stack Developer": {
        "Easy": [
            "What is HTML?",
            "What is CSS?",
            "What is JavaScript?",
            "What is React?",
            "What is an API?"
        ],
        "Medium": [
            "What is the difference between frontend and backend?",
            "What is a REST API?",
            "What is state in React?",
            "What is middleware in Node.js?",
            "What is MongoDB?"
        ],
        "Hard": [
            "How would you design a scalable full-stack application?",
            "Explain authentication using JWT.",
            "What is the difference between SQL and NoSQL databases?",
            "How would you improve API performance?",
            "Explain database indexing and its benefits."
        ]
    },

    "Cybersecurity Analyst": {
        "Easy": [
            "What is cybersecurity?",
            "What is a firewall?",
            "What is malware?",
            "What is phishing?",
            "What is an IP address?"
        ],
        "Medium": [
            "What is SQL Injection?",
            "What is OWASP?",
            "What is penetration testing?",
            "What is encryption?",
            "What is incident response?"
        ],
        "Hard": [
            "How would you investigate a suspected security breach?",
            "Explain the difference between symmetric and asymmetric encryption.",
            "How does a SQL Injection attack work?",
            "What is privilege escalation?",
            "How would you secure a web application?"
        ]
    },

    "Cloud Engineer": {
        "Easy": [
            "What is cloud computing?",
            "What is AWS?",
            "What is Azure?",
            "What is Docker?",
            "What is a virtual machine?"
        ],
        "Medium": [
            "What is Kubernetes?",
            "What is Docker used for?",
            "What is CI/CD?",
            "What is cloud storage?",
            "What is Terraform?"
        ],
        "Hard": [
            "How would you design a highly available cloud application?",
            "Explain auto-scaling.",
            "How would you secure an AWS infrastructure?",
            "What is infrastructure as code?",
            "How would you reduce cloud infrastructure costs?"
        ]
    },

    "Android Developer": {
        "Easy": [
            "What is Android?",
            "What is Kotlin?",
            "What is Android Studio?",
            "What is an Activity?",
            "What is Firebase?"
        ],
        "Medium": [
            "What is Jetpack Compose?",
            "What is the Android Activity lifecycle?",
            "What is SQLite?",
            "How do Android applications communicate with APIs?",
            "What is MVVM architecture?"
        ],
        "Hard": [
            "Explain Android lifecycle management.",
            "How would you optimize Android application performance?",
            "Explain dependency injection in Android.",
            "How would you design an offline-first Android application?",
            "How would you secure sensitive data in an Android application?"
        ]
    },

    "Python Developer": {
        "Easy": [
            "What is Python?",
            "What is a list in Python?",
            "What is a tuple?",
            "What is a dictionary?",
            "What is a function?"
        ],
        "Medium": [
            "What are Python decorators?",
            "What is the difference between a list and a tuple?",
            "Explain OOP in Python.",
            "What are generators?",
            "What is PEP 8?"
        ],
        "Hard": [
            "Explain Python memory management.",
            "What are metaclasses?",
            "Explain the Global Interpreter Lock.",
            "How would you optimize a slow Python application?",
            "Explain asynchronous programming in Python."
        ]
    }
}


@router.post("/interview/questions")
def get_questions(data: InterviewRequest):

    role = data.role
    difficulty = data.difficulty

    if role not in questions:
        return {
            "questions": [],
            "message": "No interview questions available for this career."
        }

    if difficulty not in questions[role]:
        difficulty = "Easy"

    available_questions = questions[role][difficulty]

    selected_questions = random.sample(
        available_questions,
        min(5, len(available_questions))
    )

    return {
        "role": role,
        "difficulty": difficulty,
        "questions": selected_questions
    }