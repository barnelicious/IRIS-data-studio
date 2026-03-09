import { ApolloServer } from "@apollo/server";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

let apolloServer: ApolloServer | null = null;

export async function getApolloServer(): Promise<ApolloServer> {
  if (!apolloServer) {
    apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
    });
    await apolloServer.start();
  }
  return apolloServer;
}
