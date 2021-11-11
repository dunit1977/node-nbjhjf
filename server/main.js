import http from 'http';

import { HOSTNAME, PORT } from './support/constants.js';
import { createApolloServer } from './apollo.js';
import app from './express.js';

const httpServer = http.createServer(app);
const apolloServer = createApolloServer(httpServer);

await apolloServer.start();

apolloServer.applyMiddleware({ app });

httpServer.listen(PORT, () => {
  console.log(`Server listening on ${HOSTNAME}`);
  console.log(`🚀 Apollo server at ${HOSTNAME}${apolloServer.graphqlPath}`);
});
