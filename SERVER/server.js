// server.js
const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const cors = require("cors");

// Load env variables
dotenv.config();

// Initialize express app
const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to DB
db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.message);
  } else {
    console.log("✅ Connected to MySQL Database");
  }
});

// --------------------------- GET ROUTES ---------------------------

// ✅ Get all vehicle factories
app.get("/vehicle-factories", (req, res) => {
  const sql = "SELECT * FROM vehicle_factories";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching vehicle factories:", err);
      return res.status(500).send("Server Error");
    }
    res.json(results);
  });
});

// ✅ Get all machines by factory ID
app.get("/machines/:factoryId", (req, res) => {
  const { factoryId } = req.params;
  const sql = "SELECT * FROM machines WHERE vehicle_factory_id = ?";
  db.query(sql, [factoryId], (err, results) => {
    if (err) {
      console.error("Error fetching machines:", err);
      return res.status(500).send("Server Error");
    }
    res.json(results);
  });
});

// ✅ Get all submitted form data (optional for viewing records)
app.post("/api/submit", (req, res) => {
  const { area, machine, field1, field2 } = req.body;

  if (!area || !machine || !field1 || !field2) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql = `INSERT INTO form_data (area, machine, field1, field2) VALUES (?, ?, ?, ?)`;
  const values = [area.name || area, machine.name || machine, field1, field2];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("❌ Error inserting form data:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(200).json({ message: "Data submitted successfully" });
  });
});
// --------------------------- DELETE ROUTES ---------------------------

// ✅ Delete a machine by ID
app.delete("/machines/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM machines WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting machine:", err);
      return res.status(500).send("Server Error");
    }

    if (result.affectedRows === 0) {
      return res.status(404).send("❌ Machine not found");
    }

    res.send("🗑️ Machine deleted successfully");
  });
});

// ✅ Delete a vehicle factory by ID (if needed)
app.delete("/vehicle-factories/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM vehicle_factories WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting factory:", err);
      return res.status(500).send("Server Error");
    }

    if (result.affectedRows === 0) {
      return res.status(404).send("❌ Vehicle factory not found");
    }

    res.send("🗑️ Vehicle factory deleted successfully");
  });
});

// ✅ Delete form submission by ID (optional)
app.delete("/form-data/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM form_data WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting form entry:", err);
      return res.status(500).send("Server Error");
    }

    if (result.affectedRows === 0) {
      return res.status(404).send("❌ Form entry not found");
    }

    res.send("🗑️ Form entry deleted successfully");
  });
});

// --------------------------- START SERVER ---------------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
