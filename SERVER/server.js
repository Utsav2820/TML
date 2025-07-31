// server.js
const express = require("express");
const sql = require("mssql/msnodesqlv8");
const dotenv = require("dotenv");
const cors = require("cors");

// Load .env variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
  server: process.env.DB_SERVER, // e.g., localhost\UTSAV
  database: process.env.DB_NAME, // e.g., MES_DEVICE
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true,
    encrypt: false,
    trustServerCertificate: true,
  },
};

// Global pool variable
let pool = null;

// Async function to start DB + server
async function startServer() {
  try {
    pool = await sql.connect(dbConfig);
    console.log("✅ Connected to MSSQL Database successfully!");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      console.log(`Database Server: ${process.env.DB_SERVER}`);
      console.log(`Database Name: ${process.env.DB_NAME}`);
    });
  } catch (err) {
    console.error("❌ MSSQL connection failed:");
    console.error(err);
    process.exit(1); // Exit if DB connection fails
  }
}

startServer(); // Start DB + Express

// ------------------------------------
// API ROUTES (only work after pool is connected)
// ------------------------------------

// Test DB connection
app.get("/api/test", async (req, res) => {
  try {
    const result = await pool
      .request()
      .query("SELECT GETDATE() AS current_time");
    res.json(result.recordset);
  } catch (err) {
    console.error("❌ Test query failed:", err);
    res.status(500).send("Test query failed.");
  }
});

// Get all factories
app.get("/api/factories", async (req, res) => {
  try {
    const result = await pool
      .request()
      .query("SELECT * FROM vehicle_factories");
    res.json(result.recordset);
  } catch (err) {
    console.error("❌ Error fetching factories:", err);
    res.status(500).send("Error fetching factories");
  }
});

// Get machines by factory ID
app.get("/api/machines/:factoryId", async (req, res) => {
  const { factoryId } = req.params;
  if (isNaN(parseInt(factoryId))) {
    return res.status(400).send("Invalid factory ID.");
  }

  try {
    const result = await pool
      .request()
      .input("factoryId", sql.Int, factoryId)
      .query("SELECT * FROM machines WHERE vehicle_factory_id = @factoryId");
    res.json(result.recordset);
  } catch (err) {
    console.error("❌ Error fetching machines:", err);
    res.status(500).send("Error fetching machines");
  }
});

// Form-to-table mapping
const formTableMap = {
  "vf1-ac-filling": "AC_Filling_Result_Line1",
  "vf1-clutch-filling": "DURR_CLUTCH_LINE1",
  "vf1-coolant-filling": "PIECON_COOLANT",
  "vf1-power-steering": "PIECON_PAS",
  "vf1-urea-filling": "Urea_Filling_Result_Line1",

  "vf2-ac-filling": "AC_Filling_Result_Line2",
  "vf2-clutch-filling": "DURR_CLUTCH_LINE2",
  "vf2-coolant-filling": "PIECON_L2_COOLANT",
  "vf2-power-steering": "PIECON_L2_PAS",
  "vf2-urea-filling": "Urea_Filling_Result_Line2",

  "vf3-ac-filling": "AC_Filling_Result_Line3",
  "vf3-clutch-filling": "Clutch_Filling_Result_Line3",
  "vf3-coolant-filling": "Coolant_Filling_Result_Line3",
  "vf3-power-steering": "PIECON_L3_PAS",
  "vf3-urea-filling": "Urea_Filling_Result_Line3",
  "vf3-diesel-filling": "Diesel_Filling_Result_Line3",
};

// Handle form submissions
app.post("/api/:formName", async (req, res) => {
  const { formName } = req.params;
  const table = formTableMap[formName];
  const data = req.body;

  if (!table) {
    return res.status(400).json({ error: "Invalid form name." });
  }

  const fields = Object.keys(data);
  const values = Object.values(data);

  if (fields.length === 0) {
    return res.status(400).json({ error: "No data provided." });
  }

  const placeholders = fields.map((_, i) => `@val${i}`).join(", ");
  const query = `INSERT INTO ${table} (${fields.join(
    ", "
  )}) VALUES (${placeholders})`;

  try {
    const request = pool.request();
    values.forEach((val, i) => {
      request.input(`val${i}`, val);
    });

    await request.query(query);
    res.json({ message: "✅ Data inserted successfully" });
  } catch (err) {
    console.error(`❌ Insert failed for table ${table}:`, err);
    res.status(500).json({
      error: "Database insertion error",
      details: err.message,
    });
  }
});
