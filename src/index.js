// index.js
// This is the main entry point of our application
const express = require('express');
const models = require('./models');
require('dotenv').config();
const db = require('./db');
const { ApolloServer, gql } = require('apollo-server-express');
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;
const typeDefs = gql`
  type Query {
    hello: String
    notes: [Note!]!
    note(id: ID!): Note!
  }
  type Note {
    id: ID!
    content: String!
    author: String!
  }
  type Mutation {
    newNote(content: String!): Note!
  }
`;

const resolvers = {
  Query: {
    hello: () => 'hello graph ql',
    notes: async () => {
      return await models.Note.find();
    },
    note: (parent, args) => {
      return notes.find(note => note.id === args.id);
    }
  },
  Mutation: {
    newNote: async (parent, args) => {
      return await models.Note.create({
        content: args.content,
        author: 'Adam Scott'
      });
    }
  }
};

// mock data
let notes = [
  { id: '1', content: 'First note about graphql', author: 'Michael Scott' },
  {
    id: '2',
    content: 'I need it ASAP as soon as possible',
    author: 'Michael Scott'
  },
  { id: '3', content: 'Worlds greatest boss', author: 'Michael Scott' }
];
const app = express();

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app, path: '/api' });

db.connect(DB_HOST);

// app.get('/', (req, res) => res.send('react native 1'));

app.listen({ port }, () =>
  console.log(
    `graphql server running at http://localhost:${port}${server.graphqlPath}`
  )
);
