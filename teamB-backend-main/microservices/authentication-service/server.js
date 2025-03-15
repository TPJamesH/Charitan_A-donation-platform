const express = require("express");
const dataRouters = require("./routes/auth.js");

const db = require("./db/db.js");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3010;

const app = express();
db.connectDB();

app.use(express.json());
app.use(cookieParser());
app.use("/", dataRouters);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Authentication Service is healthy" });
});


app.get("/", (req, res) => {
  res.json({ message: "App is running on docker" });
});

app.listen(PORT, () => {
  console.log(`App running on ${PORT}`);
});
