const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();

// -------------------------
// MIDDLEWARE
// -------------------------
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3002"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

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
  console.log("MySQL is connected...");
});

// -------------------------
// AUTH: Signup
// -------------------------
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res
      .status(400)
      .json({ error: "Name, email, and password required." });

  if (!email.includes("@"))
    return res.status(400).json({ error: "Invalid email format." });

  if (password.length < 6)
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters." });

  db.query("SELECT id FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length > 0)
      return res.status(409).json({ error: "Email is already registered." });

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err)
        return res.status(500).json({ error: "Error hashing password." });

      db.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword],
        (err, result) => {
          if (err) return res.status(500).json({ error: err.message });

          const user = { id: result.insertId, name, email };
          const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            {
              expiresIn: "7d",
            }
          );

          res.cookie("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
          });

          res.json({ message: "Signup successful", user });
        }
      );
    });
  });
});

// -------------------------
// AUTH: Login
// -------------------------
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password required." });

  db.query(
    "SELECT id, name, email, password FROM users WHERE email = ?",
    [email],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Database error." });
      if (results.length === 0)
        return res.status(401).json({ error: "Invalid email or password." });

      const user = results[0];
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err)
          return res.status(500).json({ error: "Error comparing passwords." });
        if (!isMatch)
          return res.status(401).json({ error: "Invalid email or password." });

        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );

        res.cookie("authToken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        delete user.password;
        res.json({ message: "Login successful", user });
      });
    }
  );
});

// -------------------------
// AUTH: /me
// -------------------------
app.get("/me", (req, res) => {
  const token = req.cookies.authToken;
  if (!token) return res.status(401).json({ error: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ user: decoded });
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
});

// -------------------------
// AUTH MIDDLEWARE
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
// CRUD: Guitars
// -------------------------
app.post("/guitars", (req, res) => {
  const { name, type, price, images, features, summary } = req.body;

  db.query(
    "INSERT INTO guitars (name, type, price, images, features, summary) VALUES (?, ?, ?, ?, ?, ?)",
    [
      name,
      type,
      price,
      JSON.stringify(images),
      JSON.stringify(features),
      summary,
    ],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send({ message: "Guitar added", id: result.insertId });
    }
  );
});

app.get("/guitars", (req, res) => {
  db.query("SELECT * FROM guitars", (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

app.put("/guitars/:id", (req, res) => {
  const { id } = req.params;
  const { name, type, price, images, features, summary } = req.body;

  db.query(
    "UPDATE guitars SET name=?, type=?, price=?, images=?, features=?, summary=? WHERE id=?",
    [
      name,
      type,
      price,
      JSON.stringify(images),
      JSON.stringify(features),
      summary,
      id,
    ],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send({ message: "Guitar updated" });
    }
  );
});

app.delete("/guitars/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM guitars WHERE id=?", [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Guitar deleted" });
  });
});

// -------------------------
// CART ENDPOINTS
// -------------------------
app.post("/cart", authenticate, (req, res) => {
  const userId = req.user.id;
  const { guitarId, quantity } = req.body;

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
            res.json({ message: "Cart updated" });
          }
        );
      } else {
        db.query(
          "INSERT INTO cart (user_id, guitar_id, quantity) VALUES (?, ?, ?)",
          [userId, guitarId, quantity],
          (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Item added to cart" });
          }
        );
      }
    }
  );
});

app.get("/cart", authenticate, (req, res) => {
  const userId = req.user.id;
  db.query(
    `SELECT c.id, c.guitar_id, g.name, g.price, g.images, g.type, c.quantity
     FROM cart c
     JOIN guitars g ON c.guitar_id = g.id
     WHERE c.user_id = ?`,
    [userId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      const cartWithImages = results.map((item) => ({
        ...item,
        image: Array.isArray(item.images)
          ? item.images[0]
          : JSON.parse(item.images)[0],
      }));

      res.json({ cart: cartWithImages });
    }
  );
});

// -------------------------
// CART: Update quantity of a guitar
// -------------------------
app.put("/cart/:guitarId", authenticate, (req, res) => {
  const userId = req.user.id;
  const guitarId = req.params.guitarId;
  const { quantity } = req.body;

  if (quantity < 1)
    return res.status(400).json({ error: "Quantity must be at least 1" });

  db.query(
    "SELECT id FROM cart WHERE user_id = ? AND guitar_id = ?",
    [userId, guitarId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0)
        return res.status(404).json({ error: "Cart item not found" });

      db.query(
        "UPDATE cart SET quantity = ? WHERE id = ?",
        [quantity, results[0].id],
        (err) => {
          if (err) return res.status(500).json({ error: err.message });
          res.json({ message: "Cart quantity updated" });
        }
      );
    }
  );
});

app.delete("/cart/:id", authenticate, (req, res) => {
  const userId = req.user.id;
  const cartItemId = req.params.id;

  db.query(
    "DELETE FROM cart WHERE id = ? AND user_id = ?",
    [cartItemId, userId],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Item removed from cart" });
    }
  );
});

// -------------------------
// Start server
// -------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
