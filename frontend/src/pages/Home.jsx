import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CareerContext } from "../context/CareerContext";

function Home() {
  const navigate = useNavigate();
  const {
  career,
  completedSteps,
  resumeAnalyzed,
  resumeScore,
  careerMatch,
  careerRecommendationCompleted,
  roadmapCompleted,
  studyPlanCompleted,
  interviewCompleted,
  interviewScore,
} = useContext(CareerContext);

  const roadmaps = {
  "AI Engineer": 15,
  "Data Scientist": 12,
  "Full Stack Developer": 12,
  "Cybersecurity Analyst": 10,
  "Cloud Engineer": 10,
  "Android Developer": 10,
};
  const totalSteps = roadmaps[career] || 1;

  const completed = completedSteps[career] || [];

  // -----------------------------
  // Roadmap progress
  // -----------------------------

  const roadmapProgress = Math.round(
    (completed.length / totalSteps) * 100
  );

  // -----------------------------
  // Overall CareerCompass progress
  // -----------------------------

  const features = [
    careerRecommendationCompleted,
    resumeAnalyzed,
    !!careerMatch,
    roadmapCompleted,
    studyPlanCompleted,
    interviewCompleted,
  ];

  const completedFeatures = features.filter(
    Boolean
  ).length;

  const overallProgress = Math.round(
    (completedFeatures / features.length) * 100
  );

  return (
    <>
      <h1>Welcome Back 👋</h1>

      <p
        style={{
          color: "#bdbdbd",
          marginTop: "10px",
          marginBottom: "30px",
          fontSize: "18px",
        }}
      >
        Continue building your AI career with CareerCompass.
      </p>

      {/* Dashboard cards */}

      <div className="dashboard-grid">

        <div className="dashboard-card">
          <h3>Overall Progress</h3>

          <h1>{overallProgress}%</h1>
        </div>

        <div className="dashboard-card">
  <h3>Current Career</h3>

  <h2
    style={{
      color: "#8B5CF6",
      marginTop: "10px",
    }}
  >
    {career || "Not Selected"}
  </h2>

  <p
    style={{
      color: "#9ca3af",
      marginTop: "8px",
      marginBottom: 0,
      fontSize: "13px",
    }}
  >
    Your active CareerCompass path
  </p>
</div>

        <div className="dashboard-card">
  <h3>Resume Score</h3>

  <h1>{resumeScore || 0}%</h1>

  <p
    style={{
      color: "#9ca3af",
      marginTop: "8px",
      marginBottom: 0,
      fontSize: "13px",
    }}
  >
    AI resume analysis score
  </p>
</div>

        <div className="dashboard-card">
  <h3>Interview Readiness</h3>

  <h1>
    {interviewScore
      ? `${Math.round(interviewScore * 10)}%`
      : "0%"}
  </h1>

  <p
    style={{
      color: "#9ca3af",
      marginTop: "8px",
      marginBottom: 0,
      fontSize: "13px",
    }}
  >
    Based on your interview performance
  </p>
</div>
      </div>

     {/* CareerCompass Status */}

<div
  className="career-card"
  style={{
    marginTop: "35px",
  }}
>
  <h2>🧭 CareerCompass Status</h2>

  <p
    style={{
      color: "#bdbdbd",
      marginTop: "10px",
      marginBottom: "20px",
    }}
  >
    {completedFeatures} of {features.length} CareerCompass features completed.
  </p>

  <div
    style={{
      width: "100%",
      height: "10px",
      background: "#2b2b2b",
      borderRadius: "20px",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        width: `${overallProgress}%`,
        height: "100%",
        background: "#8B5CF6",
        transition: "width 0.4s ease",
      }}
    />
  </div>

  <p
    style={{
      marginTop: "10px",
      color: "#8B5CF6",
      fontWeight: "600",
    }}
  >
    {overallProgress}% complete
  </p>
</div>

  

      {/* Roadmap Progress */}

      <div
        className="career-card"
        style={{
          marginTop: "25px",
        }}
      >
        <h2>🗺️ Roadmap Progress</h2>

        <h1
          style={{
            color: "#8B5CF6",
            marginTop: "15px",
          }}
        >
          {roadmapProgress}%
        </h1>

        <div
          style={{
            width: "100%",
            height: "14px",
            background: "#2b2b2b",
            borderRadius: "20px",
            overflow: "hidden",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              width: `${roadmapProgress}%`,
              height: "100%",
              background: "#8B5CF6",
              transition: "0.4s",
            }}
          />
        </div>

        <p
          style={{
            marginTop: "15px",
            color: "#bdbdbd",
          }}
        >
          Completed {completed.length} of{" "}
          {totalSteps} roadmap topics.
        </p>

        <button
  style={{ marginTop: "20px" }}
  onClick={() => navigate("/roadmaps")}
>
  Continue Learning →
</button>
      </div>
    </>
  );
}

export default Home;