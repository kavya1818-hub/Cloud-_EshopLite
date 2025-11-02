import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Landing from "./components/Landing";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import ProductDetails from "./components/ProductDetails"; 
import Cart from "./components/Cart";
import "./App.css";

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("eshop_user")));

  const handleLogout = () => {
    localStorage.removeItem("eshop_user");
    setUser(null);
    navigate("/"); // redirect to landing page after logout
  };

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login onLogin={setUser} />} />
      <Route path="/Cart" element={<Cart />} />
      <Route
        path="/home"
        element={
          user ? (
            <Home user={user} onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/product/:id" element={<ProductDetails />} />
    </Routes>
  );
}
export default AppWrapper;

