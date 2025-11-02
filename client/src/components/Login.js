import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const existingUsers = JSON.parse(localStorage.getItem("eshop_users")) || [];
    const matchedUser = existingUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (matchedUser) {
      localStorage.setItem("eshop_user", JSON.stringify(matchedUser));
      onLogin(matchedUser);
      setMessage("✅ Login successful!");
      setTimeout(() => navigate("/home"), 1000);
    } else {
      setMessage("❌ Invalid email or password!");
    }
  };

  return (
    <div className="app-container">
      <h1>E-Shop Lite</h1>
      <h2>Sign In</h2>
      {message && (
        <p style={{ color: message.includes("Invalid") ? "red" : "green" }}>
          {message}
        </p>
      )}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="📧 Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="🔒 Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
      </form>

      <p style={{ marginTop: "10px" }}>
        Don’t have an account?{" "}
        <a href="/register" style={{ color: "#0078ff", textDecoration: "none" }}>
          Register
        </a>
      </p>
    </div>
  );
}

export default Login;
