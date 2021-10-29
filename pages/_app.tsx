import LoadingTransition from "app/components/atoms/LoadingTransition";
import Alerts from "app/components/atoms/notification/alerts";
import AuthProvider from "app/components/layouts/AuthProvider";
import { GoogleAuthProvider } from "app/components/layouts/google-provider";
import Footer from "app/components/organisms/Footer";
import Navbar from "app/components/organisms/Navbar";
import { persistor, store } from "app/redux/store";
import helper from "app/utils/helper";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
import type { AppProps } from "next/app";
import Router from "next/router";
import { useRef, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  const handleScrollToTop = () => helper.scrollToTop();
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
          <AuthProvider>
            <Alerts />
            {loading && <LoadingTransition />}

            <Navbar />
            <Component {...pageProps} />
            <button
              onClick={handleScrollToTop}
              className="fixed bottom-6 right-6 p-2 rounded-full border border-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>
            <Footer />
          </AuthProvider>
        </PersistGate>
      </Provider>
    </GoogleAuthProvider>
  );
}
export default MyApp;
