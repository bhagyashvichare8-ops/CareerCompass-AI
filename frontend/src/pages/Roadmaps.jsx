import { useContext, useEffect, } from "react";
import { CareerContext } from "../context/CareerContext";

function Roadmaps() {
  const { career, careerMatch, completedSteps, setCompletedSteps, setRoadmapCompleted } = useContext(CareerContext);

  const selectedCareer = career || "AI Engineer";

  const roadmaps = {
    "AI Engineer": [
      "Learn Python",
      "Learn Data Structures & Algorithms",
      "Master NumPy",
      "Master Pandas",
      "Learn Statistics",
      "Learn Machine Learning",
      "Learn Deep Learning",
      "Learn Generative AI",
      "Learn LangChain",
      "Learn FastAPI",
      "Learn SQL",
      "Learn Git & GitHub",
      "Build 5+ Real Projects",
      "Learn Docker",
      "Prepare for Interviews",
    ],

    "Data Scientist": [
      "Learn Python",
      "Learn SQL",
      "Learn Statistics",
      "Master Pandas",
      "Master NumPy",
      "Learn Data Visualization",
      "Learn Machine Learning",
      "Learn Deep Learning",
      "Learn Power BI",
      "Learn Tableau",
      "Build Data Science Projects",
      "Prepare for Interviews",
    ],

    "Full Stack Developer": [
      "Learn HTML",
      "Learn CSS",
      "Learn JavaScript",
      "Learn React",
      "Learn Node.js",
      "Learn Express.js",
      "Learn MongoDB",
      "Learn Git & GitHub",
      "Learn REST APIs",
      "Build Full Stack Projects",
      "Deploy Projects",
      "Prepare for Interviews",
    ],

    "Cybersecurity Analyst": [
      "Learn Networking",
      "Learn Linux",
      "Learn Ethical Hacking",
      "Learn OWASP",
      "Learn Penetration Testing",
      "Learn Python",
      "Learn Security Tools",
      "Learn Incident Response",
      "Build Security Projects",
      "Prepare for Interviews",
    ],

    "Cloud Engineer": [
      "Learn Linux",
      "Learn AWS",
      "Learn Azure",
      "Learn Docker",
      "Learn Kubernetes",
      "Learn Terraform",
      "Learn CI/CD",
      "Learn Cloud Security",
      "Build Cloud Projects",
      "Prepare for Interviews",
    ],

    "Android Developer": [
      "Learn Kotlin",
      "Learn Android Studio",
      "Learn XML UI",
      "Learn Jetpack Compose",
      "Learn Firebase",
      "Learn SQLite",
      "Learn REST APIs",
      "Build Android Projects",
      "Publish Apps",
      "Prepare for Interviews",
    ],
  };

  const roadmap =
    roadmaps[selectedCareer] || roadmaps["AI Engineer"];

  /*
   * Normalize skill names so small differences don't matter.
   *
   * Examples:
   * HTML -> html
   * GitHub -> github
   * Git & GitHub -> github
   * Machine Learning -> machinelearning
   */
  const normalizeSkill = (skill) => {
    return skill
      .toLowerCase()
      .replace(/&/g, " ")
      .replace(/-/g, " ")
      .replace(/_/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  /*
   * Get missing skills from the Career Match result.
   */
  const missingSkills =
    careerMatch &&
    careerMatch.career === selectedCareer &&
    Array.isArray(careerMatch.missing_skills)
      ? careerMatch.missing_skills
      : [];

  /*
   * Check whether a roadmap topic is related
   * to one of the missing career skills.
   */
  const isPriorityTopic = (step) => {
    const normalizedStep = normalizeSkill(step);

    return missingSkills.some((skill) => {
      const normalizedSkill = normalizeSkill(skill);

      /*
       * Handle Git & GitHub specifically.
       */
      if (
        normalizedSkill === "github" &&
        normalizedStep.includes("git")
      ) {
        return true;
      }

      if (
        normalizedSkill === "git" &&
        normalizedStep.includes("git")
      ) {
        return true;
      }

      /*
       * Normal matching.
       */
      return (
        normalizedStep.includes(normalizedSkill) ||
        normalizedSkill.includes(normalizedStep)
      );
    });
  };


  /*
   * Toggle roadmap topic.
   */
 const toggleStep = (step) => {
  setCompletedSteps((previousSteps) => {
    const careerSteps =
      previousSteps[selectedCareer] || [];

    const updatedSteps = careerSteps.includes(step)
      ? careerSteps.filter((item) => item !== step)
      : [...careerSteps, step];

    return {
      ...previousSteps,
      [selectedCareer]: updatedSteps,
    };
  });
};

  /*
   * Reset progress for the current career.
   */
  const resetProgress = () => {
  setCompletedSteps((previousSteps) => ({
    ...previousSteps,
    [selectedCareer]: [],
  }));
};

const completed = completedSteps [selectedCareer] || [];

  const progress =
    roadmap.length === 0
      ? 0
      : Math.round(
          (completed.length / roadmap.length) * 100
        );

  useEffect(() => {
  setRoadmapCompleted(
    roadmap.length > 0 && progress === 100
  );
}, [progress, roadmap.length, setRoadmapCompleted]);

  return (
    <>
      <h1>🗺️ {selectedCareer} Roadmap</h1>

      <p
        style={{
          color: "#bdbdbd",
          marginTop: "10px",
          marginBottom: "30px",
        }}
      >
        Follow this roadmap step by step and build
        the skills required for your career.
      </p>

      {/* Personalized Career Analysis */}

      {careerMatch &&
        careerMatch.career === selectedCareer && (
          <div
            className="career-card"
            style={{
              marginBottom: "25px",
              border: "1px solid #8B5CF6",
            }}
          >
            <h2>🎯 Your Career Analysis</h2>

            <p
              style={{
                color: "#d1d5db",
                marginTop: "10px",
              }}
            >
              Your current career match is{" "}
              <strong
                style={{
                  color:
                    careerMatch.match_score >= 80
                      ? "#22C55E"
                      : careerMatch.match_score >= 60
                      ? "#F59E0B"
                      : "#EF4444",
                }}
              >
                {careerMatch.match_score}%
              </strong>
              .
            </p>

            {missingSkills.length > 0 ? (
              <>
                <p
                  style={{
                    color: "#F59E0B",
                    fontWeight: "600",
                    marginTop: "15px",
                  }}
                >
                  🔥 Priority Skills
                </p>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                    marginTop: "10px",
                  }}
                >
                  {missingSkills.map(
                    (skill, index) => (
                      <span
                        key={`${skill}-${index}`}
                        style={{
                          background: "#78350f",
                          color: "#fef3c7",
                          padding: "7px 12px",
                          borderRadius: "20px",
                          fontSize: "13px",
                        }}
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>

                <p
                  style={{
                    color: "#9ca3af",
                    marginTop: "15px",
                    fontSize: "14px",
                  }}
                >
                  These skills are highlighted below
                  because they are currently missing from
                  your resume.
                </p>
              </>
            ) : (
              <p
                style={{
                  color: "#22C55E",
                  marginTop: "15px",
                  fontWeight: "600",
                }}
              >
                🎉 You currently have all the required
                skills for this career!
              </p>
            )}
          </div>
        )}

      {/* Progress Section */}

      <div
        className="career-card"
        style={{
          marginBottom: "25px",
        }}
      >
        <h2>Learning Progress</h2>

        <h3
          style={{
            marginTop: "15px",
            color: "#8B5CF6",
            fontSize: "28px",
          }}
        >
          {progress}%
        </h3>

        <div
          style={{
            width: "100%",
            height: "12px",
            background: "#2b2b2b",
            borderRadius: "20px",
            overflow: "hidden",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "#8B5CF6",
              transition: "width 0.4s ease",
            }}
          />
        </div>

        <p
          style={{
            marginTop: "10px",
            color: "#bdbdbd",
          }}
        >
          Completed {completed.length} /{" "}
          {roadmap.length} Topics
        </p>

        {progress === 100 && (
          <p
            style={{
              color: "#22C55E",
              fontWeight: "600",
              marginTop: "10px",
            }}
          >
            🎉 Roadmap completed! Great work.
          </p>
        )}
      </div>

      {/* Roadmap */}

      <div className="career-card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "15px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          <h2>Complete Learning Path</h2>

          <button
            onClick={resetProgress}
            style={{
              background: "#ef4444",
              color: "white",
              border: "none",
              padding: "10px 18px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Reset Progress
          </button>
        </div>

        {/* Priority Legend */}

        {missingSkills.length > 0 && (
          <p
            style={{
              color: "#F59E0B",
              fontSize: "14px",
              marginBottom: "15px",
            }}
          >
            🔥 Priority topics are based on your
            missing career skills.
          </p>
        )}

        <ul
          style={{
            marginTop: "20px",
            lineHeight: "1.6",
            fontSize: "17px",
            listStyle: "none",
            padding: 0,
          }}
        >
          {roadmap.map((step, index) => {
            const isCompleted =
              completed.includes(step);

            const priority = isPriorityTopic(step);

            return (
              <li
                key={step}
                onClick={() => toggleStep(step)}
                style={{
                  cursor: "pointer",
                  padding: "13px 15px",
                  marginBottom: "9px",
                  borderRadius: "10px",
                  background: isCompleted
                    ? "#1f8b4c"
                    : priority
                    ? "rgba(245,158,11,0.15)"
                    : "rgba(255,255,255,0.05)",
                  border: isCompleted
                    ? "1px solid #22C55E"
                    : priority
                    ? "1px solid #F59E0B"
                    : "1px solid transparent",
                  transition:
                    "all 0.3s ease",
                  textDecoration: isCompleted
                    ? "line-through"
                    : "none",
                  opacity: isCompleted ? 0.9 : 1,
                }}
              >
                {isCompleted
                  ? "✅"
                  : priority
                  ? "🔥"
                  : "⬜"}{" "}
                {index + 1}. {step}

                {priority && !isCompleted && (
                  <span
                    style={{
                      marginLeft: "10px",
                      fontSize: "12px",
                      color: "#F59E0B",
                      fontWeight: "600",
                    }}
                  >
                    PRIORITY
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Roadmaps;