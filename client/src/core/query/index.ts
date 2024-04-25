import { QueryClient } from "@tanstack/react-query";
import { GraphQLClient } from "graphql-request";
import { auth } from "../auth/firebase";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;
export function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: always make a new query client for each request
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export const graphQLClient = new GraphQLClient(
  "http://localhost:4000/graphql",
  {
    credentials: `include`,
    mode: `cors`,
    headers: () => {
      console.log("B", auth.currentUser);
      auth.currentUser?.getIdToken().then((a) => console.log("A", a));
      return {
        Authorization: "asda",
      };
    },
  }
);
