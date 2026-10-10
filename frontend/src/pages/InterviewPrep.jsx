import { useState, useContext, useEffect } from "react";
import { CareerContext } from "../context/CareerContext";

function InterviewPrep() {
  const {
    setInterviewCompleted,
    setInterviewScore,
  } = useContext(CareerContext);
  const [career, setCareer] = useState("AI Engineer");
  const [difficulty, setDifficulty] = useState("Easy");

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [answers, setAnswers] = useState({});
  const [evaluations, setEvaluations] = useState({});
  const [evaluating, setEvaluating] = useState({});

  const [showQuestions, setShowQuestions] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
  if (
    questions.length > 0 &&
    Object.keys(evaluations).length === questions.length
  ) {
    const scores = Object.values(evaluations)
      .map((evaluation) => Number(evaluation.score))
      .filter((score) => !isNaN(score));

    if (scores.length === questions.length) {
      const averageScore =
        scores.reduce((total, score) => total + score, 0) / scores.length;

      setInterviewScore(Number(averageScore.toFixed(1)));
      setInterviewCompleted(true);
    }
  }
}, [
  evaluations,
  questions.length,
  setInterviewScore,
  setInterviewCompleted,
]);

  const generateQuestions = async () => {
    setLoading(true);
setShowQuestions(false);
setQuestions([]);
setAnswers({});
setEvaluations({});
setError("");

setInterviewCompleted(false);
setInterviewScore(0);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/interview/questions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            role: career,
            difficulty: difficulty,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to generate interview questions."
        );
      }

      const data = await response.json();

      if (!Array.isArray(data.questions)) {
        throw new Error("Invalid response from server.");
      }

      setQuestions(data.questions);
      setShowQuestions(true);
    } catch (err) {
      console.error("Interview Prep Error:", err);

      setError(
        "Failed to generate questions. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (index, value) => {
    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [index]: value,
    }));
  };

  const evaluateAnswer = async (question, index) => {
    const answer = answers[index] || "";

    if (!answer.trim()) {
      alert("Please write your answer first.");
      return;
    }

    setEvaluating((previous) => ({
      ...previous,
      [index]: true,
    }));

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/interview/evaluate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: question,
            answer: answer,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to evaluate answer."
        );
      }

      const data = await response.json();

      setEvaluations((previousEvaluations) => ({
        ...previousEvaluations,
        [index]: data,
      }));
    } catch (err) {
      console.error(
        "Answer Evaluation Error:",
        err
      );

      alert(
        "Failed to evaluate your answer. Check the backend terminal."
      );
    } finally {
      setEvaluating((previous) => ({
        ...previous,
        [index]: false,
      }));
    }
  };

  return (
    <>
      <h1>🎤 Interview Preparation</h1>

      <p
        style={{
          color: "#bdbdbd",
          marginTop: "10px",
          marginBottom: "30px",
        }}
      >
        Practice interview questions and receive feedback
        on your answers.
      </p>

      {/* Interview Settings */}

      <div className="career-card">
        <h2>Select Career</h2>

        <select
          value={career}
          onChange={(e) => {
            setCareer(e.target.value);
            setShowQuestions(false);
            setQuestions([]);
            setAnswers({});
            setEvaluations({});
            setError("");
          }}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "20px",
            borderRadius: "10px",
          }}
        >
          <option>AI Engineer</option>
          <option>Data Scientist</option>
          <option>Full Stack Developer</option>
          <option>Cybersecurity Analyst</option>
          <option>Cloud Engineer</option>
          <option>Android Developer</option>
          <option>Python Developer</option>
        </select>

        <h2 style={{ marginTop: "30px" }}>
          Difficulty
        </h2>

        <select
          value={difficulty}
          onChange={(e) => {
            setDifficulty(e.target.value);
            setShowQuestions(false);
            setQuestions([]);
            setAnswers({});
            setEvaluations({});
            setError("");
          }}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "20px",
            borderRadius: "10px",
          }}
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <button
          style={{
            marginTop: "30px",
          }}
          onClick={generateQuestions}
          disabled={loading}
        >
          {loading
            ? "Generating Questions..."
            : "Generate Questions"}
        </button>

        {error && (
          <p
            style={{
              color: "#EF4444",
              marginTop: "20px",
            }}
          >
            ❌ {error}
          </p>
        )}
      </div>

      {/* Questions */}

      {showQuestions && questions.length > 0 && (
        <div
          className="career-card"
          style={{
            marginTop: "30px",
          }}
        >
          <h2>
            {career} — {difficulty} Interview
          </h2>

          <p
            style={{
              color: "#9ca3af",
              marginTop: "10px",
            }}
          >
            Answer each question as if you were in a real
            interview.
          </p>

          {questions.map((question, index) => {
            const evaluation =
              evaluations[index];

            return (
              <div
                key={index}
                style={{
                  marginTop: "25px",
                  padding: "20px",
                  borderRadius: "15px",
                  background: "#111827",
                  border: "1px solid #374151",
                }}
              >
                {/* Question */}

                <h3
                  style={{
                    color: "#8B5CF6",
                    marginBottom: "15px",
                  }}
                >
                  Q{index + 1}. {question}
                </h3>

                {/* Answer */}

                <textarea
                  value={answers[index] || ""}
                  onChange={(e) =>
                    handleAnswerChange(
                      index,
                      e.target.value
                    )
                  }
                  placeholder="Write your answer here..."
                  rows={6}
                  style={{
                    width: "100%",
                    padding: "15px",
                    borderRadius: "10px",
                    border:
                      "1px solid #4b5563",
                    background: "#1f2937",
                    color: "white",
                    resize: "vertical",
                    boxSizing: "border-box",
                    marginTop: "5px",
                  }}
                />

                {/* Evaluate */}

                <button
                  onClick={() =>
                    evaluateAnswer(
                      question,
                      index
                    )
                  }
                  disabled={evaluating[index]}
                  style={{
                    marginTop: "15px",
                    background: "#10B981",
                    color: "white",
                    border: "none",
                    padding: "11px 20px",
                    borderRadius: "10px",
                    cursor: evaluating[index]
                      ? "not-allowed"
                      : "pointer",
                    fontWeight: "600",
                  }}
                >
                  {evaluating[index]
                    ? "Evaluating..."
                    : "Evaluate Answer"}
                </button>

                {/* Evaluation */}

                {evaluation && (
                  <div
                    style={{
                      marginTop: "20px",
                      padding: "18px",
                      borderRadius: "12px",
                      background: "#1f2937",
                      border:
                        "1px solid #374151",
                    }}
                  >
                    <h3
                      style={{
                        color: "#F59E0B",
                      }}
                    >
                      📊 Evaluation
                    </h3>

                    <h2
                      style={{
                        fontSize: "32px",
                        color:
                          evaluation.score >= 8
                            ? "#22C55E"
                            : evaluation.score >= 6
                            ? "#F59E0B"
                            : "#EF4444",
                        marginTop: "10px",
                      }}
                    >
                      {evaluation.score}/10
                    </h2>

                    <p
                      style={{
                        color: "#d1d5db",
                        lineHeight: "1.7",
                        marginTop: "10px",
                      }}
                    >
                      {evaluation.feedback}
                    </p>

                    {/* Strengths */}

                    {evaluation.strengths &&
                      evaluation.strengths.length >
                        0 && (
                        <div
                          style={{
                            marginTop: "15px",
                          }}
                        >
                          <h4
                            style={{
                              color: "#22C55E",
                            }}
                          >
                            ✅ Strengths
                          </h4>

                          <ul
                            style={{
                              color: "#d1d5db",
                              lineHeight: "1.7",
                            }}
                          >
                            {evaluation.strengths.map(
                              (strength, i) => (
                                <li key={i}>
                                  {strength}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                    {/* Improvements */}

                    {evaluation.improvements &&
                      evaluation.improvements.length >
                        0 && (
                        <div
                          style={{
                            marginTop: "15px",
                          }}
                        >
                          <h4
                            style={{
                              color: "#F59E0B",
                            }}
                          >
                            💡 Improvements
                          </h4>

                          <ul
                            style={{
                              color: "#d1d5db",
                              lineHeight: "1.7",
                            }}
                          >
                            {evaluation.improvements.map(
                              (improvement, i) => (
                                <li key={i}>
                                  {improvement}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default InterviewPrep;