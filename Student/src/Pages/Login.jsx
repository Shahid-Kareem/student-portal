import { useContext } from "react";
import {useAuth} from '../Context/AuthContext';
import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage("Please enter username and password ⚠️");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/auth/login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        login(data.access, data.refresh);
        setMessage("Login Successful ✅");
        navigate("/dashboard");
      } else {
        setMessage(data?.detail || "Invalid credentials");
      }
    } catch (error) {
      setMessage("Server not reachable ");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="login-container">
      <div className="login-box">

        <span className="login-icon">🎓</span>
        <h2>Student Portal</h2>
        <p className="login-subtitle">Sign in to your account</p>

        <div className="login-input-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="login-input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button onClick={handleLogin} disabled={loading}>
          {loading ? <><span className="login-spinner" /> Logging in...</> : "Login"}
        </button>

        {message && <p className="message">{message}</p>}

        <p className="login-divider">© 2026 Student Portal</p>
      </div>
    </div>
  );
};

export default Login;