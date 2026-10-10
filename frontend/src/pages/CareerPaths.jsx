import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CareerContext } from "../context/CareerContext";

import {
  Brain,
  Database,
  Code2,
  ShieldCheck,
  Cloud,
  Smartphone,
  Terminal,
} from "lucide-react";

const careers = [
  {
    title: "AI Engineer",
    icon: <Brain size={42} className="career-icon" />,
    description:
      "Design intelligent AI systems, Machine Learning models and Generative AI applications.",
    salary: "₹12 - ₹45 LPA",
    skills: "Python • Machine Learning • Deep Learning",
  },
  {
    title: "Data Scientist",
    icon: <Database size={42} className="career-icon" />,
    description:
      "Extract insights from data using statistics, visualization and AI.",
    salary: "₹10 - ₹35 LPA",
    skills: "Python • SQL • Statistics",
  },
  {
    title: "Full Stack Developer",
    icon: <Code2 size={42} className="career-icon" />,
    description:
      "Develop modern web applications from frontend to backend.",
    salary: "₹8 - ₹30 LPA",
    skills: "React • Node.js • MongoDB",
  },
  {
    title: "Cybersecurity Analyst",
    icon: <ShieldCheck size={42} className="career-icon" />,
    description:
      "Protect organizations against cyber attacks and security threats.",
    salary: "₹8 - ₹28 LPA",
    skills: "Networking • Linux • Security",
  },
  {
    title: "Cloud Engineer",
    icon: <Cloud size={42} className="career-icon" />,
    description:
      "Deploy scalable cloud infrastructure using AWS, Azure or GCP.",
    salary: "₹10 - ₹35 LPA",
    skills: "AWS • Docker • Kubernetes",
  },
  {
    title: "Android Developer",
    icon: <Smartphone size={42} className="career-icon" />,
    description:
      "Create Android applications using Kotlin and modern Android technologies.",
    salary: "₹7 - ₹25 LPA",
    skills: "Kotlin • Android Studio • Firebase",
  },
  {
    title: "Python Developer",
    icon: <Terminal size={42} className="career-icon" />,
    description:
      "Build backend applications, APIs and automation systems using Python.",
    salary: "₹6 - ₹25 LPA",
    skills: "Python • FastAPI • SQL",
  },
];

function CareerPaths() {
  const navigate = useNavigate();

  const {
    setCareer,
    resumeSkills,
    setCareerMatch: saveCareerMatch, setCareerRecommendationCompleted
  } = useContext(CareerContext);

  const [matchLoading, setMatchLoading] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState("");
  const [careerMatch, setCareerMatch] = useState(null);

  const [recommendations, setRecommendations] = useState([]);
  const [recommendationLoading, setRecommendationLoading] =
    useState(false);

  // --------------------------------------------------
  // Check ONE career
  // --------------------------------------------------

  const checkCareerMatch = async (career) => {
    if (!resumeSkills || resumeSkills.length === 0) {
      alert(
        "Please analyze your resume first so CareerCompass can check your skills."
      );
      return;
    }

    setMatchLoading(true);
    setSelectedCareer(career.title);
    setCareerMatch(null);

    // IMPORTANT:
    // Keep the global selected career synchronized
    // with the career being checked.
    setCareer(career.title);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/career/match",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            career: career.title,
            skills: resumeSkills,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Career match request failed");
      }

      const data = await response.json();

      console.log("Career Match:", data);

      // Save locally for this page
      setCareerMatch(data);

      // Save globally for Study Plan and other pages
      saveCareerMatch(data);
    } catch (error) {
      console.error("Career match error:", error);
      alert("Failed to check career match.");
    } finally {
      setMatchLoading(false);
    }
  };

  // --------------------------------------------------
  // Check ALL careers
  // --------------------------------------------------

  const findBestCareers = async () => {
    if (!resumeSkills || resumeSkills.length === 0) {
      alert(
        "Please analyze your resume first so CareerCompass can use your skills."
      );
      return;
    }

    setRecommendationLoading(true);
    setRecommendations([]);

    try {
      const results = await Promise.all(
        careers.map(async (career) => {
          const response = await fetch(
            "http://127.0.0.1:8000/career/match",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                career: career.title,
                skills: resumeSkills,
              }),
            }
          );

          if (!response.ok) {
            throw new Error(
              `Failed to check \`${career.title}\``
            );
          }

          return await response.json();
        })
      );

      // Sort highest match first
      const sortedResults = results.sort(
        (a, b) => b.match_score - a.match_score
      );

      console.log(
        "Personalized Career Recommendations:",
        sortedResults
      );

      setRecommendations(sortedResults);
      setCareerRecommendationCompleted(true);

      // IMPORTANT:
      // Make the best recommended career the active career.
      if (sortedResults.length > 0) {
        const bestCareer = sortedResults[0];

        setCareer(bestCareer.career);
        saveCareerMatch(bestCareer);
      }
    } catch (error) {
      console.error(
        "Career recommendation error:",
        error
      );

      alert(
        "Failed to generate career recommendations."
      );
    } finally {
      setRecommendationLoading(false);
    }
  };

  // --------------------------------------------------
  // Open roadmap
  // --------------------------------------------------

  const openRoadmap = (careerTitle) => {
    setCareer(careerTitle);
    navigate("/roadmaps");
  };

  return (
    <>
      <h1>Career Paths</h1>

      <p
        style={{
          color: "#bdbdbd",
          marginTop: "10px",
          marginBottom: "30px",
        }}
      >
        Explore today's most in-demand technology careers.
      </p>

      {/* -------------------------------------------- */}
      {/* PERSONALIZED CAREER RECOMMENDATION */}
      {/* -------------------------------------------- */}

      <div
        className="career-card"
        style={{
          marginBottom: "30px",
          background:
            "linear-gradient(135deg, #111827, #1e1b4b)",
          border: "1px solid #4c1d95",
        }}
      >
        <h2
          style={{
            color: "#8B5CF6",
            marginBottom: "10px",
          }}
        >
          🤖 Find Your Best Career
        </h2>

        <p
          style={{
            color: "#d1d5db",
            lineHeight: "1.7",
          }}
        >
          CareerCompass will compare the skills extracted
          from your resume with every career and recommend
          the strongest matches for you.
        </p>

        {resumeSkills && resumeSkills.length > 0 && (
          <p
            style={{
              color: "#22C55E",
              marginTop: "15px",
              fontWeight: "600",
            }}
          >
            ✓ Resume skills loaded:{" "}
            {resumeSkills.join(", ")}
          </p>
        )}

        {(!resumeSkills ||
          resumeSkills.length === 0) && (
          <p
            style={{
              color: "#F59E0B",
              marginTop: "15px",
            }}
          >
            ⚠️ Analyze your resume first to enable
            personalized recommendations.
          </p>
        )}

        <button
          onClick={findBestCareers}
          disabled={recommendationLoading}
          style={{
            marginTop: "20px",
            background: "#8B5CF6",
            padding: "12px 24px",
            borderRadius: "10px",
            border: "none",
            color: "white",
            cursor: recommendationLoading
              ? "not-allowed"
              : "pointer",
            fontWeight: "600",
          }}
        >
          {recommendationLoading
            ? "Analyzing Careers..."
            : "✨ Find My Best Careers"}
        </button>

        {/* ---------------------------------------- */}
        {/* RECOMMENDATION RESULTS */}
        {/* ---------------------------------------- */}

        {recommendations.length > 0 && (
          <div style={{ marginTop: "30px" }}>
            <h3
              style={{
                color: "#ffffff",
                marginBottom: "20px",
              }}
            >
              🎯 Your Career Matches
            </h3>

            {recommendations.map((result, index) => {
              const percentage = result.match_score;

              return (
                <div
                  key={result.career}
                  style={{
                    background: "#111827",
                    border:
                      index === 0
                        ? "1px solid #8B5CF6"
                        : "1px solid #374151",
                    borderRadius: "15px",
                    padding: "18px",
                    marginTop: "12px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "15px",
                      flexWrap: "wrap",
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          color:
                            index === 0
                              ? "#8B5CF6"
                              : "white",
                          margin: 0,
                        }}
                      >
                        {index === 0
                          ? "🥇 "
                          : index === 1
                          ? "🥈 "
                          : index === 2
                          ? "🥉 "
                          : `${index + 1}. `}
                        {result.career}
                      </h3>

                      <p
                        style={{
                          color: "#9ca3af",
                          marginTop: "7px",
                        }}
                      >
                        {result.matched_skills?.length ||
                          0}{" "}
                        skills matched
                      </p>
                    </div>

                    <strong
                      style={{
                        fontSize: "24px",
                        color:
                          percentage >= 80
                            ? "#22C55E"
                            : percentage >= 60
                            ? "#F59E0B"
                            : "#EF4444",
                      }}
                    >
                      {percentage}%
                    </strong>
                  </div>

                  {/* Progress bar */}

                  <div
                    style={{
                      height: "8px",
                      background: "#374151",
                      borderRadius: "10px",
                      marginTop: "15px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${percentage}%`,
                        height: "100%",
                        background:
                          percentage >= 80
                            ? "#22C55E"
                            : percentage >= 60
                            ? "#F59E0B"
                            : "#EF4444",
                        borderRadius: "10px",
                      }}
                    />
                  </div>

                  {/* Missing skills */}

                  {result.missing_skills &&
                    result.missing_skills.length > 0 && (
                      <p
                        style={{
                          color: "#9ca3af",
                          marginTop: "12px",
                          fontSize: "14px",
                        }}
                      >
                        Missing:{" "}
                        <span
                          style={{
                            color: "#EF4444",
                          }}
                        >
                          {result.missing_skills.join(", ")}
                        </span>
                      </p>
                    )}

                  <button
                    onClick={() =>
                      openRoadmap(result.career)
                    }
                    style={{
                      marginTop: "12px",
                    }}
                  >
                    View Roadmap
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* -------------------------------------------- */}
      {/* CAREER CARDS */}
      {/* -------------------------------------------- */}

      <div className="career-grid">
        {careers.map((career) => (
          <div
            className="career-card"
            key={career.title}
          >
            {career.icon}

            <h2>{career.title}</h2>

            <p>{career.description}</p>

            <p>
              <strong>Average Salary</strong>
              <br />
              {career.salary}
            </p>

            <p>
              <strong>Skills</strong>
              <br />
              {career.skills}
            </p>

            {/* View Roadmap */}

            <button
              onClick={() =>
                openRoadmap(career.title)
              }
            >
              View Roadmap
            </button>

            {/* Career Match */}

            <button
              style={{
                marginTop: "12px",
                background: "#10B981",
              }}
              onClick={() =>
                checkCareerMatch(career)
              }
              disabled={matchLoading}
            >
              {matchLoading &&
              selectedCareer === career.title
                ? "Checking..."
                : "Check Career Match"}
            </button>

            {/* ------------------------------------ */}
            {/* INDIVIDUAL MATCH RESULT */}
            {/* ------------------------------------ */}

            {careerMatch &&
              selectedCareer === career.title && (
                <div
                  style={{
                    marginTop: "20px",
                    padding: "18px",
                    borderRadius: "15px",
                    background: "#111827",
                    border:
                      "1px solid #374151",
                  }}
                >
                  <h3
                    style={{
                      color: "#8B5CF6",
                      marginBottom: "10px",
                    }}
                  >
                    Career Match
                  </h3>

                  <h1
                    style={{
                      color:
                        careerMatch.match_score >=
                        80
                          ? "#22C55E"
                          : careerMatch.match_score >=
                            60
                          ? "#F59E0B"
                          : "#EF4444",
                      margin: "10px 0",
                    }}
                  >
                    {careerMatch.match_score}%
                  </h1>

                  <p
                    style={{
                      color: "#d1d5db",
                      marginBottom: "15px",
                    }}
                  >
                    Skill match for{" "}
                    <strong>
                      {careerMatch.career}
                    </strong>
                  </p>

                  {/* Matched Skills */}

                  {careerMatch.matched_skills &&
                    careerMatch.matched_skills.length >
                      0 && (
                      <>
                        <p
                          style={{
                            color: "#22C55E",
                            fontWeight: "600",
                          }}
                        >
                          ✓ Matched Skills
                        </p>

                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "7px",
                            marginTop: "8px",
                          }}
                        >
                          {careerMatch.matched_skills.map(
                            (skill, index) => (
                              <span
                                key={index}
                                style={{
                                  background:
                                    "#166534",
                                  color: "white",
                                  padding:
                                    "6px 10px",
                                  borderRadius:
                                    "20px",
                                  fontSize: "13px",
                                }}
                              >
                                {skill}
                              </span>
                            )
                          )}
                        </div>
                      </>
                    )}

                  {/* Missing Skills */}

                  {careerMatch.missing_skills &&
                    careerMatch.missing_skills.length >
                      0 && (
                      <>
                        <p
                          style={{
                            color: "#EF4444",
                            fontWeight: "600",
                            marginTop: "15px",
                          }}
                        >
                          ✕ Missing Skills
                        </p>

                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "7px",
                            marginTop: "8px",
                          }}
                        >
                          {careerMatch.missing_skills.map(
                            (skill, index) => (
                              <span
                                key={index}
                                style={{
                                  background:
                                    "#7f1d1d",
                                  color: "white",
                                  padding:
                                    "6px 10px",
                                  borderRadius:
                                    "20px",
                                  fontSize: "13px",
                                }}
                              >
                                {skill}
                              </span>
                            )
                          )}
                        </div>
                      </>
                    )}
                </div>
              )}
          </div>
        ))}
      </div>
    </>
  );
}

export default CareerPaths;