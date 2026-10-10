import { useState } from "react";
import { apiFetch } from "../api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await apiFetch("/login", {
  method: "POST",
  body: JSON.stringify({
    email,
    password,
  }),
});

      

      if (!data.access_token) {
        throw new Error(
          data.message || "Invalid login credentials."
        );
      }

      localStorage.setItem(
        "access_token",
        data.access_token
      );

      navigate("/");
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0d0d0d",
        padding: "20px",
      }}
    >
      <div
        className="career-card"
        style={{
          width: "100%",
          maxWidth: "420px",
          background:
            "linear-gradient(135deg, #111827, #1e1b4b)",
          border: "1px solid #4c1d95",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#8B5CF6",
            marginBottom: "10px",
          }}
        >
          🚀 CareerCompass AI
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#bdbdbd",
            marginBottom: "30px",
          }}
        >
          Login to continue your career journey
        </p>

        {error && (
          <div
            style={{
              background: "rgba(239,68,68,0.12)",
              border: "1px solid #EF4444",
              color: "#EF4444",
              padding: "12px",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          >
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Enter your email"
            required
            style={{
              marginTop: "8px",
              marginBottom: "18px",
            }}
          />

          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="Enter your password"
            required
            style={{
              marginTop: "8px",
              marginBottom: "22px",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "13px",
              background: loading
                ? "#4b3a91"
                : "#7c5cff",
              border: "none",
              borderRadius: "10px",
              color: "white",
              fontSize: "16px",
              fontWeight: "600",
              cursor: loading
                ? "not-allowed"
                : "pointer",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            color: "#bdbdbd",
            marginTop: "22px",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{
              color: "#a78bfa",
              fontWeight: "600",
            }}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;