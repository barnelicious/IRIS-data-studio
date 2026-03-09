import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { getApolloServer } from "@/lib/graphql/schema";

const handler = async (req: Request) => {
  const server = await getApolloServer();
  const nextHandler = startServerAndCreateNextHandler(server);
  return nextHandler(req);
};

export { handler as GET, handler as POST };
