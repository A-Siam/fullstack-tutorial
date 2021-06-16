import { ApolloServer } from "apollo-server";
import LaunchAPI from "./datasources/launch";
import UserAPI from "./datasources/user";
import { createStore } from "./utils";
import typeDefs from "./schema";
import resolvers from "./resolvers";

const store = createStore();

const server = new ApolloServer({
  typeDefs,
  dataSources: () => {
    return {
      launchAPI: new LaunchAPI(),
      userAPI: new UserAPI({ store }),
    };
  },
  resolvers
});

server.listen(5656, () => {
  console.log("-------[SERVER STARTED]-------");
  console.log("Listening on:\t5656");
});
