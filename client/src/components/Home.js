import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import productsData from "../data/productsData";
import "./Home.css";

function Home({ user, onLogout }) {
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (e) => setQuery(e.target.value);

  // 🔹 Filter products from imported productsData
  const filtered = productsData.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  const addToCart = (product) => {
    if (!cart.some((item) => item.id === product.id)) {
      setCart([...cart, product]);
      alert("✅ Added to cart successfully!");
    } else {
      alert("⚠️ Item already in cart!");
    }
  };

  const goToCart = () => navigate("/cart", { state: { cart } });

  return (
    <div className="home-container">
      <div className="header">
        <h2>Welcome, {user?.name?.toUpperCase() || "User"} 👋</h2>
        <p>Start exploring products with AI-powered search!</p>
      </div>

      {/* 🔹 Search Bar + Buttons */}
      <div className="search-section">
        <input
          type="text"
          placeholder="🔍 Search for products..."
          value={query}
          onChange={handleSearch}
          className="search-bar"
        />
        <button className="cart-btn" onClick={goToCart}>
          🛒 Cart ({cart.length})
        </button>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>

      {/* 🔹 Product Cards */}
      <div className="product-grid">
        {filtered.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p className="rating">⭐ {p.rating}</p>
            <p className="price">₹{p.price}</p>

            <div className="card-buttons">
              <button
                className="view-btn"
                onClick={() => navigate(`/product/${p.id}`, { state: p })}
              >
                View Details
              </button>
              <button className="add-btn" onClick={() => addToCart(p)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

