import LoadingTransition from "app/components/atoms/LoadingTransition";
import ToolbarBottom from "app/components/atoms/ToolbarBottom";
import AuthProvider from "app/components/layouts/AuthProvider";
import { GoogleAuthProvider } from "app/components/layouts/google-provider";
import Footer from "app/components/organisms/Footer";
import Navbar from "app/components/organisms/Navbar";
import { persistor, store } from "app/redux/store";

import type { AppProps } from "next/app";
import Router, { useRouter } from "next/router";
import { useState } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";

import "../styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  Router.events.on("routeChangeStart", (url) => {
    // if (router.pathname.includes("/chat") !== true) {
    setLoading(true);
    // }
    // NProgress.start();
  });
  Router.events.on("routeChangeComplete", () => setLoading(false));
  Router.events.on("routeChangeError", () => setLoading(false));

  const listExclude = ["/chat"];
  return (
    <GoogleAuthProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider>
            <ToastContainer />
            {loading && <LoadingTransition />}

            {!listExclude.includes(router.pathname) && <Navbar />}
            <Component {...pageProps} />
            <ToolbarBottom />
            {!listExclude.includes(router.pathname) && <Footer />}
          </AuthProvider>
        </PersistGate>
      </Provider>
    </GoogleAuthProvider>
  );
}
export default MyApp;
