import express from "express";
import { ApolloServer } from "apollo-server-express";
import path from "path";
import dotenv from "dotenv";

import { dbConnection } from "./helpers";

const PORT = process.env.PORT || 4000;
const app = express();
dotenv.config();

// Database Connection
dbConnection();

import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";

import { loadFilesSync } from "@graphql-tools/load-files";

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
