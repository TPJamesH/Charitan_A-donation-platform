const axios = require("axios");
const os = require("os");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const CONSUL_HTTP_ADDR = process.env.CONSUL_HTTP_ADDR || "http://localhost:8500";
const MICROSERVICES_IP_ADDRESS = process.env.MICROSERVICES_IP_ADDRESS;

// Services maaping
const services = [
  { name: "user-service", port: 3001 },
  { name: "donor-service", port: 3002 },
  { name: "charity-service", port: 3003 },
  { name: "address-service", port: 3004 },
  { name: "auth-service", port: 3010 },
  { name: "admin-service", port: 3006 },
];

// Register to consul
const registerService = async (name, port, address) => {
  const serviceDefinition = {
    Name: name,
    Address: address,
    Port: port,
    Check: {
      HTTP: `http://${address}:${port}/health`,
      Interval: "10s",
      Timeout: "5s",
    },
  };

  try {
    console.log(`Registering ${name} with Consul...`);
    await axios.put(
      `${CONSUL_HTTP_ADDR}/v1/agent/service/register`,
      serviceDefinition
    );
    console.log(`${name} registered successfully.`);
  } catch (error) {
    console.error(`Failed to register ${name} with Consul:`, error.message);
  }
};

const registerAllServices = async () => {
  for (const service of services) {
    await registerService(service.name, service.port, MICROSERVICES_IP_ADDRESS);
  }

  console.log("All services registered successfully.");
};

registerAllServices();
