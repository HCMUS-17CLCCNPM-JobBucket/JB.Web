import { ApolloClient, InMemoryCache } from "@apollo/client";

export const jobApolloClient = new ApolloClient({
  uri: "https://jobbucket.azurewebsites.net/graphql/job",
  cache: new InMemoryCache(),
});
