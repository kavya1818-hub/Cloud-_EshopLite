import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const existingUsers = JSON.parse(localStorage.getItem("eshop_users")) || [];

    // check if user already exists
    const userExists = existingUsers.some((u) => u.email === email);
    if (userExists) {
      setMessage("⚠️ User already registered! Please login.");
      setTimeout(() => navigate("/login"), 1500);
      return;
    }

    const newUser = { fullName, email, password, address };
    const updatedUsers = [...existingUsers, newUser];

    // store all users + current user
    localStorage.setItem("eshop_users", JSON.stringify(updatedUsers));
    localStorage.setItem("eshop_user", JSON.stringify(newUser));

    setMessage("✅ Registration successful! Please login.");
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div className="app-container">
      <h1>E-Shop Lite</h1>
      <h2>Create Account</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="👤 Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
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
        <input
          type="text"
          placeholder="🏠 Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>

      <p style={{ marginTop: "10px" }}>
        Already have an account?{" "}
        <a href="/login" style={{ color: "#0078ff", textDecoration: "none" }}>
          Sign In
        </a>
      </p>
    </div>
  );
}

export default Register;

