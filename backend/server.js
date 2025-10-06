require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();

// -------------------------
// MIDDLEWARE
// -------------------------
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// -------------------------
// DATABASE
// -------------------------
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
    process.exit(1);
  }
  console.log("MySQL connected...");
});

// -------------------------
// AUTH Middleware
// -------------------------
const authenticate = (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) return res.status(401).json({ error: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

// -------------------------
// SIGNUP (first user = admin)
// -------------------------
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: "Name, email, password required." });

  db.query("SELECT id FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length > 0)
      return res.status(409).json({ error: "Email already registered." });

    // Determine role: first user = admin, others = user
    db.query("SELECT COUNT(*) AS count FROM users", (err, results2) => {
      if (err) return res.status(500).json({ error: err.message });
      const role = results2[0].count === 0 ? "admin" : "user";

      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ error: err.message });

        db.query(
          "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
          [name, email, hashedPassword, role],
          (err, result) => {
            if (err) return res.status(500).json({ error: err.message });

            const user = { id: result.insertId, name, email, role };
            const token = jwt.sign(
              { id: user.id, email: user.email, role: user.role },
              process.env.JWT_SECRET,
              { expiresIn: "7d" }
            );

            res.cookie("authToken", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "lax",
              maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            res.json({ message: "Signup successful", user });
          }
        );
      });
    });
  });
});

// -------------------------
// LOGIN
// -------------------------
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password required." });

  db.query(
    "SELECT id, name, email, password, role FROM users WHERE email = ?",
    [email],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0)
        return res.status(401).json({ error: "Invalid credentials." });

      const user = results[0];

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!isMatch)
          return res.status(401).json({ error: "Invalid credentials." });

        const token = jwt.sign(
          { id: user.id, email: user.email, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "7d" } // JWT still valid for 7 days, but cookie is session-only
        );

        res.cookie("authToken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          // no maxAge or expires → cookie expires when browser closes
        });

        delete user.password;
        res.json({ message: "Login successful", user });
      });
    }
  );
});

// -------------------------
// GET current user
// -------------------------
app.get("/me", authenticate, (req, res) => {
  res.json({ user: req.user });
});

// -------------------------
// ADMIN DASHBOARD
// -------------------------
app.get("/admin/dashboard", authenticate, (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ error: "Forbidden: Admins only" });

  res.json({ message: "Welcome to the admin dashboard", user: req.user });
});

// -------------------------
// CART ROUTES
// -------------------------
app.get("/cart", authenticate, (req, res) => {
  const userId = req.user.id;
  db.query(
    `SELECT c.id AS id, c.quantity, g.id AS guitar_id, g.name, g.price, g.images
     FROM cart c
     JOIN guitars g ON c.guitar_id = g.id
     WHERE c.user_id = ?`,
    [userId],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Could not fetch cart" });
      res.json({ cart: results });
    }
  );
});

app.post("/cart", authenticate, (req, res) => {
  const userId = req.user.id;
  const { guitarId, quantity } = req.body;

  if (!guitarId || !quantity)
    return res.status(400).json({ error: "Guitar ID and quantity required" });

  db.query(
    "SELECT id, quantity FROM cart WHERE user_id = ? AND guitar_id = ?",
    [userId, guitarId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results.length > 0) {
        const newQty = results[0].quantity + quantity;
        db.query(
          "UPDATE cart SET quantity = ? WHERE id = ?",
          [newQty, results[0].id],
          (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({
              message: "Cart updated",
              id: results[0].id,
              quantity: newQty,
            });
          }
        );
      } else {
        db.query(
          "INSERT INTO cart (user_id, guitar_id, quantity) VALUES (?, ?, ?)",
          [userId, guitarId, quantity],
          (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({
              message: "Item added to cart",
              id: result.insertId,
              quantity,
            });
          }
        );
      }
    }
  );
});

app.put("/cart/:id", authenticate, (req, res) => {
  const userId = req.user.id;
  const cartId = req.params.id;
  const { quantity } = req.body;

  if (!quantity || quantity < 1)
    return res.status(400).json({ error: "Quantity must be at least 1" });

  db.query(
    "UPDATE cart SET quantity = ? WHERE id = ? AND user_id = ?",
    [quantity, cartId, userId],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0)
        return res.status(404).json({ error: "Cart item not found" });
      res.json({ message: "Quantity updated", id: cartId, quantity });
    }
  );
});

app.delete("/cart/:id", authenticate, (req, res) => {
  const userId = req.user.id;
  const cartId = req.params.id;

  db.query(
    "DELETE FROM cart WHERE id = ? AND user_id = ?",
    [cartId, userId],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0)
        return res.status(404).json({ error: "Cart item not found" });
      res.json({ message: "Item removed from cart", id: cartId });
    }
  );
});
// -------------------------
// ADD NEW GUITAR
// -------------------------
app.post("/guitars", authenticate, (req, res) => {
  // Only admins can add
  if (req.user.role !== "admin")
    return res.status(403).json({ error: "Forbidden: Admins only" });

  const { name, brand, type, strings, price, description, features, summary } =
    req.body;

  if (!name || !brand || !type || !strings || !price)
    return res.status(400).json({ error: "Missing required fields" });

  const featuresStr = features ? JSON.stringify(features) : null; // store as JSON
  const summaryStr = summary || null;

  const query =
    "INSERT INTO guitars (name, brand, type, strings, price, description, features, summary) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(
    query,
    [name, brand, type, strings, price, description, featuresStr, summaryStr],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Guitar added successfully", id: result.insertId });
    }
  );
});

// GET guitars by type
app.get("/guitars", (req, res) => {
  const type = req.query.type;
  let query = "SELECT * FROM guitars";
  const params = [];

  if (type) {
    query += " WHERE type = ?";
    params.push(type);
  }

  db.query(query, params, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// -------------------------
// START SERVER
// -------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
