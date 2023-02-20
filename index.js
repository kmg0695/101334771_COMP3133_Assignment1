import express from "express";
import mongoose from "mongoose";
import pkg from "body-parser";
import cors from "cors";

const { json } = pkg;

//import typedefs and resolvers
import { typeDefs as _typeDefs } from "./schema.js";
import { resolvers as _resolvers } from "./resolvers.js";

//import ApolloServer
import { ApolloServer } from "apollo-server-express";

//Store sensitive information to env variables
import * as dotenv from "dotenv";
dotenv.config();

mongoose
  .set("strictQuery", true)
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((success) => {
    console.log("Success Mongodb connection");
  })
  .catch((err) => {
    console.log(err);
  });

//Define Apollo Server
const server = new ApolloServer({
  typeDefs: _typeDefs,
  resolvers: _resolvers,
});

//Define Express Server
const app = express();
app.use(json());
app.use("*", cors());

//Add Express app as middleware to Apollo Server
await server.start();
server.applyMiddleware({ app });

//Start listen
app.listen({ port: process.env.PORT }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
  )
);
