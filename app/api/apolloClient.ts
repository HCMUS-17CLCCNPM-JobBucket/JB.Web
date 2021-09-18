import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "https://jobbucket.azurewebsites.net/graphql",
  cache: new InMemoryCache(),
});
