// index.js
const express = require('express');
const { redisClient } = require('./shared/redis');
const { route } = require('./src/routes/routes');

async function main() {
  const app = express();

  try {
    // Connect to Redis
    await redisClient.connect();
    console.log('Connected to Redis');

    // Middleware
    app.use(express.json());

    app.use("/api/v1/",route);

    // Sample endpoint
    app.get('/', (req, res) => {
      res.send('Server is running!');
    });

    // Example Redis route
    app.post('/cache', async (req, res) => {
      const { key, value } = req.body;
      if (!key || !value) {
        return res.status(400).json({ error: 'Key and value are required' });
      }

      try {
        await redisClient.set(key, value);
        res.status(200).json({ message: `Data cached successfully for key: ${key}` });
      } catch (err) {
        console.error('Error caching data:', err);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Graceful shutdown setup
    const PORT = 5000;
    const server = app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

    // Graceful shutdown handler
    const exitHandler = () => {
      console.log('Shutting down server...');
      if (server) {
        server.close(() => {
          console.log('HTTP server closed');
          redisClient.quit();
          process.exit(0);
        });
      } else {
        redisClient.quit();
        process.exit(0);
      }
    };

    process.on('SIGINT', exitHandler);
    process.on('SIGTERM', exitHandler);
    process.on('uncaughtException', (err) => {
      console.error('Uncaught Exception:', err);
      exitHandler();
    });
  } catch (error) {
    console.error('Error starting the server:', error);
    redisClient.quit();
    process.exit(1);
  }
}

main();
