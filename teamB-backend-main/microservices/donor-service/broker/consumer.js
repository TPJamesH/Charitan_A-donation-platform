const { Kafka, logLevel } = require("kafkajs");

// Kafka configuration
const CLIENT_ID = process.env.KAFKA_CLIENT_ID || "microservices";
const BROKERS = process.env.KAFKA_BROKER
  ? process.env.KAFKA_BROKER.split(",")
  : ["localhost:9092"];

// Kafka instance
const kafka = new Kafka({
  clientId: CLIENT_ID,
  brokers: BROKERS,
  logLevel: logLevel.WARN,
});

/**
 * Connects a Kafka consumer to a specified topic.
 * @param {string[]} topics - The list of topics to subscribe to.
 * @param {Function} messageHandler - The function to handle incoming messages.
 */
const subscribe = async (topics, messageHandler) => {
  const consumer = kafka.consumer({
    groupId: `${CLIENT_ID}-donor-service-group`,
  });

  try {
    await consumer.connect();
    console.log("[Consumer] Connected successfully.");

    for (const topic of topics) {
      await consumer.subscribe({ topic, fromBeginning: false });
      console.log(`[Consumer] Subscribed to topic: "${topic}"`);
    }

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const key = message.key.toString();
          const value = JSON.parse(message.value.toString());

          console.log(
            `[Consumer] Message received from topic "${topic}" (partition ${partition}):`,
            { key, value }
          );

          await messageHandler(value, topic);

          console.log(
            `[Consumer] Processed message from topic "${topic}" with key "${key}".`
          );
        } catch (error) {
          console.error(
            `[Consumer] Error processing message from topic "${topic}":`,
            error.message
          );
        }
      },
    });

    console.log("[Consumer] Listening for messages...");
  } catch (error) {
    console.error("[Consumer] Failed to initialize:", error.message);
  }
};

/**
 * Disconnects the Kafka consumer.
 */
const disconnectConsumer = async () => {
  try {
    await consumer.disconnect();
    console.log("[Consumer] Disconnected successfully.");
  } catch (error) {
    console.error("[Consumer] Error during disconnection:", error.message);
  }
};

module.exports = {
  subscribe,
  disconnectConsumer,
};
