import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { loadFiles } from "@graphql-tools/load-files";
// The GraphQL schema
const typeDefs = await loadFiles("src/**/*.graphql");
const resolvers = await loadFiles("src/**/*.resolver.{js,ts}");
console.log(resolvers);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export async function startServer() {
  const { url } = await startStandaloneServer(server);
  console.log(`🚀 Server ready at ${url}`);
}
