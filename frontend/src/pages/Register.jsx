import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Registration failed."
        );
      }

      setSuccess(
        "Registration successful! Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      console.error("Registration Error:", err);
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
          Create your CareerCompass account
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

        {success && (
          <div
            style={{
              background: "rgba(34,197,94,0.12)",
              border: "1px solid #22C55E",
              color: "#22C55E",
              padding: "12px",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          >
            ✅ {success}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <label>Name</label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Enter your name"
            required
            style={{
              marginTop: "8px",
              marginBottom: "18px",
            }}
          />

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
            placeholder="Create a password"
            required
            minLength="6"
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
            {loading
              ? "Creating account..."
              : "Create Account"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            color: "#bdbdbd",
            marginTop: "22px",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#a78bfa",
              fontWeight: "600",
            }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;