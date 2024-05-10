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
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";
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
const schema = makeExecutableSchema({ typeDefs, resolvers });
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/subscriptions",
});
const serverCleanup = useServer(
  {
    schema,
    context: async (ctx, msg, args) => {
      console.log("CTX");
      // runs once for each client subscription
      return getWSDynamicContext(ctx, msg, args);
    },
    onConnect: (ctx) => {
      console.log("ON CONNECT");
    },
    onDisconnect: (ctx, code, reason) => {
      console.log("ON DISCONNECT", code, reason);
    },
  },
  wsServer
);

const apolloServer = new ApolloServer<GqlContext>({
  schema,
  plugins: [
    process.env.NODE_ENV === "production"
      ? ApolloServerPluginLandingPageProductionDefault({
          graphRef: "my-graph-id@my-graph-variant",
          footer: false,
        })
      : ApolloServerPluginLandingPageLocalDefault({
          footer: false,
          embed: {
            endpointIsEditable: true,
          },
        }),
    ApolloServerPluginDrainHttpServer({ httpServer }),
    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
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
  await apolloServer.start();
  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      //origin: "*",
      credentials: true,
      origin: ["http://localhost:3000"],
    }),
    express.json(),
    // setContext,
    expressMiddleware(apolloServer, {
      context: async ({ req, res }) => {
        // const store = asyncLocalStorage.getStore();
        // if (!store) {
        //   throw new Error("Could not get AsyncLocalStorage");
        // }
        // store.ctx = ctx;
        return getGQLContext();
      },
    })
  );
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 http://localhost:4000/graphql`);
}

// TODO: fix types
async function getWSDynamicContext(ctx: any, msg: any, args: any) {
  // ctx is the graphql-ws Context where connectionParams live
  if (ctx.connectionParams.authentication) {
    // const currentUser = await findUser(ctx.connectionParams.authentication);
    // return { currentUser };
  }
  // Otherwise let our resolvers know we don't have a current user
  return getGQLContext();
}

async function getGQLContext() {
  const dataLoaders: GqlContext["dataLoaders"] = {};
  const ctx: GqlContext = {
    user: { id: "1" },
    dataLoaders: dataLoaders,
    getOrCreateLoader: (name, createLoaderFn) => {
      dataLoaders[name] = dataLoaders[name] || createLoaderFn();
      return dataLoaders[name];
    },
  };
  return ctx;
}
