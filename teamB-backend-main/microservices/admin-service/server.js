// server.js
const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./db/db");
const adminRoutes = require("./routes/admin.routes");

dotenv.config({ path: './.env' });

const app = express();
const PORT = process.env.PORT;

connectDB("Admin Service");

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Admin Service is healthy" });
});

app.use("/", adminRoutes);

app.listen(PORT, () => {
  console.log(`Admin Service running on http://localhost:${PORT}`);
});
