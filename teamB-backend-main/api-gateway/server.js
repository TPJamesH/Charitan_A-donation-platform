const express = require("express"); // Import Express framework
const proxy = require("express-http-proxy"); // Middleware for proxying API requests
const dotenv = require("dotenv"); // Environment variable management
const axios = require("axios"); // HTTP client for Consul requests
const cors = require("cors");
dotenv.config({ path: "./.env" }); // Load environment variables from the .env file

const app = express();
const PORT = process.env.PORT || 3000;
const CONSUL_HTTP_ADDR =
  process.env.CONSUL_HTTP_ADDR || "http://localhost:8500";
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
// Function to fetch service address dynamically from Consul
const getServiceAddress = async (serviceName) => {
  try {
    const response = await axios.get(
      `${CONSUL_HTTP_ADDR}/v1/catalog/service/${serviceName}`
    );
    const service = response.data[0]; // Assuming the first registered instance is correct
    if (service) {
      const address = `${service.ServiceAddress}:${service.ServicePort}`;
      console.log(`Fetched address for ${serviceName}: ${address}`);
      return address;
    } else {
      throw new Error(`Service ${serviceName} not found in Consul`);
    }
  } catch (error) {
    console.error(`Error fetching ${serviceName} from Consul:`, error.message);
    throw error;
  }
};

// Middleware to create dynamic proxy for each service
const createDynamicProxy = (serviceName) => async (req, res, next) => {
  try {
    const serviceAddress = await getServiceAddress(serviceName);
    proxy(`http://${serviceAddress}`)(req, res, next);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Unable to fetch ${serviceName} from Consul` });
  }
};

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "API Gateway is healthy" });
});

// Define routes for each service using dynamic proxies
app.use("/api/users", createDynamicProxy("user-service"));
app.use("/api/donors", createDynamicProxy("donor-service"));
app.use("/api/charities", createDynamicProxy("charity-service"));
app.use("/api/addresses", createDynamicProxy("address-service"));
app.use("/api/auth", createDynamicProxy("auth-service"));
app.use("/api/admins", createDynamicProxy("admin-service"));

/**
 * Start the API Gateway server.
 */
app.listen(PORT, () => {
  console.log(`API Gateway running on http://localhost:${PORT}`);
});
