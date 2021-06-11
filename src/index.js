// index.js
// This is the main entry point of our application
const express = require('express');
const models = require('./models');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('./db');
const { ApolloServer } = require('apollo-server-express');
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization;
    const user = getUser(token);
    console.log(user);
    return { models, user };
  }
});

// get the user info from a JWT
const getUser = token => {
  if (token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      throw new Error('Session invalid');
    }
  }
};

server.applyMiddleware({ app, path: '/api' });

db.connect(DB_HOST);

// app.get('/', (req, res) => res.send('react native 1'));

app.listen({ port }, () =>
  console.log(
    `graphql server running at http://localhost:${port}${server.graphqlPath}`
  )
);
