import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./ProtectedRoute";

import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

import {
  House,
  BriefcaseBusiness,
  Map,
  FileText,
  BookOpen,
  Mic2,
  Settings as SettingsIcon,
} from "lucide-react";

import Home from "./pages/Home";
import CareerPaths from "./pages/CareerPaths";
import Roadmaps from "./pages/Roadmaps";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import StudyPlan from "./pages/StudyPlan";
import InterviewPrep from "./pages/InterviewPrep";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <h2>CareerCompass AI</h2>

        <NavLink to="/">
          <House size={20} />
          <span>Home</span>
        </NavLink>

        <NavLink to="/career-paths">
          <BriefcaseBusiness size={20} />
          <span>Career Paths</span>
        </NavLink>

        <NavLink to="/roadmaps">
          <Map size={20} />
          <span>Roadmaps</span>
        </NavLink>

        <NavLink to="/resume">
          <FileText size={20} />
          <span>Resume Analyzer</span>
        </NavLink>

        <NavLink to="/study-plan">
          <BookOpen size={20} />
          <span>Study Plan</span>
        </NavLink>

        <NavLink to="/interview">
          <Mic2 size={20} />
          <span>Interview Prep</span>
        </NavLink>

        <NavLink to="/settings">
          <SettingsIcon size={20} />
          <span>Settings</span>
        </NavLink>
      </div>

      <div className="content">
        <Routes>

  {/* Public Routes */}

  <Route
    path="/login"
    element={<Login />}
  />

  <Route
    path="/register"
    element={<Register />}
  />


  {/* Protected Routes */}

  <Route element={<ProtectedRoute />}>

    <Route
      path="/"
      element={<Home />}
    />

    <Route
      path="/career-paths"
      element={<CareerPaths />}
    />

    <Route
      path="/roadmaps"
      element={<Roadmaps />}
    />

    <Route
      path="/resume"
      element={<ResumeAnalyzer />}
    />

    <Route
      path="/study-plan"
      element={<StudyPlan />}
    />

    <Route
      path="/interview"
      element={<InterviewPrep />}
    />

    <Route
      path="/settings"
      element={<Settings />}
    />

    <Route element={<ProtectedRoute />}>
  <Route
    path="/dashboard"
    element={<Dashboard />}
  />
</Route>

  </Route>

</Routes>
      </div>
    </div>
  );
}

export default App;