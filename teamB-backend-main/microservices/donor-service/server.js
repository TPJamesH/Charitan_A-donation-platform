const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./db/db"); // Database connection utility
const donorRoutes = require("./routes/donor.routes");
const { subscribe } = require("./broker/consumer");
const topics = require("./broker/topics");
const responseEmitters = require("./broker/responseEmitters");

// Initialize environment variables
dotenv.config({ path: "./.env" });

const app = express();
const PORT = process.env.PORT || 3002;

// Connect to MongoDB
connectDB("Donor Service");

// Middleware
app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Donor Service is healthy" });
});

// Mount donor routes
app.use("/", donorRoutes);

// Kafka Initialization
const startKafka = async () => {
  try {
    console.log("Initializing Kafka for Donor Service...");

    // Subscribe to topics with handlers
    await subscribe(
      [
        topics.DONOR_VALIDATION_RESULT,
        topics.GET_USER_EMAIL_RESULT,
        topics.RESULT_TOP_MONTHLY_USER,
      ],
      async (message, topic) => {
        console.log(
          `[DonorService] Message received from topic "${topic}":`,
          message
        );

        const { correlationId } = message;
        const topicEmitters = {
          [topics.DONOR_VALIDATION_RESULT]: responseEmitters.donorValidation,
          [topics.GET_USER_EMAIL_RESULT]: responseEmitters.donorGetUserEmail,
          [topics.RESULT_TOP_MONTHLY_USER]:
            responseEmitters.donorGetTopMonthlyUser,
        };

        const emitter = topicEmitters[topic];

        if (correlationId && emitter) {
          console.log(
            `[DonorService] Emitting event for correlationId "${correlationId}" on topic "${topic}"`
          );
          emitter.emit(correlationId, message);
        } else {
          console.warn(
            `[DonorService] Missing correlationId or uninitialized emitter for topic "${topic}"`
          );
        }
      }
    );

    console.log("Kafka initialized for Donor Service.");
  } catch (error) {
    console.error(
      "Failed to initialize Kafka for Donor Service:",
      error.message
    );
    process.exit(1);
  }
};

console.log("[Server] Response Emitters Initialized:", responseEmitters);

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down Donor Service...");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Received termination signal, shutting down...");
  process.exit(0);
});

// Start the Donor Service
app.listen(PORT, async () => {
  console.log(`Donor Service running on http://localhost:${PORT}`);
  await startKafka();
});
