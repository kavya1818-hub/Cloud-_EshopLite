import React, { useState } from "react";
import "../App.css";

const products = [
  { id:1, name:"Wireless Headphones", price:"₹3,499", desc:"Noise cancelling Bluetooth headphones.", image:"https://via.placeholder.com/150" },
  { id:2, name:"Smart Watch", price:"₹5,999", desc:"Tracks steps, sleep, and heart rate.", image:"https://via.placeholder.com/150" },
  { id:3, name:"Coffee Maker", price:"₹2,499", desc:"Brew perfect coffee every morning.", image:"https://via.placeholder.com/150" },
  { id:4, name:"Bluetooth Speaker", price:"₹1,999", desc:"Portable mini speaker with rich bass.", image:"https://via.placeholder.com/150" },
];

function ProductSearch() {
  const [query,setQuery]=useState("");
  const [results,setResults]=useState([]);
  const [cartMsg,setCartMsg]=useState("");

  const handleSearch=(e)=>{
    const val=e.target.value;
    setQuery(val);
    const filtered=products.filter(p=>p.name.toLowerCase().includes(val.toLowerCase()));
    setResults(filtered);
  };

  const addToCart=(name)=>{
    setCartMsg(`${name} added to cart successfully!`);
    setTimeout(()=>setCartMsg(""),2000);
  };

  return(
    <div className="search-section">
      <input type="text" placeholder="🔍 Search for products…" value={query} onChange={handleSearch} className="search-bar"/>
      {cartMsg && <p className="success-msg">{cartMsg}</p>}
      <div className="product-grid">
        {results.map(p=>(
          <div key={p.id} className="product-card">
            <img src={p.image} alt={p.name}/>
            <h3>{p.name}</h3>
            <p>{p.desc}</p>
            <p className="price">{p.price}</p>
            <button onClick={()=>addToCart(p.name)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductSearch;
