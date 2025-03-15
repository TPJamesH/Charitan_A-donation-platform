const { createClient } = require('redis');
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const redisClient = createClient({
  username: process.env.REDIS_USERNAME2,
  password: process.env.REDIS_PASSWORD2,
  socket: {
    host: process.env.REDIS_HOST2,
    port: process.env.REDIS_PORT2
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
