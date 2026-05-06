import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const handleLogin = async () => {
    // 🛑 prevent empty fields
    if (!username || !password) {
      setMessage("Please enter username and password ⚠️");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      let data = {};

      // ✅ safely parse JSON (even if empty)
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (response.ok) {
        setMessage("Login Successful ✅");

        // 👉 future use (optional)
        // localStorage.setItem("token", data.access);
      } else {
        setMessage(data?.detail || "Invalid credentials ❌");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Server not reachable ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Login;