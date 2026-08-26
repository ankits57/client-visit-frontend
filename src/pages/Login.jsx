import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../api/axios";
import AuthLayout from "../components/AuthLayout";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      login(user, token);

      navigate("/dashboard");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message || "Unable to login. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back 👋"
      subtitle="Sign in to manage your client visits."
    >
      <form onSubmit={handleSubmit}>
        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.formGroup}>
          <label>Email</label>

          <input
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            ...styles.button,
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p style={styles.footer}>
          Don't have an account? <Link to="/register">Create account</Link>
        </p>
      </form>
    </AuthLayout>
  );
};

const styles = {
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
    marginBottom: "18px",
  },

  input: {
    padding: "12px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "15px",
  },

  button: {
    width: "100%",
    padding: "13px",
    border: "none",
    borderRadius: "8px",
    background: "#2563eb",
    color: "white",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px",
  },

  error: {
    background: "#fee2e2",
    color: "#dc2626",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "18px",
    fontSize: "14px",
  },

  footer: {
    textAlign: "center",
    marginTop: "25px",
    color: "#6b7280",
  },
};

export default Login;
