const express = require("express");
const app = express();
const { ApolloServer } = require("apollo-server-express");
const path = require("path");

require("dotenv").config();

const PORT = process.env.PORT || 4000;
const { dbConnection } = require("./helpers");

// Database Connection
dbConnection();

const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");

const { loadFilesSync } = require("@graphql-tools/load-files");

// typeDefs
const typeDefs = mergeTypeDefs(
  loadFilesSync(path.join(__dirname, "./typeDefs"))
);

// resolvers
const resolvers = mergeResolvers(
  loadFilesSync(path.join(__dirname, "./resolvers"))
);

// graphql server
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});

// applyMiddleware method connects ApolloServer to a specific HTTP framework ie: express
apolloServer.applyMiddleware({ app });

app.get("/", (_, res) => {
  res.redirect("/graphql");
});

app.listen(PORT, () => {
  console.log(`Server started at: ${PORT}${apolloServer.graphqlPath}`);
});
