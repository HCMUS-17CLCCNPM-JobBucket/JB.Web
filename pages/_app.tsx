import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Navbar from "app/components/organisms/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}
export default MyApp;
