const { createClient } = require('redis');
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const redisClient = createClient({
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }
});

redisClient.on('error', err => console.log('Redis Client Error', err));

(async () => {
  try {
    await redisClient.connect();
    console.log('Connected to Redis successfully');
  } catch (err) {
    console.error('Error connecting to Redis:', err);
  }
})();

module.exports = { redisClient };
