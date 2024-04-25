import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { loadFiles } from "@graphql-tools/load-files";
import http from "http";
import express from "express";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";

// The GraphQL schema
const typeDefs = await loadFiles("src/**/*.graphql");
const resolvers = await loadFiles("src/**/*.resolver.{js,ts}");
console.log(resolvers);

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

export async function startServer() {
  await server.start();
  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      //origin: "*",
      credentials: true,
      origin: ["http://localhost:3000"],
    }),
    express.json(),
    expressMiddleware(server)
  );
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 http://localhost:4000/graphql`);
}
