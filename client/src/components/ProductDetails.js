import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ProductDetails.css";

function ProductDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state; // the product passed from Home.js

  if (!product) {
    return (
      <div className="details-container">
        <h2>⚠️ No product found!</h2>
        <button onClick={() => navigate("/home")}>Back to Home</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const alreadyExists = existingCart.some((item) => item.id === product.id);

    if (alreadyExists) {
      alert("⚠️ Product already in cart!");
      return;
    }

    const updatedCart = [...existingCart, product];
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    alert("✅ Added to cart successfully!");
  };

  return (
    <div className="details-container">
      <div className="details-card">
        <img src={product.image} alt={product.name} className="details-image" />
        <div className="details-info">
          <h2>{product.name}</h2>
          <p className="price">{product.price}</p>
          <p>{product.desc}</p>
          <p className="rating">{product.rating}</p>
          <p className="specs">{product.specs}</p>

          <div className="details-buttons">
            <button className="add-btn" onClick={handleAddToCart}>
              Add to Cart 🛒
            </button>
            <button className="back-btn" onClick={() => navigate("/home")}>
              ⬅ Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;

