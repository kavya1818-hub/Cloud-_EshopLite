import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cart || [];

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    alert("❌ Item removed from cart!");
    navigate("/cart", { state: { cart: updatedCart } });
  };

  const handleClearCart = () => {
    if (cartItems.length === 0) {
      alert("Your cart is already empty!");
      return;
    }
    alert("🧹 Cart cleared!");
    navigate("/cart", { state: { cart: [] } });
  };

  return (
    <div className="cart-container">
      <h2>🛍️ Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty!</p>
      ) : (
        <div className="cart-grid">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-card">
              <img src={item.image} alt={item.name} />
              <div className="cart-details">
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
                <p className="price">{item.price}</p>
                <button
                  className="remove-btn"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="cart-actions">
        <button className="home-btn" onClick={() => navigate("/home")}>
          ⬅ Back to Home
        </button>
        <button className="clear-btn" onClick={handleClearCart}>
          Clear Cart
        </button>
      </div>
    </div>
  );
}

export default Cart;
