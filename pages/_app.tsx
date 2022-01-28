import { ApolloProvider } from "@apollo/react-hooks";
import apolloClient from "app/api/apolloClient";
import ToolbarBottom from "app/components/atoms/ToolbarBottom";
import AuthProvider from "app/components/layouts/AuthProvider";
import { GoogleAuthProvider } from "app/components/layouts/google-provider";
import Footer from "app/components/organisms/Footer";
import Navbar from "app/components/organisms/Navbar";
import { persistor, store } from "app/redux/store";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import "../styles/globals.scss";
import LoadingFullPage from "app/components/molecules/LoadingFullPage";

function MyApp({ Component, pageProps }: AppProps) {
  // const [loading, setLoading] = useState(false);
  const router = useRouter();
  // Router.events.on("routeChangeStart", (url) => {
  //   // if (router.pathname.includes("/chat") !== true) {
  //   setLoading(true);
  //   // }
  //   // NProgress.start();
  // });
  // Router.events.on("routeChangeComplete", () => setLoading(false));
  // Router.events.on("routeChangeError", () => setLoading(false));

  const listExclude = ["/chat"];
  return (
    <GoogleAuthProvider>
      <ApolloProvider client={apolloClient as any}>
        <Provider store={store}>
          <PersistGate loading={<LoadingFullPage />} persistor={persistor}>
            <AuthProvider>
              <ToastContainer limit={3} />
              {/* {loading && <LoadingTransition />} */}

              {!listExclude.includes(router.pathname) && <Navbar />}
              <Component {...pageProps} />
              <ToolbarBottom />
              {!listExclude.includes(router.pathname) && <Footer />}
            </AuthProvider>
          </PersistGate>
        </Provider>
      </ApolloProvider>
    </GoogleAuthProvider>
  );
}
export default MyApp;
