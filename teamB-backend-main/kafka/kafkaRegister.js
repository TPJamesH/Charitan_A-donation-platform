const axios = require('axios');
const os = require('os');
const dotenv = require("dotenv");
dotenv.config({ path: './.env' });

const CONSUL_HTTP_ADDR = process.env.CONSUL_HTTP_ADDR;
const SERVICE_NAME = process.env.SERVICE_NAME || 'kafka';
const SERVICE_PORT = process.env.SERVICE_PORT || 9092;

const getIPAddress = () => {
  const networkInterfaces = os.networkInterfaces();
  for (const interfaceName in networkInterfaces) {
    for (const iface of networkInterfaces[interfaceName]) {
      if (!iface.internal && iface.family === 'IPv4') {
        return iface.address;
      }
    }
  }
  return '127.0.0.1';
};

const registerKafkaWithConsul = async () => {
  const ipAddress = getIPAddress();
  const serviceDefinition = {
    Name: SERVICE_NAME,
    Address: ipAddress,
    Port: parseInt(SERVICE_PORT, 10),
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

// Run registration during backend startup
registerKafkaWithConsul();
