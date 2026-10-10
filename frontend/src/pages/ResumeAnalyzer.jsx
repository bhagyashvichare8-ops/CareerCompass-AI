import { useState, useContext } from "react";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";
import { CareerContext } from "../context/CareerContext";

function ResumeAnalyzer() {
  const { setResumeSkills, setCareerMatch, setResumeAnalyzed, setResumeScore } = useContext(CareerContext);
  const [file, setFile] = useState(null);
  const [analyzed, setAnalyzed] = useState(false);
  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(false);

  const [score, setScore] = useState(0);
  const [atsScore, setAtsScore] = useState(0);

  const [strengths, setStrengths] = useState([]);
  const [weaknesses, setWeaknesses] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const [summary, setSummary] = useState("");
  const [recommendedRoles, setRecommendedRoles] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState("");
  const [atsKeywordsMissing, setAtsKeywordsMissing] = useState([]);
  const [interviewQuestions, setInterviewQuestions] = useState([]);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setAnalyzed(false);
    }
  };

  const analyzeResume = async () => {
    if (!file) {
      alert("Please select a resume first.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // STEP 1: Upload resume
      const uploadResponse = await fetch(
        "http://127.0.0.1:8000/resume/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!uploadResponse.ok) {
        throw new Error("Resume upload failed.");
      }

      const data = await uploadResponse.json();

      if (!data.text) {
        throw new Error("No resume text was extracted.");
      }

      setResumeText(data.text);

      // STEP 2: Analyze resume
      const analysisResponse = await fetch(
        "http://127.0.0.1:8000/resume/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: data.text,
          }),
        }
      );

      if (!analysisResponse.ok) {
        throw new Error("Resume analysis failed.");
      }

      const analysis = await analysisResponse.json();

      console.log("Resume Analysis:", analysis);

      // STEP 3: Save results
      setScore(analysis.resume_score || 0);
      setResumeScore(analysis.resume_score || 0);
      setAtsScore(analysis.ats_score || 0);

      setStrengths(
        Array.isArray(analysis.skills_found)
          ? analysis.skills_found
          : []
      );

      setResumeSkills(
        Array.isArray(analysis.skills_found)
          ? analysis.skills_found
          : []
      );

      setCareerMatch(null);

      setWeaknesses(
        Array.isArray(analysis.missing_skills)
          ? analysis.missing_skills
          : []
      );

      setSummary(analysis.summary || "");

      setRecommendedRoles(
        Array.isArray(analysis.recommended_roles)
          ? analysis.recommended_roles
          : []
      );

      setExperienceLevel(
        analysis.experience_level || "Unknown"
      );

      setAtsKeywordsMissing(
        Array.isArray(analysis.ats_keywords_missing)
          ? analysis.ats_keywords_missing
          : []
      );

      setInterviewQuestions(
        Array.isArray(analysis.interview_questions)
          ? analysis.interview_questions
          : []
      );

      setSuggestions(
        Array.isArray(analysis.suggestions)
          ? analysis.suggestions
          : []
      );

      setResumeAnalyzed(true);

      setAnalyzed(true);
      setResumeAnalyzed(true);
    } catch (error) {
      console.error("Resume Analyzer Error:", error);
      alert("Failed to analyze resume. Check the backend terminal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>📄 Resume Analyzer</h1>

      <p
        style={{
          color: "#bdbdbd",
          marginTop: "10px",
          marginBottom: "30px",
        }}
      >
        Upload your resume and receive an AI-powered analysis.
      </p>

      {/* Upload Resume */}

      <div className="career-card">
        <h2>Upload Resume</h2>

        <div
          style={{
            border: "2px dashed #8B5CF6",
            borderRadius: "15px",
            padding: "40px",
            textAlign: "center",
            marginTop: "25px",
            background: "rgba(139,92,246,0.05)",
          }}
        >
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />

          {file && (
            <>
              <p
                style={{
                  marginTop: "20px",
                  color: "#8B5CF6",
                  fontWeight: "600",
                }}
              >
                {file.name}
              </p>

              <button
                style={{
                  marginTop: "20px",
                  padding: "12px 24px",
                  borderRadius: "10px",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={analyzeResume}
                disabled={loading}
              >
                {loading ? "Analyzing..." : "Analyze Resume"}
              </button>
            </>
          )}
        </div>
      </div>

      {/* ANALYSIS */}

      {analyzed && (
        <div
          className="career-card"
          style={{
            marginTop: "30px",
          }}
        >
          <h2>🤖 AI Resume Analysis</h2>

          {/* Extracted Resume */}

          <h3 style={{ marginTop: "25px" }}>
            📄 Extracted Resume Text
          </h3>

          <div
            style={{
              background: "#111",
              padding: "15px",
              borderRadius: "10px",
              marginTop: "15px",
              maxHeight: "250px",
              overflowY: "auto",
              whiteSpace: "pre-wrap",
              color: "#d1d5db",
              textAlign: "left",
            }}
          >
            {resumeText}
          </div>

          {/* SCORE CARDS */}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              flexWrap: "wrap",
              marginTop: "30px",
            }}
          >
            {/* Resume Score */}

            <div
              style={{
                width: "180px",
                background: "#1f2937",
                padding: "25px",
                borderRadius: "20px",
                textAlign: "center",
                boxShadow:
                  "0 0 20px rgba(139,92,246,0.25)",
              }}
            >
              <h3
                style={{
                  color: "#8B5CF6",
                  marginBottom: "20px",
                }}
              >
                Resume Score
              </h3>

              <CircularProgressbar
                value={score}
                text={`${score}`}
                styles={buildStyles({
                  textColor: "#ffffff",
                  pathColor:
                    score >= 80
                      ? "#22c55e"
                      : score >= 60
                      ? "#f59e0b"
                      : "#ef4444",
                  trailColor: "#374151",
                })}
              />

              <p
                style={{
                  color: "#9ca3af",
                  marginTop: "15px",
                }}
              >
                /100
              </p>
            </div>

            {/* ATS Score */}

            <div
              style={{
                width: "180px",
                background: "#1f2937",
                padding: "25px",
                borderRadius: "20px",
                textAlign: "center",
                boxShadow:
                  "0 0 20px rgba(16,185,129,0.25)",
              }}
            >
              <h3
                style={{
                  color: "#10B981",
                  marginBottom: "20px",
                }}
              >
                ATS Score
              </h3>

              <CircularProgressbar
                value={atsScore}
                text={`${atsScore}`}
                styles={buildStyles({
                  textColor: "#ffffff",
                  pathColor:
                    atsScore >= 80
                      ? "#22c55e"
                      : atsScore >= 60
                      ? "#f59e0b"
                      : "#ef4444",
                  trailColor: "#374151",
                })}
              />

              <p
                style={{
                  color: "#9ca3af",
                  marginTop: "15px",
                }}
              >
                /100
              </p>
            </div>
          </div>

          {/* SUMMARY */}

          <div
            style={{
              background: "#1f2937",
              borderRadius: "18px",
              padding: "25px",
              marginTop: "30px",
              border: "1px solid #374151",
            }}
          >
            <h2 style={{ color: "#8B5CF6" }}>
              📄 Resume Summary
            </h2>

            <p
              style={{
                color: "#d1d5db",
                lineHeight: "1.8",
                marginTop: "15px",
              }}
            >
              {summary}
            </p>
          </div>

          {/* EXPERIENCE LEVEL */}

          <div
            style={{
              background: "#111827",
              borderRadius: "18px",
              padding: "20px",
              marginTop: "25px",
            }}
          >
            <h2 style={{ color: "#06B6D4" }}>
              👨‍💻 Experience Level
            </h2>

            <h3 style={{ color: "white" }}>
              {experienceLevel}
            </h3>
          </div>

          {/* SKILLS FOUND */}

          <div
            style={{
              background: "#1f2937",
              borderRadius: "18px",
              padding: "25px",
              marginTop: "25px",
            }}
          >
            <h2 style={{ color: "#22C55E" }}>
              🛠️ Skills Found
            </h2>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                marginTop: "20px",
              }}
            >
              {strengths.map((skill, index) => (
                <span
                  key={index}
                  style={{
                    background: "#16a34a",
                    padding: "10px 18px",
                    borderRadius: "30px",
                    color: "white",
                    fontWeight: "600",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* MISSING SKILLS */}

          <div
  style={{
    background: "#1f2937",
    borderRadius: "18px",
    padding: "25px",
    marginTop: "25px",
  }}
>
  <h2 style={{ color: "#EF4444" }}>❌ Missing Skills</h2>

  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      marginTop: "20px",
    }}
  >
    {Array.isArray(weaknesses) && weaknesses.length > 0 ? (
      weaknesses.map((skill, index) => (
        <span
          key={index}
          style={{
            background: "#dc2626",
            padding: "10px 18px",
            borderRadius: "30px",
            color: "white",
            fontWeight: "600",
          }}
        >
          {skill}
        </span>
      ))
    ) : (
      <p style={{ color: "#9ca3af" }}>
        No missing skills detected.
      </p>
    )}
  </div>
</div>

          {/* RECOMMENDED ROLES */}

          <div
            style={{
              background: "#1f2937",
              borderRadius: "18px",
              padding: "25px",
              marginTop: "25px",
            }}
          >
            <h2 style={{ color: "#8B5CF6" }}>
              💼 Recommended Roles
            </h2>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                marginTop: "20px",
              }}
            >
              {recommendedRoles.map((role, index) => (
                <span
                  key={index}
                  style={{
                    background: "#8B5CF6",
                    padding: "10px 18px",
                    borderRadius: "30px",
                    color: "white",
                    fontWeight: "600",
                  }}
                >
                  {role}
                </span>
              ))}
            </div>
          </div>

          {/* ATS KEYWORDS */}

          <div
            style={{
              background: "#1f2937",
              borderRadius: "18px",
              padding: "25px",
              marginTop: "25px",
            }}
          >
            <h2 style={{ color: "#F97316" }}>
              ⚠️ ATS Keywords Missing
            </h2>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                marginTop: "20px",
              }}
            >
              {atsKeywordsMissing.map((keyword, index) => (
                <span
                  key={index}
                  style={{
                    background: "#ea580c",
                    padding: "10px 18px",
                    borderRadius: "30px",
                    color: "white",
                    fontWeight: "600",
                  }}
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* INTERVIEW QUESTIONS */}

          <div
            style={{
              background: "#1f2937",
              borderRadius: "18px",
              padding: "25px",
              marginTop: "25px",
            }}
          >
            <h2 style={{ color: "#38BDF8" }}>
              🎤 Interview Questions
            </h2>

            {interviewQuestions.map((question, index) => (
              <div
                key={index}
                style={{
                  background: "#111827",
                  padding: "15px",
                  borderRadius: "12px",
                  marginTop: "15px",
                  color: "#d1d5db",
                }}
              >
                <strong>
                  Q{index + 1}.
                </strong>{" "}
                {question}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default ResumeAnalyzer;