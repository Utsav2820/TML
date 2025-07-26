const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config(); // Load environment variables from .env file
const app = express();

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse JSON request bodies

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.message);
  } else {
    console.log("✅ Connected to MySQL Database");
  }
});

// -------- API ROUTES --------

// Get all factories (e.g., VEHICLE FACTORY 1, VEHICLE FACTORY 2, VEHICLE FACTORY 3)
app.get("/api/factories", (req, res) => {
  db.query("SELECT * FROM vehicle_factories", (err, results) => {
    if (err) {
      console.error("Error fetching factories:", err);
      return res.status(500).send("Error fetching factories");
    }
    res.json(results);
  });
});

// Get machines by factory ID
app.get("/api/machines/:factoryId", (req, res) => {
  const { factoryId } = req.params;
  db.query(
    "SELECT * FROM machines WHERE vehicle_factory_id = ?",
    [factoryId],
    (err, results) => {
      if (err) {
        console.error(`Error fetching machines for factory ${factoryId}:`, err);
        return res.status(500).send("Error fetching machines");
      }
      res.json(results);
    }
  );
});

// Map: Frontend API endpoint name to Backend Database table name
// These keys (e.g., "vf1-ac-filling") must exactly match the
// `formName` parameter sent from your frontend's axios.post requests.
const formTableMap = {
  // VF1 Forms
  "vf1-ac-filling": "AC_Filling_vf1",
  "vf1-clutch-filling": "Clutch_Process_vf1",
  "vf1-coolant-filling": "Coolant_Process_vf1",
  "vf1-power-steering": "Power_Steering_vf1",
  "vf1-urea-filling": "Urea_Filling_vf1",

  // VF2 Forms
  "vf2-ac-filling": "AC_Filling_vf2",
  "vf2-clutch-filling": "Clutch_Process_vf2",
  "vf2-coolant-filling": "Coolant_Process_vf2",
  "vf2-power-steering": "Power_Steering_vf2",
  "vf2-urea-filling": "Urea_Filling_vf2",

  // VF3 Forms
  "vf3-ac-filling": "AC_Filling_vf3",
  "vf3-clutch-filling": "Clutch_Process_vf3",
  "vf3-coolant-filling": "Coolant_Process_vf3",
  "vf3-power-steering": "Power_Steering_vf3",
  "vf3-urea-filling": "Urea_Filling_vf3",
  "vf3-diesel-filling": "Diesel_Filling_vf3",
};

// Generic dynamic form submission route
// This route handles POST requests for all your forms.
app.post("/api/:formName", (req, res) => {
  const { formName } = req.params; // Get the formName from the URL parameter
  const table = formTableMap[formName]; // Look up the corresponding table name

  // Check if a valid table name was found for the given formName
  if (!table) {
    console.error(
      `Invalid form name received: '${formName}'. No table mapping found.`
    );
    return res
      .status(400)
      .json({
        error: "Invalid form name. No corresponding database table found.",
      });
  }

  const data = req.body; // The form data sent from the frontend
  const fields = Object.keys(data); // Extract field names (column names)
  const values = Object.values(data); // Extract values for insertion
  const placeholders = fields.map(() => "?").join(","); // Create placeholders for the SQL query

  // Construct the SQL INSERT query dynamically
  const query = `INSERT INTO ${table} (${fields.join(
    ", " // Join fields with comma and space
  )}) VALUES (${placeholders})`;

  // Execute the query
  db.query(query, values, (err, result) => {
    if (err) {
      console.error(
        `Error inserting data into table '${table}' for form '${formName}':`,
        err
      );
      // Provide more specific error details in development for easier debugging
      return res.status(500).json({
        error: "Database error during data insertion.",
        details: err.message, // THIS IS THE KEY DETAIL FROM MYSQL
        sql: query, // The SQL query that failed
      });
    }
    console.log(
      `✅ Data successfully inserted into ${table}. Insert ID: ${result.insertId}`
    );
    res.json({ message: "✅ Data submitted successfully" });
  });
});

// Start the server
const PORT = process.env.PORT || 5000; // Use port from .env or default to 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
