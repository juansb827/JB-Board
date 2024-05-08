import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { loadFiles } from "@graphql-tools/load-files";
import http from "http";
import express from "express";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";
import { GqlContext } from "@/shared/types";
import { asyncLocalStorage } from "./asyncLocalStorage";

// The GraphQL schema
const typeDefs = await loadFiles("src/**/*.graphql");
const resolvers = await loadFiles("src/**/*.resolver.{js,ts}");
console.log(resolvers);

const app = express();

// const setContext = (_, __, next) => {
//   // asyncLocalStorage.enterWith({} as any);
//   // next();
//   asyncLocalStorage.run({} as unknown as any, () => next());
// };
const httpServer = http.createServer(app);
const server = new ApolloServer<GqlContext>({
  typeDefs,
  resolvers,

  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    // {
    //   async requestDidStart(ctx) {
    //     const store = {};
    //     asyncLocalStorage.enterWith(store);
    //     // context.userId = 'user123';
    //     console.log("REQUEST DID START", ctx);
    //     return {
    //       executionDidStart: (ctx) => {
    //         // asyncLocalStorage.enterWith({} as any);
    //         console.log("EXECUTION DID START", ctx.contextValue);
    //       },
    //     };
    //   },
    // },
  ],
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
    // setContext,
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        // const store = asyncLocalStorage.getStore();
        // if (!store) {
        //   throw new Error("Could not get AsyncLocalStorage");
        // }
        const dataLoaders: GqlContext["dataLoaders"] = {};
        const ctx: GqlContext = {
          user: { id: "1" },
          dataLoaders: dataLoaders,
          getOrCreateLoader: (name, createLoaderFn) => {
            dataLoaders[name] = dataLoaders[name] || createLoaderFn();
            return dataLoaders[name];
          },
        };
        // store.ctx = ctx;
        return ctx;
      },
    })
  );
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 http://localhost:4000/graphql`);
}
