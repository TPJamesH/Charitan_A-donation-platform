const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./db/db");
const charityRoutes = require("./routes/charity.routes");
const { subscribe } = require("./broker/consumer");
const { setupResponseListener } = require("./broker/producer");
const topics = require("./broker/topics");

dotenv.config({ path: "./.env" });

const app = express();
const PORT = process.env.PORT || 3003;

// Connect to MongoDB
connectDB("Charity Service");

// Middleware
app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Charity Service is healthy" });
});


// Mount charity routes
app.use("/", charityRoutes);

// Kafka Initialization
const startKafka = async () => {
  try {
    console.log("Initializing Kafka for Charity Service...");

    // Subscribe to relevant topics
    const topicHandlers = {
      [topics.CHARITY_VALIDATION_RESULT]: (message) =>
        console.log("[CharityService] Received validation result:", message),
    };

    await subscribe(Object.keys(topicHandlers), async (message, topic) => {
      if (topicHandlers[topic]) {
        await topicHandlers[topic](message);
      } else {
        console.warn(`[CharityService] No handler for topic "${topic}"`);
      }
    });

    // Setup response listener for validation results
    await setupResponseListener(
      topics.CHARITY_VALIDATION_RESULT,
      "charityValidation"
    );

    console.log("Kafka initialized for Charity Service.");
  } catch (error) {
    console.error("Failed to initialize Kafka for Charity Service:", error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down Charity Service...");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Received termination signal, shutting down...");
  process.exit(0);
});

// Start the Charity Service
app.listen(PORT, async () => {
  console.log(`Charity Service running on http://localhost:${PORT}`);
  await startKafka();
});
