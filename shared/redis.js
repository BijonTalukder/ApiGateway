const { createClient } = require('redis');

// Create a new Redis client
let redisClient = createClient({
  url: 'redis://localhost:6379',  // URL for Redis connection
});

// Event handler for errors
redisClient.on('error', (err) => {
  console.log('Redis Client Error:', err);  // Log any connection error
});

// Event handler for successful connection
redisClient.on('connect', () => {
  console.log('Connected to Redis');  // Log when connection is established
});

// Connect function to connect to Redis
const connect = async () => {
  try {
    await redisClient.connect();  // Await the connection to Redis
    console.log('Redis client connected successfully!');
  } catch (err) {
    console.error('Failed to connect to Redis:', err);  // Log connection failure
  }
};

// Export the client and connect function to use them elsewhere
module.exports = {
  redisClient,
  connect,
};
