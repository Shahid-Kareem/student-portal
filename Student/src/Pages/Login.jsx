import { useContext, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  FaUser, FaLock, FaEye, FaEyeSlash,
  FaGraduationCap, FaBookOpen, FaChartLine, FaTrophy,
} from "react-icons/fa";
import "./Login.css";

const FEATURES = [
  { icon: <FaBookOpen />,  text: "Access all your subjects & assignments" },
  { icon: <FaChartLine />, text: "Track your academic performance" },
  { icon: <FaTrophy />,    text: "View grades, quizzes & achievements" },
];

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername]     = useState("");
  const [password, setPassword]     = useState("");
  const [showPass, setShowPass]     = useState(false);
  const [message, setMessage]       = useState({ text: "", type: "" });
  const [loading, setLoading]       = useState(false);
  const [focused, setFocused]       = useState("");

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setMessage({ text: "Please enter your username and password.", type: "error" });
      return;
    }
    setLoading(true);
    setMessage({ text: "", type: "" });
    try {
      const res  = await fetch(`${API_BASE_URL}/api/auth/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        login(data.access, data.refresh);
        setMessage({ text: "Login successful! Redirecting…", type: "success" });
        setTimeout(() => navigate("/dashboard"), 800);
      } else {
        setMessage({ text: data?.detail || "Invalid credentials. Please try again.", type: "error" });
      }
    } catch {
      setMessage({ text: "Server unreachable. Check your connection.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg-root">

      {/* ── Floating particles ── */}
      <ul className="lg-particles">
        {Array.from({ length: 12 }).map((_, i) => <li key={i} />)}
      </ul>

      {/* ── Left panel ── */}
      <div className="lg-left">
        <div className="lg-left-inner">
          <div className="lg-brand">
            <div className="lg-brand-icon"><FaGraduationCap /></div>
            <span className="lg-brand-name">EduPortal</span>
          </div>

          <h1 className="lg-headline">
            Your Academic<br />
            <span className="lg-headline-accent">Journey Starts Here</span>
          </h1>
          <p className="lg-tagline">
            One place for grades, quizzes, attendance, and everything in between.
          </p>

          <ul className="lg-features">
            {FEATURES.map(({ icon, text }, i) => (
              <li key={i} className="lg-feature-item" style={{ animationDelay: `${0.4 + i * 0.15}s` }}>
                <span className="lg-feature-icon">{icon}</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>

          {/* decorative blobs */}
          <div className="lg-blob lg-blob-1" />
          <div className="lg-blob lg-blob-2" />
        </div>
      </div>

      {/* ── Right panel (form) ── */}
      <div className="lg-right">
        <form className="lg-card" onSubmit={handleLogin} noValidate>

          <div className="lg-card-header">
            <div className="lg-avatar"><FaGraduationCap /></div>
            <h2 className="lg-card-title">Welcome back</h2>
            <p className="lg-card-sub">Sign in to your student account</p>
          </div>

          {/* Username */}
          <div className={`lg-field ${focused === "user" ? "lg-field--focus" : ""} ${username ? "lg-field--filled" : ""}`}>
            <label className="lg-label">Username</label>
            <div className="lg-input-wrap">
              <FaUser className="lg-input-icon" />
              <input
                type="text"
                className="lg-input"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => setFocused("user")}
                onBlur={() => setFocused("")}
                autoComplete="username"
              />
            </div>
          </div>

          {/* Password */}
          <div className={`lg-field ${focused === "pass" ? "lg-field--focus" : ""} ${password ? "lg-field--filled" : ""}`}>
            <label className="lg-label">Password</label>
            <div className="lg-input-wrap">
              <FaLock className="lg-input-icon" />
              <input
                type={showPass ? "text" : "password"}
                className="lg-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocused("pass")}
                onBlur={() => setFocused("")}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="lg-eye-btn"
                onClick={() => setShowPass((p) => !p)}
                tabIndex={-1}
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Message */}
          {message.text && (
            <div className={`lg-msg lg-msg--${message.type}`}>
              {message.type === "success" ? "✅" : "⚠️"} {message.text}
            </div>
          )}

          {/* Submit */}
          <button type="submit" className="lg-submit" disabled={loading}>
            {loading
              ? <><span className="lg-spinner" /> Signing in…</>
              : "Sign In"}
          </button>

          <p className="lg-footer">© {new Date().getFullYear()} EduPortal · All rights reserved</p>
        </form>
      </div>

    </div>
  );
};

export default Login;
