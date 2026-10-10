import { useContext, useEffect, useState } from "react";
import { CareerContext} from "../context/CareerContext";

function Dashboard() {
  const {
  career,
  completedSteps,
  resumeAnalyzed,
  careerMatch,
  careerRecommendationCompleted,
  roadmapCompleted,
  studyPlanCompleted,
  interviewCompleted,
  interviewScore,
} = useContext(CareerContext);
  const [dashboard, setDashboard] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [studyPlanProgress, setStudyPlanProgress] = useState({
  completed: 0,
  total: 0,
  percentage: 0,
});
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/dashboard"
        );

        if (!response.ok) {
          throw new Error("Failed to load dashboard.");
        }

        const data = await response.json();

        setDashboard(data);
      } catch (err) {
        console.error("Dashboard Error:", err);

        setError(
          "Failed to load dashboard. Make sure the backend is running."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);
 const calculateStudyPlanProgress = () => {
  const missingSkills =
    careerMatch &&
    careerMatch.career === career &&
    Array.isArray(careerMatch.missing_skills)
      ? careerMatch.missing_skills
      : [];

  const totalTasks = missingSkills.length;

  const storageKey = `study_plan_${career}`;
  const savedProgress = localStorage.getItem(storageKey);

  let completedTasks = [];

  if (savedProgress) {
    try {
      const parsed = JSON.parse(savedProgress);

      if (Array.isArray(parsed)) {
        completedTasks = parsed;
      }
    } catch {
      completedTasks = [];
    }
  }

  const validTaskIds = missingSkills.map(
    (skill) => `${career}-${skill}`
  );

  const completedCount = completedTasks.filter(
    (taskId) => validTaskIds.includes(taskId)
  ).length;

  const percentage =
    totalTasks > 0
      ? Math.round(
          (completedCount / totalTasks) * 100
        )
      : 0;


  return {
    completed: completedCount,
    total: totalTasks,
    percentage,
  };
};
useEffect(() => {
  setStudyPlanProgress(
    calculateStudyPlanProgress()
  );
}, [career, careerMatch]);

  if (loading) {
    return (
      <>
        <h1>📊 Dashboard</h1>

        <div
          className="career-card"
          style={{
            marginTop: "30px",
          }}
        >
          <p style={{ color: "#bdbdbd" }}>
            Loading your CareerCompass dashboard...
          </p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <h1>📊 Dashboard</h1>

        <div
          className="career-card"
          style={{
            marginTop: "30px",
            border: "1px solid #EF4444",
          }}
        >
          <p style={{ color: "#EF4444" }}>
            ❌ {error}
          </p>
        </div>
      </>
    );
  }
  const roadmapTotals = {
  "AI Engineer": 15,
  "Data Scientist": 12,
  "Full Stack Developer": 12,
  "Cybersecurity Analyst": 10,
  "Cloud Engineer": 10,
  "Android Developer": 10,
};

const roadmapCompletedSteps =
  completedSteps?.[career]?.length || 0;

const roadmapTotalSteps =
  roadmapTotals[career] || 0;

const roadmapProgress =
  roadmapTotalSteps > 0
    ? Math.round(
        (roadmapCompletedSteps / roadmapTotalSteps) * 100
      )
    : 0;

   

const stats = {
  "Career Recommendation":
    careerRecommendationCompleted
      ? "Completed"
      : "Not Started",

  "Resume Analyzer":
    resumeAnalyzed
      ? "Completed"
      : "Not Started",

  "Career Match":
    careerMatch
      ? `${careerMatch.match_score}% Match`
      : "Not Started",

  "Roadmap":
    roadmapTotalSteps > 0
      ? `${roadmapProgress}% Complete`
      : "Not Started",

  "Study Plan":
  studyPlanProgress.total === 0
    ? "Not Started"
    : studyPlanProgress.percentage === 100
    ? "Completed"
    : `${studyPlanProgress.percentage}% Complete`,

  "Interview Prep":
    interviewCompleted
      ? `${interviewScore}/10 Score`
      : "Not Started",
};
  const completedCount =
  (careerRecommendationCompleted ? 1 : 0) +
  (resumeAnalyzed ? 1 : 0) +
  (careerMatch ? 1 : 0) +
  (roadmapCompleted ? 1 : 0) +
  (studyPlanCompleted ? 1 : 0) +
  (interviewCompleted ? 1 : 0);
  const totalCount = Object.keys(stats).length;

  const completionPercentage =
    totalCount === 0
      ? 0
      : Math.round(
          (completedCount / totalCount) * 100
        );

  return (
    <>
      <h1>📊 CareerCompass Dashboard</h1>

      <p
        style={{
          color: "#bdbdbd",
          marginTop: "10px",
          marginBottom: "30px",
        }}
      >
        Track your CareerCompass journey and progress.
      </p>

      {/* Welcome */}

      <div
        className="career-card"
        style={{
          background:
            "linear-gradient(135deg, #111827, #1e1b4b)",
          border: "1px solid #4c1d95",
          marginBottom: "25px",
        }}
      >
        <h2 style={{ color: "#8B5CF6" }}>
          🚀 Welcome to CareerCompass AI
        </h2>

        <p
  style={{
    color: "#d1d5db",
    marginTop: "12px",
    lineHeight: "1.7",
  }}
>
  {dashboard?.message}
</p>

<p
  style={{
    color: "#a78bfa",
    marginTop: "10px",
    fontWeight: "600",
  }}
>
  🎯 Current Career: {career || "Not Selected"}
</p>
      </div>

      {/* Overall Progress */}

      <div
        className="career-card"
        style={{
          marginBottom: "25px",
        }}
      >
        <h2>📈 Overall Progress</h2>

        <h3
          style={{
            color: "#8B5CF6",
            fontSize: "32px",
            marginTop: "15px",
          }}
        >
          {completionPercentage}%
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
              width: `${completionPercentage}%`,
              height: "100%",
              background: "#8B5CF6",
              transition: "width 0.4s ease",
            }}
          />
        </div>

        <p
          style={{
            color: "#bdbdbd",
            marginTop: "10px",
          }}
        >
          {completedCount} of {totalCount} CareerCompass
          features completed
        </p>
      </div>

      {/* Feature Status */}

<div className="career-card">
  <h2>🧭 CareerCompass Progress</h2>

  <p
    style={{
      color: "#9ca3af",
      marginTop: "8px",
      marginBottom: "25px",
    }}
  >
    Track your progress across every CareerCompass feature.
  </p>

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit, minmax(240px, 1fr))",
      gap: "18px",
    }}
  >
    {Object.entries(stats).map(([feature, status]) => {
      const isRoadmap = feature === "Roadmap";
      const isStudyPlan = feature === "Study Plan";

      const isCareerMatch = feature === "Career Match";
const isInterview = feature === "Interview Prep";

const isCompleted = isRoadmap
  ? roadmapCompleted
  : isStudyPlan
  ? studyPlanProgress.percentage === 100 &&
    studyPlanProgress.total > 0
  : isCareerMatch
  ? careerMatch?.match_score === 100
  : isInterview
  ? interviewCompleted
  : status === "Completed";

const isInProgress = isRoadmap
  ? roadmapProgress > 0 && !roadmapCompleted
  : isStudyPlan
  ? studyPlanProgress.percentage > 0 &&
    studyPlanProgress.percentage < 100
  : isCareerMatch
  ? !!careerMatch && careerMatch.match_score < 100
  : isInterview
  ? interviewCompleted === false && interviewScore > 0
  : false;

      const cardStatus = isCompleted
        ? "Completed"
        : isInProgress
        ? "In Progress"
        : "Not Started";

      const statusColor = isCompleted
        ? "#22C55E"
        : isInProgress
        ? "#8B5CF6"
        : "#F59E0B";

      const backgroundColor = isCompleted
        ? "rgba(34,197,94,0.10)"
        : isInProgress
        ? "rgba(139,92,246,0.10)"
        : "rgba(245,158,11,0.06)";

      const borderColor = isCompleted
        ? "rgba(34,197,94,0.45)"
        : isInProgress
        ? "rgba(139,92,246,0.45)"
        : "rgba(245,158,11,0.30)";

      const icon = isCompleted
        ? "✅"
        : isInProgress
        ? "🔄"
        : "⏳";

      return (
        <div
  key={feature}
  style={{
    padding: "22px",
    borderRadius: "16px",
    background: backgroundColor,
    border: `1px solid ${borderColor}`,
    transition: "all 0.25s ease",
    minHeight: "135px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  }}
>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "10px",
              marginBottom: "15px",
            }}
          >
            <h3
              style={{
                color: "white",
                margin: 0,
                fontSize: "17px",
              }}
            >
              {icon} {feature}
            </h3>

            <span
              style={{
                color: statusColor,
                fontSize: "12px",
                fontWeight: "700",
                padding: "5px 9px",
                borderRadius: "20px",
                background: `${statusColor}18`,
                border: `1px solid ${statusColor}55`,
                whiteSpace: "nowrap",
              }}
            >
              {cardStatus}
            </span>
          </div>

          <p
            style={{
              color: "#d1d5db",
              margin: 0,
              fontSize: "14px",
              lineHeight: "1.5",
            }}
          >
            {status}
          </p>
        </div>
      );
    })}
  </div>
</div>
    </>
  );
}

export default Dashboard;