import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';

const tasks = [
  { id: '123', title: 'make coffee', complete: true },
  { id: '456', title: 'Order new mac book', complete: false },
];

const typeDefs = `
type Task {
  id: String!
  title: String!
  complete: Boolean!
}
  type Query {
    taskCount: Int!
    allTasks: [Task!]
  }
`;

const resolvers = {
  Query: {
    taskCount: () => tasks.length,
    allTasks: () => tasks,
  },
};

export function createApolloServer(httpServer) {
  return new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
}
