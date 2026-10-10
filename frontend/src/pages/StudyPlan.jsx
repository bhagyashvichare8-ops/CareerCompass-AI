import { useContext, useEffect, useState } from "react";
import { CareerContext } from "../context/CareerContext";

function StudyPlan() {
  const {
    career,
    careerMatch,
    setStudyPlanCompleted,
  } = useContext(CareerContext);

  const selectedCareer = career || "AI Engineer";
  const [completedTasks, setCompletedTasks] = useState([]);
  const [progressLoaded, setProgressLoaded] = useState(false);

  const missingSkills =
    careerMatch &&
    careerMatch.career === selectedCareer &&
    Array.isArray(careerMatch.missing_skills)
      ? careerMatch.missing_skills
      : [];

  const storageKey = `study_plan_${selectedCareer}`;

 useEffect(() => {
  const savedProgress = localStorage.getItem(storageKey);

  if (!savedProgress) {
    setCompletedTasks([]);
    setProgressLoaded(true);
    return;
  }

  try {
    const parsedProgress = JSON.parse(savedProgress);

    setCompletedTasks(
      Array.isArray(parsedProgress)
        ? parsedProgress
        : []
    );
  } catch (error) {
    console.error(
      "Failed to load study plan progress:",
      error
    );

    setCompletedTasks([]);
  }

  setProgressLoaded(true);
}, [storageKey]);

  useEffect(() => {
  if (!progressLoaded) return;

  localStorage.setItem(
    storageKey,
    JSON.stringify(completedTasks)
  );
}, [completedTasks, storageKey, progressLoaded]);

  const learningOrder = {
    "AI Engineer": [
      "Python",
      "Git",
      "GitHub",
      "SQL",
      "Statistics",
      "NumPy",
      "Pandas",
      "Machine Learning",
      "Deep Learning",
      "FastAPI",
      "Generative AI",
      "LangChain",
      "Docker",
    ],

    "Data Scientist": [
      "Python",
      "SQL",
      "Statistics",
      "NumPy",
      "Pandas",
      "Data Visualization",
      "Machine Learning",
      "Deep Learning",
      "Power BI",
      "Tableau",
    ],

    "Full Stack Developer": [
      "HTML",
      "CSS",
      "JavaScript",
      "Git",
      "GitHub",
      "React",
      "Node.js",
      "Express.js",
      "SQL",
      "MongoDB",
      "REST APIs",
    ],

    "Cybersecurity Analyst": [
      "Networking",
      "Linux",
      "Python",
      "SQL",
      "Cybersecurity",
      "Ethical Hacking",
      "OWASP",
      "Penetration Testing",
      "Security Tools",
      "Incident Response",
    ],

    "Cloud Engineer": [
      "Linux",
      "Python",
      "Git",
      "AWS",
      "Azure",
      "Docker",
      "Kubernetes",
      "Terraform",
      "CI/CD",
      "Cloud Security",
    ],

    "Android Developer": [
      "Kotlin",
      "Android Studio",
      "XML UI",
      "Jetpack Compose",
      "SQLite",
      "Firebase",
      "REST APIs",
    ],
  };

  const highPrioritySkills = {
    "AI Engineer": [
      "Python",
      "Statistics",
      "Machine Learning",
    ],

    "Data Scientist": [
      "Python",
      "SQL",
      "Statistics",
    ],

    "Full Stack Developer": [
      "HTML",
      "CSS",
      "JavaScript",
    ],

    "Cybersecurity Analyst": [
      "Networking",
      "Linux",
      "Cybersecurity",
    ],

    "Cloud Engineer": [
      "Linux",
      "AWS",
      "Docker",
    ],

    "Android Developer": [
      "Kotlin",
      "Android Studio",
      "REST APIs",
    ],
  };

  const mediumPrioritySkills = {
    "AI Engineer": [
      "NumPy",
      "Pandas",
      "Deep Learning",
      "FastAPI",
      "Generative AI",
    ],

    "Data Scientist": [
      "NumPy",
      "Pandas",
      "Machine Learning",
      "Data Visualization",
    ],

    "Full Stack Developer": [
      "Git",
      "GitHub",
      "React",
      "Node.js",
      "Express.js",
    ],

    "Cybersecurity Analyst": [
      "Python",
      "SQL",
      "Ethical Hacking",
      "OWASP",
    ],

    "Cloud Engineer": [
      "Python",
      "Git",
      "Azure",
      "Kubernetes",
      "Terraform",
    ],

    "Android Developer": [
      "XML UI",
      "Jetpack Compose",
      "SQLite",
      "Firebase",
    ],
  };

  const skillDescriptions = {
    Python:
      "Learn Python programming fundamentals, functions, data structures, and object-oriented programming.",

    Git:
      "Learn Git version control, commits, branches, merging, and basic Git workflows.",

    GitHub:
      "Learn GitHub repositories, pull requests, issues, collaboration, and portfolio management.",

    SQL:
      "Learn databases, SQL queries, joins, filtering, aggregation, and database design.",

    Statistics:
      "Learn probability, distributions, hypothesis testing, correlation, and statistical reasoning.",

    NumPy:
      "Learn numerical computing with NumPy arrays, indexing, vectorization, and mathematical operations.",

    Pandas:
      "Learn data manipulation with Pandas, including DataFrames, cleaning, filtering, and analysis.",

    "Machine Learning":
      "Learn supervised and unsupervised machine learning, model training, evaluation, and feature engineering.",

    "Deep Learning":
      "Learn neural networks, backpropagation, CNNs, RNNs, and modern deep learning concepts.",

    FastAPI:
      "Learn how to build REST APIs and backend services using FastAPI and Python.",

    "Generative AI":
      "Learn large language models, prompt engineering, embeddings, RAG, and generative AI applications.",

    LangChain:
      "Learn how to build LLM applications and AI workflows using LangChain.",

    Docker:
      "Learn containerization, Docker images, containers, Dockerfiles, and deployment basics.",

    HTML:
      "Learn semantic HTML, forms, accessibility, and modern webpage structure.",

    CSS:
      "Learn CSS layouts, Flexbox, Grid, responsive design, and modern styling.",

    JavaScript:
      "Learn JavaScript fundamentals, ES6+, DOM manipulation, asynchronous programming, and APIs.",

    React:
      "Learn React components, props, state, hooks, routing, and frontend application development.",

    "Node.js":
      "Learn backend development with Node.js, modules, APIs, and server-side JavaScript.",

    "Express.js":
      "Learn Express.js routing, middleware, REST APIs, and backend application development.",

    MongoDB:
      "Learn NoSQL database concepts, MongoDB collections, documents, queries, and CRUD operations.",

    "REST APIs":
      "Learn REST architecture, HTTP methods, API requests, responses, authentication, and integration.",

    Networking:
      "Learn networking fundamentals including TCP/IP, DNS, HTTP, ports, protocols, and network security.",

    Linux:
      "Learn Linux commands, file systems, permissions, processes, networking, and system administration.",

    Cybersecurity:
      "Learn cybersecurity fundamentals, threats, vulnerabilities, security principles, and defenses.",

    "Ethical Hacking":
      "Learn ethical hacking methodology, reconnaissance, vulnerability assessment, and penetration testing concepts.",

    OWASP:
      "Learn common web application vulnerabilities and secure development practices using OWASP principles.",

    "Penetration Testing":
      "Learn penetration testing methodology, vulnerability discovery, exploitation concepts, and reporting.",

    "Security Tools":
      "Learn common cybersecurity tools used for network analysis, vulnerability assessment, and monitoring.",

    "Incident Response":
      "Learn how security incidents are detected, investigated, contained, and resolved.",

    AWS:
      "Learn AWS cloud fundamentals including EC2, S3, IAM, networking, and core cloud services.",

    Azure:
      "Learn Microsoft Azure fundamentals, cloud services, virtual machines, storage, and identity.",

    Kubernetes:
      "Learn container orchestration, pods, deployments, services, scaling, and Kubernetes fundamentals.",

    Terraform:
      "Learn Infrastructure as Code using Terraform and cloud resource automation.",

    "CI/CD":
      "Learn continuous integration, continuous delivery, automated testing, and deployment pipelines.",

    "Cloud Security":
      "Learn cloud security principles, identity management, network security, and secure cloud architecture.",

    Kotlin:
      "Learn Kotlin syntax, object-oriented programming, collections, functions, and Android development fundamentals.",

    "Android Studio":
      "Learn Android Studio, project structure, debugging, layouts, and Android development workflows.",

    "XML UI":
      "Learn Android XML layouts, views, constraints, resources, and traditional Android UI development.",

    "Jetpack Compose":
      "Learn modern Android UI development using Jetpack Compose and declarative UI principles.",

    SQLite:
      "Learn local Android database storage using SQLite and basic CRUD operations.",

    Firebase:
      "Learn Firebase authentication, Firestore, storage, hosting, and backend services.",
    
    "Data Visualization":
      "Learn how to communicate data using charts, graphs, dashboards, and visualization tools.",

    "Power BI":
      "Learn Power BI dashboards, data modeling, visualizations, and business intelligence.",

    Tableau:
      "Learn Tableau data visualization, dashboards, filters, and analytical reporting.",
  };

  const orderedMissingSkills = [...missingSkills].sort(
    (a, b) => {
      const order = learningOrder[selectedCareer] || [];

      const indexA = order.findIndex(
        (skill) =>
          skill.toLowerCase() === a.toLowerCase()
      );

      const indexB = order.findIndex(
        (skill) =>
          skill.toLowerCase() === b.toLowerCase()
      );

      return (
        (indexA === -1 ? 999 : indexA) -
        (indexB === -1 ? 999 : indexB)
      );
    }
  );

  const getPriority = (skill) => {
    const high =
      highPrioritySkills[selectedCareer] || [];

    const medium =
      mediumPrioritySkills[selectedCareer] || [];

    if (
      high.some(
        (item) =>
          item.toLowerCase() === skill.toLowerCase()
      )
    ) {
      return "High Priority";
    }

    if (
      medium.some(
        (item) =>
          item.toLowerCase() === skill.toLowerCase()
      )
    ) {
      return "Medium Priority";
    }

    return "Normal";
  };

  const studyPlan = orderedMissingSkills.map(
    (skill, index) => ({
      id: `${selectedCareer}-${skill}`,
      week: Math.floor(index / 2) + 1,
      skill,
      priority: getPriority(skill),
      description:
        skillDescriptions[skill] ||
        `Learn the fundamentals of ${skill} and practice it through hands-on projects.`,
    })
  );

  const toggleTask = (taskId) => {
    setCompletedTasks((previousTasks) =>
      previousTasks.includes(taskId)
        ? previousTasks.filter(
            (id) => id !== taskId
          )
        : [...previousTasks, taskId]
    );
  };

  const resetPlan = () => {
    setCompletedTasks([]);
    localStorage.removeItem(storageKey);
  };

  const totalTasks = studyPlan.length;

  const completedCount = studyPlan.filter(
    (task) => completedTasks.includes(task.id)
  ).length;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedCount / totalTasks) * 100
        );

  useEffect(() => {
    setStudyPlanCompleted(
      totalTasks > 0 && progress === 100
    );
  }, [
    progress,
    totalTasks,
    setStudyPlanCompleted,
  ]);

  const weeks = {};

  studyPlan.forEach((task) => {
    if (!weeks[task.week]) {
      weeks[task.week] = [];
    }

    weeks[task.week].push(task);
  });

  const getPriorityStyle = (priority) => {
    if (priority === "High Priority") {
      return {
        color: "#F59E0B",
        background: "rgba(245,158,11,0.12)",
        border: "1px solid #F59E0B",
      };
    }

    if (priority === "Medium Priority") {
      return {
        color: "#60A5FA",
        background: "rgba(96,165,250,0.12)",
        border: "1px solid #60A5FA",
      };
    }

    return {
      color: "#9CA3AF",
      background: "rgba(156,163,175,0.10)",
      border: "1px solid #4B5563",
    };
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>📚 Smart Study Plan</h1>

        <p>
          Personalized learning plan for{" "}
          <strong>{selectedCareer}</strong>
        </p>
      </div>

      {!careerMatch && (
        <div
          className="career-card"
          style={{
            border: "1px solid #8B5CF6",
            marginTop: "20px",
          }}
        >
          <h2>🎯 Career Match Required</h2>

          <p
            style={{
              color: "#d1d5db",
              marginTop: "15px",
              lineHeight: "1.7",
            }}
          >
            Complete your Career Match first. Once CareerCompass
            identifies your missing skills, they will automatically
            appear here as a personalized study plan.
          </p>
        </div>
      )}

      {careerMatch &&
        careerMatch.career !== selectedCareer && (
          <div
            className="career-card"
            style={{
              border: "1px solid #F59E0B",
              marginTop: "20px",
            }}
          >
            <h2>⚠️ Career Match Changed</h2>

            <p
              style={{
                color: "#d1d5db",
                marginTop: "15px",
                lineHeight: "1.7",
              }}
            >
              Your current Career Match is for{" "}
              <strong>{careerMatch.career}</strong>, while your
              selected career is{" "}
              <strong>{selectedCareer}</strong>.
              <br />
              Run Career Match again for this career to generate
              the correct personalized study plan.
            </p>
          </div>
        )}

      {careerMatch &&
        careerMatch.career === selectedCareer && (
          <>
            <div
              className="career-card"
              style={{
                marginTop: "20px",
                border: "1px solid #374151",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "20px",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <h2>🎓 Personalized Learning Path</h2>

                  <p
                    style={{
                      color: "#9CA3AF",
                      marginTop: "8px",
                    }}
                  >
                    Your study plan is based on the skills
                    missing for your selected career.
                  </p>
                </div>

                <button
                  onClick={resetPlan}
                  style={{
                    padding: "10px 18px",
                    borderRadius: "8px",
                    border: "1px solid #EF4444",
                    background: "transparent",
                    color: "#EF4444",
                    cursor: "pointer",
                  }}
                >
                  Reset Plan
                </button>
              </div>

              <div
                style={{
                  marginTop: "25px",
                  padding: "18px",
                  borderRadius: "10px",
                  background: "rgba(139,92,246,0.10)",
                  border: "1px solid rgba(139,92,246,0.35)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <span>Study Plan Progress</span>

                  <strong>{progress}%</strong>
                </div>

                <div
                  style={{
                    width: "100%",
                    height: "10px",
                    background: "#1F2937",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${progress}%`,
                      height: "100%",
                      background: "#8B5CF6",
                      transition: "width 0.3s ease",
                    }}
                  />
                </div>

                <p
                  style={{
                    color: "#9CA3AF",
                    marginTop: "10px",
                    fontSize: "14px",
                  }}
                >
                  {completedCount} of {totalTasks} tasks completed
                </p>
              </div>
            </div>

            {missingSkills.length === 0 ? (
              <div
                className="career-card"
                style={{
                  marginTop: "20px",
                  border: "1px solid #10B981",
                }}
              >
                <h2>🎉 Excellent Work!</h2>

                <p
                  style={{
                    color: "#d1d5db",
                    marginTop: "15px",
                    lineHeight: "1.7",
                  }}
                >
                  No missing skills were identified for your
                  current career match. You are currently well
                  aligned with the selected career.
                </p>
              </div>
            ) : (
              <>
                <div
                  style={{
                    marginTop: "25px",
                    marginBottom: "20px",
                  }}
                >
                  <h2>🚀 Skills You Need to Learn</h2>

                  <p
                    style={{
                      color: "#9CA3AF",
                      marginTop: "8px",
                    }}
                  >
                    Skills are arranged in a recommended
                    learning order. High-priority skills should
                    be learned first.
                  </p>
                </div>

                {Object.keys(weeks).map(
                  (weekNumber) => (
                    <div
                      key={weekNumber}
                      className="career-card"
                      style={{
                        marginBottom: "20px",
                        border: "1px solid #374151",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "20px",
                          flexWrap: "wrap",
                          gap: "10px",
                        }}
                      >
                        <h2>
                          📅 Week {weekNumber}
                        </h2>

                        <span
                          style={{
                            color: "#9CA3AF",
                            fontSize: "14px",
                          }}
                        >
                          {weeks[weekNumber].length} learning{" "}
                          {weeks[weekNumber].length === 1
                            ? "task"
                            : "tasks"}
                        </span>
                      </div>

                      {weeks[weekNumber].map(
                        (task) => {
                          const isCompleted =
                            completedTasks.includes(
                              task.id
                            );

                          const priorityStyle =
                            getPriorityStyle(
                              task.priority
                            );

                          return (
                            <div
                              key={task.id}
                              style={{
                                padding: "20px",
                                marginBottom: "15px",
                                borderRadius: "12px",
                                border: isCompleted
                                  ? "1px solid #10B981"
                                  : "1px solid #374151",
                                background: isCompleted
                                  ? "rgba(16,185,129,0.08)"
                                  : "rgba(31,41,55,0.45)",
                                opacity: isCompleted
                                  ? 0.75
                                  : 1,
                                transition:
                                  "all 0.2s ease",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                  gap: "15px",
                                }}
                              >
                                <input
                                  type="checkbox"
                                  checked={isCompleted}
                                  onChange={() =>
                                    toggleTask(task.id)
                                  }
                                  style={{
                                    marginTop: "5px",
                                    width: "18px",
                                    height: "18px",
                                    cursor: "pointer",
                                  }}
                                />

                                <div
                                  style={{
                                    flex: 1,
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent:
                                        "space-between",
                                      alignItems: "center",
                                      gap: "15px",
                                      flexWrap: "wrap",
                                    }}
                                  >
                                    <h3
                                      style={{
                                        margin: 0,
                                        color: isCompleted
                                          ? "#6EE7B7"
                                          : "#F9FAFB",
                                        textDecoration:
                                          isCompleted
                                            ? "line-through"
                                            : "none",
                                      }}
                                    >
                                      {task.skill}
                                    </h3>

                                    <span
                                      style={{
                                        ...priorityStyle,
                                        padding:
                                          "5px 10px",
                                        borderRadius:
                                          "20px",
                                        fontSize:
                                          "12px",
                                        fontWeight: 600,
                                      }}
                                    >
                                      {task.priority}
                                    </span>
                                  </div>

                                  <p
                                    style={{
                                      color: "#9CA3AF",
                                      lineHeight: "1.6",
                                      marginTop: "10px",
                                      marginBottom: 0,
                                    }}
                                  >
                                    {task.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  )
                )}
              </>
            )}
          </>
        )}

        

        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid #374151",
            background: "rgba(31,41,55,0.35)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "#9CA3AF",
              lineHeight: "1.6",
            }}
          >
            💡 Stay consistent with your study plan and
            complete each skill step by step.
          </p>

          {progress === 100 && totalTasks > 0 && (
            <p
              style={{
                marginTop: "12px",
                marginBottom: 0,
                color: "#10B981",
                fontWeight: 600,
              }}
            >
              🎉 You have completed your personalized study
              plan!
            </p>
          )}
        </div>
      
    </div>
  );
}

export default StudyPlan;