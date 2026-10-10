from fastapi import APIRouter
from pydantic import BaseModel
import re

router = APIRouter()


class AnswerEvaluationRequest(BaseModel):
    question: str
    answer: str


# ---------------------------------------------------------
# QUESTION-SPECIFIC CONCEPTS
# Each inner list represents equivalent/related terms.
# Matching any term in a group counts as that concept.
# ---------------------------------------------------------

QUESTION_CONCEPTS = {
    "machine learning": [
        ["data", "dataset", "datasets"],
        ["algorithm", "algorithms"],
        ["model", "models"],
        ["training", "train", "trained", "learn"],
        ["prediction", "predictions", "predict"],
        ["pattern", "patterns"],
    ],

    "artificial intelligence": [
        ["computer", "computers", "machine"],
        ["human intelligence", "intelligence"],
        ["learning", "learn"],
        ["reasoning", "reason"],
        ["decision", "decisions", "decision making"],
        ["problem solving", "problem-solving"],
    ],

    "deep learning": [
        ["neural network", "neural networks"],
        ["layer", "layers"],
        ["data", "dataset"],
        ["model", "models"],
        ["training", "train", "trained"],
        ["pattern", "patterns"],
        ["backpropagation"],
    ],

    "dataset": [
        ["collection", "collect"],
        ["data", "information"],
        ["records", "record"],
        ["analysis", "analyze"],
        ["training", "train"],
        ["machine learning", "machine-learning"],
        ["model", "models"],
    ],

    "python used for ai": [
        ["python"],
        ["data processing", "data analysis", "data"],
        ["machine learning"],
        ["deep learning"],
        ["numpy"],
        ["pandas"],
        ["scikit-learn", "sklearn"],
        ["tensorflow"],
        ["pytorch", "torch"],
        ["api", "apis"],
        ["model", "models"],
    ],

    "python": [
        ["programming", "programming language"],
        ["syntax"],
        ["library", "libraries"],
        ["function", "functions"],
        ["variable", "variables"],
        ["easy", "simple"],
    ],

    "fastapi": [
        ["api", "apis"],
        ["python"],
        ["endpoint", "endpoints"],
        ["http"],
        ["request", "requests"],
        ["response", "responses"],
    ],

    "sql": [
        ["database", "databases"],
        ["query", "queries"],
        ["table", "tables"],
        ["data"],
        ["select"],
        ["join", "joins"],
    ],

    "react": [
        ["component", "components"],
        ["javascript"],
        ["state"],
        ["props"],
        ["ui", "user interface"],
        ["virtual dom", "dom"],
    ],

    "javascript": [
        ["programming", "language"],
        ["browser"],
        ["function", "functions"],
        ["variable", "variables"],
        ["object", "objects"],
        ["event", "events"],
    ],

    "html": [
        ["structure"],
        ["element", "elements"],
        ["tag", "tags"],
        ["web", "website"],
        ["page", "pages"],
        ["document", "documents"],
    ],

    "css": [
        ["style", "styles", "styling"],
        ["design"],
        ["layout"],
        ["element", "elements"],
        ["selector", "selectors"],
        ["responsive", "responsiveness"],
    ],

    "git": [
        ["version", "version control"],
        ["control"],
        ["repository", "repo"],
        ["commit", "commits"],
        ["branch", "branches"],
        ["code"],
    ],

    "github": [
        ["repository", "repo"],
        ["code"],
        ["git"],
        ["branch", "branches"],
        ["commit", "commits"],
        ["collaboration"],
    ],

    "aws": [
        ["cloud"],
        ["service", "services"],
        ["server", "servers"],
        ["storage"],
        ["compute", "computing"],
        ["deployment", "deploy"],
    ],

    "docker": [
        ["container", "containers"],
        ["image", "images"],
        ["application", "applications"],
        ["environment"],
        ["deployment", "deploy"],
    ],

    "kubernetes": [
        ["container", "containers"],
        ["cluster", "clusters"],
        ["pod", "pods"],
        ["deployment", "deployments"],
        ["service", "services"],
    ],

    "linux": [
        ["operating system"],
        ["command", "commands"],
        ["terminal"],
        ["file", "files"],
        ["process", "processes"],
        ["server", "servers"],
    ],

    "networking": [
        ["network", "networks"],
        ["ip", "ip address"],
        ["protocol", "protocols"],
        ["server", "servers"],
        ["client", "clients"],
        ["communication"],
    ],

    "cybersecurity": [
        ["security"],
        ["threat", "threats"],
        ["attack", "attacks"],
        ["protection", "protect"],
        ["data"],
        ["network", "networks"],
    ],

    "kotlin": [
        ["programming", "programming language"],
        ["android"],
        ["variable", "variables"],
        ["function", "functions"],
        ["null", "null safety"],
        ["language"],
    ],

    "android": [
        ["application", "applications"],
        ["activity", "activities"],
        ["android"],
        ["ui", "user interface"],
        ["mobile"],
        ["lifecycle"],
    ],

    "firebase": [
        ["database", "databases"],
        ["authentication"],
        ["cloud"],
        ["android"],
        ["application", "applications"],
        ["storage"],
    ],

    "statistics": [
        ["data"],
        ["mean"],
        ["median"],
        ["distribution"],
        ["probability"],
        ["analysis"],
    ],

    "pandas": [
        ["data"],
        ["dataframe", "data frame"],
        ["rows", "row"],
        ["columns", "column"],
        ["analysis", "analyze"],
        ["python"],
    ],

    "numpy": [
        ["array", "arrays"],
        ["numerical", "numeric"],
        ["data"],
        ["python"],
        ["calculation", "calculations"],
        ["matrix", "matrices"],
    ],

    "database": [
        ["data"],
        ["collection"],
        ["store", "stored", "storage"],
        ["manage", "management"],
        ["retrieve", "retrieval"],
        ["records", "record"],
        ["query", "queries"],
        ["application", "applications"],
    ],

    "overfitting": [
        ["training data", "training"],
        ["test data", "testing", "test set"],
        ["generalization", "generalise", "generalize"],
        ["model"],
        ["validation"],
        ["regularization", "regularisation"],
    ],

    "supervised and unsupervised learning": [
        ["labeled", "labelled", "labels"],
        ["unlabeled", "unlabelled"],
        ["training data", "training"],
        ["classification"],
        ["clustering"],
    ],

    "classification and regression": [
        ["classification"],
        ["regression"],
        ["categorical", "category", "categories"],
        ["continuous", "continuous value"],
        ["prediction", "predict"],
    ],

    "neural network": [
        ["neuron", "neurons"],
        ["layer", "layers"],
        ["input"],
        ["output"],
        ["weights", "weight"],
        ["activation", "activation function"],
    ],

    "feature engineering": [
        ["feature", "features"],
        ["data"],
        ["transformation", "transform"],
        ["selection", "select"],
        ["model"],
    ],

    "rest api": [
        ["api"],
        ["http"],
        ["request", "requests"],
        ["response", "responses"],
        ["endpoint", "endpoints"],
        ["get", "post"],
    ],

    "jwt": [
        ["token", "tokens"],
        ["authentication"],
        ["authorization"],
        ["header"],
        ["secret", "secret key"],
        ["expiration", "expiry"],
    ],

    "sql injection": [
        ["sql"],
        ["database"],
        ["query", "queries"],
        ["input"],
        ["malicious"],
        ["sanitize", "sanitization"],
    ],

    "encryption": [
        ["data"],
        ["security"],
        ["key", "keys"],
        ["encrypt", "encryption"],
        ["decrypt", "decryption"],
    ],

    "firewall": [
        ["network"],
        ["traffic"],
        ["security"],
        ["block", "blocking"],
        ["allow"],
        ["rules"],
    ],

    "cloud computing": [
        ["cloud"],
        ["server", "servers"],
        ["internet"],
        ["resources"],
        ["storage"],
        ["compute", "computing"],
    ],

    "docker used for": [
        ["container", "containers"],
        ["application", "applications"],
        ["environment"],
        ["deployment", "deploy"],
        ["image", "images"],
    ],

    "kubernetes": [
        ["container", "containers"],
        ["cluster", "clusters"],
        ["pod", "pods"],
        ["deployment", "deployments"],
        ["service", "services"],
    ],
}


# ---------------------------------------------------------
# Normalize text
# ---------------------------------------------------------

def normalize_text(text: str):
    text = text.lower()

    # Keep useful technical characters but normalize punctuation.
    text = re.sub(r"[^a-z0-9+#.\-\s]", " ", text)

    # Remove repeated spaces.
    text = re.sub(r"\s+", " ", text).strip()

    return text


# ---------------------------------------------------------
# Find the concept category that best matches the question.
# ---------------------------------------------------------

def find_question_concepts(question: str):

    question_lower = normalize_text(question)

    # More specific questions first.
    question_keywords = [
        "python used for ai",
        "supervised and unsupervised learning",
        "classification and regression",
        "feature engineering",
        "artificial intelligence",
        "machine learning",
        "deep learning",
        "database",
        "overfitting",
        "neural network",
        "rest api",
        "sql injection",
        "cloud computing",
        "docker",
        "kubernetes",
        "jwt",
        "encryption",
        "firewall",
        "fastapi",
        "javascript",
        "python",
        "react",
        "html",
        "css",
        "sql",
        "git",
        "github",
        "aws",
        "linux",
        "networking",
        "cybersecurity",
        "kotlin",
        "android",
        "firebase",
        "pandas",
        "numpy",
        "statistics",
    ]

    for keyword in question_keywords:
        if keyword in question_lower:
            return QUESTION_CONCEPTS.get(keyword, [])

    return []


# ---------------------------------------------------------
# Check whether the answer contains a practical example.
# ---------------------------------------------------------

def contains_example(answer: str):

    answer_lower = normalize_text(answer)

    example_phrases = [
        "for example",
        "for instance",
        "such as",
        "in a real",
        "real world",
        "real-world",
        "e.g",
        "for a website",
        "for an application",
        "for an app",
        "for instance",
    ]

    return any(
        phrase in answer_lower
        for phrase in example_phrases
    )


# ---------------------------------------------------------
# Count concept groups matched.
# ---------------------------------------------------------

def get_concept_matches(answer: str, concept_groups):

    answer_lower = normalize_text(answer)

    matched_concepts = []

    for group in concept_groups:

        for term in group:

            if term in answer_lower:
                matched_concepts.append(term)
                break

    return matched_concepts


# ---------------------------------------------------------
# Evaluate answer
# ---------------------------------------------------------

@router.post("/interview/evaluate")
def evaluate_answer(data: AnswerEvaluationRequest):

    question = data.question.strip()
    answer = data.answer.strip()

    # -----------------------------------------------------
    # Empty answer
    # -----------------------------------------------------

    if not answer:

        return {
            "score": 0,
            "feedback": (
                "Please provide an answer before submitting."
            ),
            "strengths": [],
            "improvements": [
                "Write a clear answer to the interview question."
            ],
            "word_count": 0,
            "concepts_matched": [],
        }

    # -----------------------------------------------------
    # Normalize
    # -----------------------------------------------------

    answer_lower = normalize_text(answer)

    word_count = len(answer.split())

    # -----------------------------------------------------
    # Find relevant concepts
    # -----------------------------------------------------

    concept_groups = find_question_concepts(question)

    concept_matches = get_concept_matches(
        answer,
        concept_groups
    )

    # -----------------------------------------------------
    # Concept score: 0–5
    # -----------------------------------------------------

    if concept_groups:

        concept_ratio = (
            len(concept_matches) /
            len(concept_groups)
        )

        concept_score = round(
            concept_ratio * 5
        )

    else:

        # Generic fallback when the question is unknown.
        concept_score = 3 if word_count >= 30 else 2

    concept_score = min(
        max(concept_score, 0),
        5
    )

    # -----------------------------------------------------
    # Explanation score: 0–3
    # -----------------------------------------------------

    if word_count >= 80:

        explanation_score = 3

    elif word_count >= 50:

        explanation_score = 2

    elif word_count >= 30:

        explanation_score = 1

    else:

        explanation_score = 0

    # -----------------------------------------------------
    # Example score: 0–1
    # -----------------------------------------------------

    example_score = (
        1
        if contains_example(answer)
        else 0
    )

    # -----------------------------------------------------
    # Structure / clarity score: 0–1
    # -----------------------------------------------------

    clarity_score = 0

    if word_count >= 25:

        clarity_score = 1

    # -----------------------------------------------------
    # Final score
    #
    # Maximum:
    # concepts    = 5
    # explanation = 3
    # example     = 1
    # clarity     = 1
    #
    # Total       = 10
    # -----------------------------------------------------

    score = (
        concept_score
        + explanation_score
        + example_score
        + clarity_score
    )

    score = min(score, 10)

    # -----------------------------------------------------
    # Prevent very short answers from receiving high scores.
    # -----------------------------------------------------

    if word_count < 10:

        score = min(score, 2)

    elif word_count < 20:

        score = min(score, 4)

    # -----------------------------------------------------
    # Strengths
    # -----------------------------------------------------

    strengths = []

    if concept_matches:

        strengths.append(
            "You correctly mentioned important concepts "
            "related to the question."
        )

    if len(concept_matches) >= 3:

        strengths.append(
            "You covered several relevant technical points."
        )

    if word_count >= 50:

        strengths.append(
            "Your answer provides enough explanation "
            "to demonstrate your understanding."
        )

    if contains_example(answer):

        strengths.append(
            "You included a practical example."
        )

    if not strengths:

        strengths.append(
            "You made an attempt to explain the topic."
        )

    # -----------------------------------------------------
    # Improvements
    # -----------------------------------------------------

    improvements = []

    if concept_groups and len(concept_matches) < 2:

        improvements.append(
            "Mention more important technical concepts "
            "directly related to the question."
        )

    elif concept_groups and len(concept_matches) < len(concept_groups) * 0.6:

        improvements.append(
            "Expand the explanation with a few more "
            "technical details."
        )

    if word_count < 30:

        improvements.append(
            "Give a slightly more detailed explanation "
            "so the interviewer can understand your knowledge."
        )

    if not contains_example(answer):

        improvements.append(
            "Add a simple practical example when appropriate."
        )

    if not improvements:

        improvements.append(
            "Keep the answer clear, structured, and concise "
            "during the interview."
        )

    # -----------------------------------------------------
    # Feedback
    # -----------------------------------------------------

    if score >= 9:

        feedback = (
            "Excellent answer. You demonstrated strong "
            "understanding and communicated the concept clearly."
        )

    elif score >= 8:

        feedback = (
            "Strong answer. You demonstrated good understanding "
            "and included relevant technical details."
        )

    elif score >= 6:

        feedback = (
            "Good answer. You understand the main concept, "
            "but adding a little more technical depth would "
            "make the answer stronger."
        )

    elif score >= 4:

        feedback = (
            "Developing answer. You have the basic idea, "
            "but the explanation needs more relevant "
            "technical detail."
        )

    else:

        feedback = (
            "Your answer needs improvement. Focus on the "
            "main concept, use relevant technical terminology, "
            "and explain the idea clearly."
        )

    # -----------------------------------------------------
    # Return result
    # -----------------------------------------------------

    return {
        "score": score,
        "feedback": feedback,
        "strengths": strengths,
        "improvements": improvements,
        "word_count": word_count,
        "concepts_matched": concept_matches,
    }