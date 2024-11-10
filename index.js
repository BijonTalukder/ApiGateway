// index.js
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { ApolloGateway } = require('@apollo/gateway');

(async () => {
  const app = express();

  // Set up Apollo Gateway
  const gateway = new ApolloGateway({
    serviceList: [
      { name: 'auth', url: 'http://localhost:4001/graphql' },
      { name: 'product', url: 'http://localhost:4002/graphql' },
      { name: 'order', url: 'http://localhost:4003/graphql' },
    ],
  });

  // Create the Apollo Server instance
  const server = new ApolloServer({
    gateway,
    subscriptions: false, // Disable subscriptions since Apollo Gateway does not support them
  });

  // Start the server and apply middleware
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  // Start the Express server
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Gateway running at http://localhost:4000/graphql`)
  );
})();
