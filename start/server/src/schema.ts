import { gql } from "apollo-server-core";

const typeDefs = gql`
  # special types
  type Query {
    launches: [Launch]!
    launch(id: ID!): Launch
    me: User
  }
  type Mutation {
    bookTrip(launchId: ID!): TripUpdateResponse!
    cancelTrip(launchId: ID!): TripUpdateResponse!
    login(email: String!): User
  }
  # my schema goes here
  type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean
  }
  type User {
    id: ID!
    email: String!
    trips: [Launch]!
    token: String
  }
  type Mission {
    name: String!
    missionPatch(size: PatchSize): String
  }
  type Rocket {
    id: ID!
    name: String
    type: String
  }
  type TripUpdateResponse {
	  success: Boolean!
	  message: String
	  launches: [Launch]
  }
  # enums
  enum PatchSize {
    SMALL
    LARGE
  }
`;

export default typeDefs;
