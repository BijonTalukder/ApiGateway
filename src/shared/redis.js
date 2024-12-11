const { createClient } = require('redis');

// Create a new Redis client
let redisClient = createClient({
  url: 'redis://localhost:6379',  // URL for Redis connection
});

const redisPubClient = createClient({
  url: 'redis://localhost:6379'
})
const redisSubClient = createClient({
  url: 'redis://localhost:6379'
})

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
    await redisPubClient.connect();
    await redisSubClient.connect();


    console.log('Redis client connected successfully!');
  } catch (err) {
    console.error('Failed to connect to Redis:', err);  // Log connection failure
  }
};
const set = async(key,value,options)=>{
  await redisClient.set(key,value,options)

}
const get=async(key)=>{
  return await redisClient.get(key)
}

const del=async(key)=>{
 await redisClient.del(key)
}

const setAccessToken =async (userId,token)=>{
   const key = `access-token:${userId}`
   await redisClient.set(key,token,{EX:846000})
}

const getAccessToken =async (userId)=>{
  const key = `access-token:${userId}`
  return await redisClient.get(key)
}
const delAccessToken =async (userId)=>{
  const key = `access-token:${userId}`
  return await redisClient.del(key)
}
const disconnect = async()=>{
  await redisClient.quit();
  await  redisPubClient.quit();
  await redisSubClient.quit();
}

// Export the client and connect function to use them elsewhere
module.exports = {
  redisClient,
  connect,
  publish:redisPubClient.publish.bind(redisPubClient)
,
  subscribe:redisPubClient.publish.bind(redisSubClient)

};
