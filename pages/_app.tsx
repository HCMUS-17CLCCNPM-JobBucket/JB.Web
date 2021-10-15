import LoadingTransition from "app/components/atoms/Loading";
import { GoogleAuthProvider } from "app/components/layouts/google-provider";
import Footer from "app/components/organisms/Footer";
import Navbar from "app/components/organisms/Navbar";
import { persistor, store } from "app/redux/store";
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import type { AppProps } from "next/app";
import Router from "next/router";
import { useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "../styles/globals.scss";

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

          <Footer />
        </PersistGate>
      </Provider>
    </GoogleAuthProvider>
  );
}
export default MyApp;
