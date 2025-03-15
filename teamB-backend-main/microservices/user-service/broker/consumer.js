const { Kafka, logLevel } = require("kafkajs");

// Kafka configuration
const CLIENT_ID = process.env.KAFKA_CLIENT_ID || "microservices";
const GROUP_ID = process.env.KAFKA_GROUP_ID || `${CLIENT_ID}-group`;
const BROKERS = process.env.KAFKA_BROKER
  ? process.env.KAFKA_BROKER.split(",")
  : ["localhost:9092"];
const FROM_BEGINNING = process.env.KAFKA_FROM_BEGINNING === "true";

const kafka = new Kafka({
  clientId: CLIENT_ID,
  brokers: BROKERS,
  logLevel: logLevel.INFO,
});

let consumer;

/**
 * Connects the consumer to Kafka.
 * @returns {Promise<Consumer>} - The connected consumer instance.
 */
const connectConsumer = async () => {
  if (consumer) {
    console.log("[Consumer] Already connected.");
    return consumer;
  }

  consumer = kafka.consumer({ groupId: GROUP_ID });

  try {
    await consumer.connect();
    console.log("[Consumer] Connected successfully.");
  } catch (error) {
    console.error("[Consumer] Error connecting:", error.message);
    throw error;
  }

  return consumer;
};

/**
 * Subscribes the consumer to topics and processes messages.
 * @param {Array<string>} topics - List of Kafka topics to subscribe to.
 * @param {Function} messageHandler - Function to handle incoming messages.
 */
const subscribe = async (topics, messageHandler) => {
  const consumer = await connectConsumer();

  try {
    for (const topic of topics) {
      await consumer.subscribe({ topic, fromBeginning: FROM_BEGINNING });
      console.log(`[Consumer] Subscribed to topic: ${topic}`);
    }

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const key = message.key?.toString();
          const value = message.value
            ? JSON.parse(message.value.toString())
            : null;

          console.info(
            `[Consumer] Message received from topic "${topic}" (partition ${partition}):`,
            { key, value }
          );

          if (value) {
            await messageHandler(value, topic);

            // Commit the offset manually
            if (message.offset !== undefined) {
              await consumer.commitOffsets([
                {
                  topic,
                  partition,
                  offset: (Number(message.offset) + 1).toString(),
                },
              ]);
              console.log(
                `[Consumer] Offset committed for partition ${partition}: ${
                  Number(message.offset) + 1
                }`
              );
            }
          } else {
            console.warn("[Consumer] Received empty message.");
          }
        } catch (error) {
          console.error("[Consumer] Error processing message:", error.message);
        }
      },
    });
  } catch (error) {
    console.error("[Consumer] Error during subscription:", error.message);
    throw error;
  }
};

/**
 * Disconnects the consumer from Kafka.
 */
const disconnectConsumer = async () => {
  if (consumer) {
    try {
      await consumer.disconnect();
      console.log("[Consumer] Disconnected successfully.");
    } catch (error) {
      console.error("[Consumer] Error disconnecting:", error.message);
    }
  }
};

/**
 * Sets up graceful shutdown hooks for the consumer.
 */
const setupShutdownHooks = () => {
  const shutdown = async () => {
    console.info("[Consumer] Shutting down...");
    await disconnectConsumer();
    process.exit(0);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
};

module.exports = {
  connectConsumer,
  subscribe,
  disconnectConsumer,
  setupShutdownHooks,
};
