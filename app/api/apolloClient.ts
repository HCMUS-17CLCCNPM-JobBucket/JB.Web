import { split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { ApolloClient } from "apollo-client";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { InMemoryCache } from "apollo-boost";

const wsLink = process.browser
  ? new WebSocketLink({
      // if you instantiate in the server, the error will be thrown
      uri: `wss://api.jobbucket.xyz/graphql`,
      options: {
        reconnect: true,
      },
    })
  : null;

const httplink = new HttpLink({
  uri: "https://api.jobbucket.xyz/graphql",
  credentials: "same-origin",
});

const link = process.browser
  ? split(
      //only create the split in the browser
      // split based on operation type
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink,
      httplink
    )
  : httplink;

// const wsLink = new WebSocketLink({
//   uri: `ws://api.jobbucket.xyz/graphql`,
//   options: {
//     reconnect: true,
//   },
// });

// const httpLink = new HttpLink({
//   uri: "http://api.jobbucket.xyz/graphql",
// });

// const link = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === "OperationDefinition" &&
//       definition.operation === "subscription"
//     );
//   },
//   wsLink,
//   httpLink
// );

export default new ApolloClient({
  cache: new InMemoryCache(),
  link,
});
