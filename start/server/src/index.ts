import { ApolloServer } from "apollo-server";

import typeDefs from "./schema";

const server = new ApolloServer({
  typeDefs,
});

server.listen(5656, () => {
  console.log("-------[SERVER STARTED]-------");
  console.log("Listening on:\t5656");
});
