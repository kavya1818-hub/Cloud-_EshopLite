// client/src/components/Landing.js
import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-blue-800 drop-shadow-md">
        🛍️ E-Shop Lite
      </h1>

      <p className="text-lg mb-8 text-gray-700 text-center px-6">
        Welcome to <span className="font-semibold text-blue-700">E-Shop Lite</span> —
        your AI-powered smart shopping platform!
      </p>

      <div className="flex gap-6">
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Sign In
        </button>
        <button
          onClick={() => navigate("/register")}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Register
        </button> 
      </div>
    </div>
  );
};

export default Landing;

