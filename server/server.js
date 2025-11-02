// server/server.js
const express = require("express");
const cors = require("cors");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- DB setup ---
const db = new sqlite3.Database(path.join(__dirname, "eshop.db"));
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT, email TEXT UNIQUE, password TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS products(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT, price REAL
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS cart(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userEmail TEXT, productId INTEGER
  )`);
  // seed products only once
  db.run(
    `INSERT OR IGNORE INTO products (id, name, price) VALUES
      (1,'Wireless Headphones',2999),
      (2,'Smart Watch',4999),
      (3,'Bluetooth Speaker',1999)
    `
  );
});

// --- API routes ---
app.get("/", (req, res) => {
  res.json({ message: "API running. Use the React client at http://localhost:3000" });
});

// Register
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  db.run("INSERT INTO users(name,email,password) VALUES(?,?,?)", [name, email, password], function (err) {
    if (err) return res.status(400).json({ error: "Email already exists" });
    res.json({ message: "Registered", userId: this.lastID });
  });
});

// Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.get("SELECT id,name,email FROM users WHERE email=? AND password=?", [email, password], (err, row) => {
    if (err) return res.status(500).json({ error: "DB error" });
    if (!row) return res.status(400).json({ error: "Invalid credentials" });
    res.json({ message: "Login success", user: row });
  });
});

// Products (search)
app.get("/products", (req, res) => {
  const q = req.query.q ? `%${req.query.q}%` : "%";
  db.all("SELECT * FROM products WHERE name LIKE ?", [q], (err, rows) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json(rows);
  });
});

// Add to cart
app.post("/cart", (req, res) => {
  const { userEmail, productId } = req.body;
  db.run("INSERT INTO cart(userEmail, productId) VALUES(?,?)", [userEmail, productId], function (err) {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json({ message: "Added successfully" });
  });
});

// Get cart items
app.get("/cart", (req, res) => {
  const userEmail = req.query.userEmail;
  db.all("SELECT p.name, p.price FROM cart c JOIN products p ON c.productId=p.id WHERE c.userEmail=?", [userEmail], (err, rows) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json(rows);
  });
});

// start
const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
