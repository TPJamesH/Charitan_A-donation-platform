const { Kafka, logLevel } = require("kafkajs");

// Kafka configuration
const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID || "microservices",
  brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
  logLevel: logLevel.INFO,
});

// Export Kafka instance
module.exports = kafka;
