const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { connectDB } = require("./db/db"); // Database connection utility
const userRoutes = require("./routes/user.routes");
const { subscribe } = require("./broker/consumer");
const UserService = require("./service/user.service");
const topics = require("./broker/topics");

dotenv.config({ path: "./.env" });

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB("User Service");

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // React app URL
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "User Service is healthy" });
});

// Mount routes
app.use("/", userRoutes);

// Kafka Handlers
const kafkaHandlers = {
  [topics.DONOR_USER_VALIDATE]: UserService.handleUserValidation,
  [topics.CHARITY_USER_VALIDATE]: UserService.handleUserValidation,
  [topics.GET_USER_EMAIL]: UserService.handleFetchEmail,
  [topics.GET_TOP_MONTHLY_USER]: UserService.handleGetTopMonthlyUsers,
};

// Kafka Initialization
const startKafka = async () => {
  try {
    console.log("[Server] Initializing Kafka...");

    // Subscribe to required topics and handle messages dynamically
    await subscribe(Object.keys(kafkaHandlers), async (message, topic) => {
      if (kafkaHandlers[topic]) {
        await kafkaHandlers[topic](message, topic);
      } else {
        console.warn(`[Server] No handler for topic "${topic}"`);
      }
    });

    console.log("[Server] Kafka initialized successfully.");
  } catch (error) {
    console.error("[Server] Failed to initialize Kafka:", error.message);
    process.exit(1);
  }
};

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("[Server] Shutting down User Service...");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("[Server] Received termination signal, shutting down...");
  process.exit(0);
});

// Start the server
app.listen(PORT, async () => {
  console.log(`[Server] User Service running on http://localhost:${PORT}`);
  await startKafka();
});
