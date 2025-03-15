const { Kafka, logLevel, Partitioners } = require("kafkajs");
const { EventEmitter } = require("events");
const responseEmitters = require("./responseEmitters");

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

// Producer instance
let producer;

/**
 * Connects the producer to Kafka.
 * @returns {Promise<Producer>} - The connected producer instance.
 */
const connectProducer = async () => {
  if (producer) {
    console.log("[Producer] Already connected.");
    return producer;
  }

  producer = kafka.producer({
    createPartitioner: Partitioners.DefaultPartitioner,
  });

  await producer.connect();
  console.log("[Producer] Connected successfully.");
  return producer;
};

/**
 * Sends a message to a Kafka topic.
 * @param {Object} data - The message data.
 * @param {string} data.topic - The Kafka topic.
 * @param {string} data.event - The event key.
 * @param {Object} data.message - The message payload.
 */
const publish = async (data) => {
  const producer = await connectProducer();
  try {
    await producer.send({
      topic: data.topic,
      messages: [
        {
          key: data.event,
          value: JSON.stringify(data.message),
        },
      ],
    });
    console.log(`[Producer] Message published to topic "${data.topic}".`);
  } catch (error) {
    console.error("[Producer] Error publishing message:", error.message);
  }
};

/**
 * Sets up a listener for a specific Kafka response.
 * @param {string} topic - The Kafka topic to subscribe to.
 * @param {string} serviceType - The service type for the response emitter.
 */
const setupResponseListener = async (topic, serviceType) => {
  if (!responseEmitters[serviceType]) {
    responseEmitters[serviceType] = new EventEmitter();
  }

  console.log("[Producer] Accessing responseEmitters:", responseEmitters);

  const consumer = kafka.consumer({
    groupId: `${CLIENT_ID}-${serviceType}-response-group`,
  });

  await consumer.connect();
  console.log(`[Producer] Consumer connected for topic "${topic}".`);

  await consumer.subscribe({ topic, fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      try {
        const parsedMessage = JSON.parse(message.value.toString());
        const { correlationId } = parsedMessage;

        if (correlationId && responseEmitters[serviceType]) {
          console.log(
            `[Producer] Emitting response for correlationId "${correlationId}" on topic "${topic}".`
          );
          responseEmitters[serviceType].emit(correlationId, parsedMessage);
        } else {
          console.warn(
            `[Producer] Missing correlationId or uninitialized emitter for service "${serviceType}".`
          );
        }
      } catch (error) {
        console.error(
          `[Producer] Error processing response from topic "${topic}":`,
          error.message
        );
      }
    },
  });
};

/**
 * Waits for a response to a message published to Kafka.
 * @param {string} correlationId - The unique correlation ID for the request.
 * @param {string} serviceType - The service type associated with the response.
 * @param {number} [timeout=60000] - The timeout in milliseconds.
 * @returns {Promise<Object>} - The response message.
 */
const waitForResponse = (correlationId, serviceType, timeout = 60000) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      console.error(`[Producer] Timeout for correlationId "${correlationId}"`);
      responseEmitters[serviceType]?.removeAllListeners(correlationId);
      reject(
        new Error(
          `[waitForResponse] Timeout for correlationId "${correlationId}"`
        )
      );
    }, timeout);

    console.log(
      `[Producer] Waiting for response with correlationId "${correlationId}"`
    );
    responseEmitters[serviceType]?.once(correlationId, (message) => {
      console.log(
        `[Producer] Resolving waitForResponse for correlationId "${correlationId}"`
      );
      clearTimeout(timer);
      resolve(message);
    });
  });
};

/**
 * Disconnects the Kafka producer.
 */
const disconnectProducer = async () => {
  if (producer) {
    await producer.disconnect();
    console.log("[Producer] Disconnected.");
  }
};

module.exports = {
  connectProducer,
  publish,
  setupResponseListener,
  waitForResponse,
  disconnectProducer,
};
