const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
require("dotenv").config(); // load .env

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL is connected...");
});

// Create
app.post("/guitars", (req, res) => {
  const { name, model, price, image_url } = req.body;
  db.query(
    "INSERT INTO guitars (name, model, price, image_url) VALUES (?, ?, ?, ?)",
    [name, model, price, image_url],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send({ message: "Guitar is added", id: result.insertId });
    }
  );
});

// Read
app.get("/guitars", (req, res) => {
  db.query("SELECT * FROM guitars", (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

// Update
app.put("/guitars/:id", (req, res) => {
  const { id } = req.params;
  const { name, model, price, image_url } = req.body;
  db.query(
    "UPDATE guitars SET name=?, model=?, price=?, image_url=? WHERE id=?",
    [name, model, price, image_url, id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send({ message: "Guitar is updated" });
    }
  );
});

// Delete
app.delete("/guitars/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM guitars WHERE id=?", [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Guitar is deleted" });
  });
});

// Start server
app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
