import { createContext, useEffect, useState } from "react";

export const CareerContext = createContext();

export function CareerProvider({ children }) {
  // -----------------------------
  // Selected career
  // -----------------------------

  const [career, setCareer] = useState(() => {
    return localStorage.getItem("selectedCareer") || "AI Engineer";
  });

  // -----------------------------
  // Roadmap progress
  // -----------------------------

  const [completedSteps, setCompletedSteps] = useState(() => {
  const savedCareer =
    localStorage.getItem("selectedCareer") || "AI Engineer";

  const savedProgress = localStorage.getItem(
    `roadmapProgress_${savedCareer}`
  );

  if (!savedProgress) {
    return {};
  }

  try {
    const parsed = JSON.parse(savedProgress);

    // Old format: array
    if (Array.isArray(parsed)) {
      return {
        [savedCareer]: parsed,
      };
    }

    // New format: object
    if (
      parsed &&
      typeof parsed === "object"
    ) {
      return parsed;
    }

    return {};
  } catch {
    return {};
  }
});

  // -----------------------------
  // Study Plan
  // -----------------------------

  const [studyPlanCompleted, setStudyPlanCompleted] =
    useState(() => {
      return (
        localStorage.getItem("studyPlanCompleted") === "true"
      );
    });

  // -----------------------------
  // Resume
  // -----------------------------

  const [resumeSkills, setResumeSkills] = useState([]);

  const [resumeAnalyzed, setResumeAnalyzed] =
    useState(() => {
      return (
        localStorage.getItem("resumeAnalyzed") === "true"
      );
    });
    const [resumeScore, setResumeScore] =
  useState(() => {
    return Number(
      localStorage.getItem("resumeScore") || 0
    );
  });

  // -----------------------------
  // Career Match
  // -----------------------------

  const [careerMatch, setCareerMatch] = useState(() => {
    const saved = localStorage.getItem("careerMatch");

    if (!saved) {
      return null;
    }

    try {
      return JSON.parse(saved);
    } catch {
      return null;
    }
  });

  // -----------------------------
  // Career Recommendation
  // -----------------------------

  const [
    careerRecommendationCompleted,
    setCareerRecommendationCompleted,
  ] = useState(() => {
    return (
      localStorage.getItem(
        "careerRecommendationCompleted"
      ) === "true"
    );
  });

  const [
    careerRecommendations,
    setCareerRecommendations,
  ] = useState([]);

  // -----------------------------
  // Roadmap completion
  // -----------------------------

  const [roadmapCompleted, setRoadmapCompleted] =
  useState(() => {
    return (
      localStorage.getItem("roadmapCompleted") === "true"
    );
  });


  // -----------------------------
  // Interview
  // -----------------------------

  const [interviewCompleted, setInterviewCompleted] =
    useState(() => {
      return (
        localStorage.getItem("interviewCompleted") === "true"
      );
    });

  const [interviewScore, setInterviewScore] =
    useState(() => {
      return Number(
        localStorage.getItem("interviewScore") || 0
      );
    });

  // -----------------------------
  // Save selected career
  // -----------------------------

  useEffect(() => {
    localStorage.setItem("selectedCareer", career);
  }, [career]);

  // -----------------------------
  // Load roadmap progress
  // when career changes
  // -----------------------------

  useEffect(() => {
  const savedProgress = localStorage.getItem(
    `roadmapProgress_${career}`
  );

  if (!savedProgress) {
    setCompletedSteps((previousSteps) => ({
      ...previousSteps,
      [career]: [],
    }));
    return;
  }

  try {
    const parsed = JSON.parse(savedProgress);

    if (Array.isArray(parsed)) {
      setCompletedSteps((previousSteps) => ({
        ...previousSteps,
        [career]: parsed,
      }));
    } else if (
      parsed &&
      typeof parsed === "object"
    ) {
      setCompletedSteps((previousSteps) => ({
        ...previousSteps,
        [career]:
          parsed[career] || [],
      }));
    } else {
      setCompletedSteps((previousSteps) => ({
        ...previousSteps,
        [career]: [],
      }));
    }
  } catch {
    setCompletedSteps((previousSteps) => ({
      ...previousSteps,
      [career]: [],
    }));
  }
}, [career]);
  // -----------------------------
  // Save roadmap progress
  // -----------------------------

  useEffect(() => {
  const careerProgress =
    completedSteps[career] || [];

  localStorage.setItem(
    `roadmapProgress_${career}`,
    JSON.stringify(careerProgress)
  );
}, [career, completedSteps])

  // -----------------------------
  // Save feature completion
  // -----------------------------

  useEffect(() => {
    localStorage.setItem(
      "studyPlanCompleted",
      studyPlanCompleted
    );
  }, [studyPlanCompleted]);

  useEffect(() => {
    localStorage.setItem(
      "resumeAnalyzed",
      resumeAnalyzed
    );
  }, [resumeAnalyzed]);

  useEffect(() => {
  localStorage.setItem(
    "resumeScore",
    resumeScore
  );
}, [resumeScore])

  useEffect(() => {
  localStorage.setItem(
    "roadmapCompleted",
    roadmapCompleted
  );
}, [roadmapCompleted]);

  useEffect(() => {
    localStorage.setItem(
      "careerRecommendationCompleted",
      careerRecommendationCompleted
    );
  }, [careerRecommendationCompleted]);

  useEffect(() => {
    localStorage.setItem(
      "interviewCompleted",
      interviewCompleted
    );
  }, [interviewCompleted]);

  useEffect(() => {
    if (careerMatch) {
      localStorage.setItem(
        "careerMatch",
        JSON.stringify(careerMatch)
      );
    } else {
      localStorage.removeItem("careerMatch");
    }
  }, [careerMatch]);

  useEffect(() => {
    localStorage.setItem(
      "interviewScore",
      interviewScore
    );
  }, [interviewScore]);

  // -----------------------------
  // Provider
  // -----------------------------

  return (
    <CareerContext.Provider
      value={{
        // Career
        career,
        setCareer,

        // Roadmap
        completedSteps,
        setCompletedSteps,

        roadmapCompleted,
        setRoadmapCompleted,

        // Study Plan
        studyPlanCompleted,
        setStudyPlanCompleted,

        // Resume
        resumeSkills,
        setResumeSkills,

        resumeAnalyzed,
        setResumeAnalyzed,

        resumeScore,
        setResumeScore,

        // Career Match
        careerMatch,
        setCareerMatch,

        // Career Recommendation
        careerRecommendationCompleted,
        setCareerRecommendationCompleted,

        careerRecommendations,
        setCareerRecommendations,

        // Interview
        interviewCompleted,
        setInterviewCompleted,

        interviewScore,
        setInterviewScore,
      }}
    >
      {children}
    </CareerContext.Provider>
  );
}