const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./db/db"); // Database connection utility
const addressRoutes = require("./routes/address.routes"); // Address-related routes

dotenv.config({ path: './.env' }); // Load environment variables from the .env file

const app = express(); // Initialize Express application
const PORT = process.env.PORT || 3004; // Set application port, fallback to 3004 if not specified

/**
 * Establish a connection to the database.
 * The "connectDB" method is shared across services and expects the service name for logging.
 */
connectDB("Address Service");

/**
 * Middleware to parse incoming JSON payloads.
 * Ensures the application can handle JSON data in requests.
 */
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Address Service is healthy" });
});

/**
 * Mount the Address routes.
 * Routes are prefixed with "/" and handle all address-related API endpoints.
 */
app.use("/", addressRoutes);

/**
 * Start the server.
 * Logs the URL where the service is accessible.
 */
app.listen(PORT, () => {
  console.log(`Address Service running on http://localhost:${PORT}`);
});