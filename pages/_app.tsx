import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Navbar from "app/components/organisms/Navbar";

import { Provider } from "react-redux";
import { store } from "app/redux/store";
import { GoogleAuthProvider } from "app/components/layouts/google-provider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleAuthProvider>
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <Navbar />
        <Component {...pageProps} />
        {/* </PersistGate> */}
      </Provider>
    </GoogleAuthProvider>
  );
}
export default MyApp;
