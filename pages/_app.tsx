import "../styles/globals.scss";
import "rc-slider/assets/index.css";

import type { AppProps } from "next/app";
import Navbar from "app/components/organisms/Navbar";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "app/api/apolloClient";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Navbar />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
export default MyApp;
