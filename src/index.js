// index.js
// This is the main entry point of our application
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const port = process.env.PORT || 4000;
const app = express();

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'hello graph ql'
  }
};

app.get('/', (req, res) => res.send('react native 1'));

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
