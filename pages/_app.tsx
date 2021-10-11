import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Navbar from "app/components/organisms/Navbar";

import { Provider } from "react-redux";
import { persistor, store } from "app/redux/store";
import { GoogleAuthProvider } from "app/components/layouts/google-provider";
import Router, { useRouter } from "next/router";
import { useState } from "react";
import LoadingTransition from "app/components/atoms/Loading";
import { PersistGate } from "redux-persist/integration/react";
import router from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  // const router = useRouter();
  const [loading, setLoading] = useState(false);

  Router.events.on("routeChangeStart", (url) => {
    // if (router.pathname.includes("/chat") !== true) {
    setLoading(true);
    // }
    // NProgress.start();
  });
  Router.events.on("routeChangeComplete", () => setLoading(false));
  Router.events.on("routeChangeError", () => setLoading(false));

  return (
    <GoogleAuthProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {loading && <LoadingTransition />}

          <Navbar />
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </GoogleAuthProvider>
  );
}
export default MyApp;
