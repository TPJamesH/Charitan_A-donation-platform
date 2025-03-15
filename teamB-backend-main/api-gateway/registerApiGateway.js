const axios = require("axios");
const os = require("os");

// Environment variables
const CONSUL_HTTP_ADDR = process.env.CONSUL_HTTP_ADDR || "http://localhost:8500";
const SERVICE_NAME = process.env.API_GATEWAY_SERVICE_NAME || "api-gateway";
const SERVICE_PORT = process.env.API_GATEWAY_PORT || 3000;

// Get the IP address of the host/container
const getIPAddress = () => {
  const networkInterfaces = os.networkInterfaces();
  for (const interfaceName in networkInterfaces) {
    for (const iface of networkInterfaces[interfaceName]) {
      if (!iface.internal && iface.family === "IPv4") {
        return iface.address;
      }
    }
  }
  return "127.0.0.1";
};

// Register API Gateway with Consul
const registerApiGateway = async () => {
  const ipAddress = getIPAddress();
  const serviceDefinition = {
    Name: SERVICE_NAME,
    Address: ipAddress,
    Port: parseInt(SERVICE_PORT, 10),
    Check: {
      HTTP: `http://${ipAddress}:${SERVICE_PORT}/health`,
      Interval: "10s",
      Timeout: "5s",
    },
  };

  try {
    console.log(`Registering ${SERVICE_NAME} with Consul...`);
    await axios.put(`${CONSUL_HTTP_ADDR}/v1/agent/service/register`, serviceDefinition);
    console.log(`${SERVICE_NAME} registered successfully.`);
  } catch (error) {
    console.error(`Failed to register ${SERVICE_NAME} with Consul:`, error.message);
    process.exit(1);
  }
};

// Execute registration
registerApiGateway();
