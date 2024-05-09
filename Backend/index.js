// Import required modules
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mysql = require("mysql2");
const convertBooleanToBuffer = require("./BufferConvert");
require("dotenv").config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// MySQL Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
});

// Test MySQL connection
pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
  connection.release();
});

// Routes
app.get("/", (req, res) => {
  res.send("Backend Started");
});

// TODO For Adding New Dealer
app.post("/add-dealer", (req, res) => {
  const dealerData = req.body;
  const sql = `
    INSERT INTO dealer_info (
      dealer_code,
      dealership_name,
      dealership_dba,
      dealership_street,
      dealership_city,
      dealership_state,
      dealership_zip,
      dealership_webiste,
      dealership_phnumber,
      dealer_principal_first_name,
      dealer_principal_last_name,
      dealer_principal_email,
      general_sales_mgr_first_name,
      general_sales_mgr_last_name,
      general_sales_mgr_email,
      general_service_mgr_first_name,
      general_service_mgr_last_name,
      general_service_mgr_email,
      controller_first_name,
      controller_last_name,
      controller_email,
      billing_contact_first_name,
      billing_contact_last_name,
      billing_contact_email,
      marketing_contact_first_name,
      marketing_contact_last_name,
      marketing_contact_email,
      marketing_contact_dms_provider,
      marketing_contact_service_scheduler_provider,
      dealership_bdc,
      amenities
    )
    VALUES ?`;

  // Data to be inserted
  const values = [
    [
      dealerData.dealer_code,
      dealerData.dealership_name,
      dealerData.dealership_dba,
      dealerData.dealership_street,
      dealerData.dealership_city,
      dealerData.dealership_state,
      dealerData.dealership_zip,
      dealerData.dealership_webiste,
      dealerData.dealership_phnumber,
      dealerData.dealer_principal_first_name,
      dealerData.dealer_principal_last_name,
      dealerData.dealer_principal_email,
      dealerData.general_sales_mgr_first_name,
      dealerData.general_sales_mgr_last_name,
      dealerData.general_sales_mgr_email,
      dealerData.general_service_mgr_first_name,
      dealerData.general_service_mgr_last_name,
      dealerData.general_service_mgr_email,
      dealerData.controller_first_name,
      dealerData.controller_last_name,
      dealerData.controller_email,
      dealerData.billing_contact_first_name,
      dealerData.billing_contact_last_name,
      dealerData.billing_contact_email,
      dealerData.marketing_contact_first_name,
      dealerData.marketing_contact_last_name,
      dealerData.marketing_contact_email,
      dealerData.marketing_contact_dms_provider,
      dealerData.marketing_contact_service_scheduler_provider,
      dealerData.dealership_bdc,
      dealerData.amenities,
    ],
  ];

  // Execute the query
  pool.query(sql, [values], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      res.status(500).send("Error inserting data");
    } else {
      console.log("Data inserted successfully");
      res.status(200).send("Data inserted successfully");
    }
  });
});

app.get("/dealer-info/:dealer_code", (req, res) => {
  const dealerCode = req.params.dealer_code;
  console.log(req);
  const sql = `
    SELECT * FROM dealer_info WHERE dealer_code = ?`;

  pool.query(sql, dealerCode, (err, result) => {
    if (err) {
      console.error("Error fetching dealer info:", err);
      res.status(500).send("Error fetching dealer info");
    } else {
      if (result.length === 0) {
        res.status(404).send("Dealer info not found");
      } else {
        res.status(200).json(result[0]);
      }
    }
  });
});

// TODO - To Update the dealer details
app.put("/update-dealer/:dealer_code", (req, res) => {
  const dealerCode = req.params.dealer_code;
  const dealerData = req.body;
  const dealershipBdcBuffer = convertBooleanToBuffer(dealerData.dealership_bdc);
  const sql = `
    UPDATE dealer_info
    SET
      dealership_name = ?,
      dealership_dba = ?,
      dealership_street = ?,
      dealership_city = ?,
      dealership_state = ?,
      dealership_zip = ?,
      dealership_webiste = ?,
      dealership_phnumber = ?,
      dealer_principal_first_name = ?,
      dealer_principal_last_name = ?,
      dealer_principal_email = ?,
      general_sales_mgr_first_name = ?,
      general_sales_mgr_last_name = ?,
      general_sales_mgr_email = ?,
      general_service_mgr_first_name = ?,
      general_service_mgr_last_name = ?,
      general_service_mgr_email = ?,
      controller_first_name = ?,
      controller_last_name = ?,
      controller_email = ?,
      billing_contact_first_name = ?,
      billing_contact_last_name = ?,
      billing_contact_email = ?,
      marketing_contact_first_name = ?,
      marketing_contact_last_name = ?,
      marketing_contact_email = ?,
      marketing_contact_dms_provider = ?,
      marketing_contact_service_scheduler_provider = ?,
      dealership_bdc = ?,
      amenities = ?,
      marketing_team=?
    WHERE dealer_code = ?
  `;

  // Data to be updated
  const values = [
    dealerData.dealership_name,
    dealerData.dealership_dba,
    dealerData.dealership_street,
    dealerData.dealership_city,
    dealerData.dealership_state,
    dealerData.dealership_zip,
    dealerData.dealership_webiste,
    dealerData.dealership_phnumber,
    dealerData.dealer_principal_first_name,
    dealerData.dealer_principal_last_name,
    dealerData.dealer_principal_email,
    dealerData.general_sales_mgr_first_name,
    dealerData.general_sales_mgr_last_name,
    dealerData.general_sales_mgr_email,
    dealerData.general_service_mgr_first_name,
    dealerData.general_service_mgr_last_name,
    dealerData.general_service_mgr_email,
    dealerData.controller_first_name,
    dealerData.controller_last_name,
    dealerData.controller_email,
    dealerData.billing_contact_first_name,
    dealerData.billing_contact_last_name,
    dealerData.billing_contact_email,
    dealerData.marketing_contact_first_name,
    dealerData.marketing_contact_last_name,
    dealerData.marketing_contact_email,
    dealerData.marketing_contact_dms_provider,
    dealerData.marketing_contact_service_scheduler_provider,
    dealershipBdcBuffer,
    dealerData.amenities,
    dealerData.marketing_team,
    dealerCode,
  ];

  // Execute the query
  pool.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating data:", err);
      res.status(500).send("Error updating data");
    } else {
      console.log("Data updated successfully");
      res.status(200).send("Data updated successfully");
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
