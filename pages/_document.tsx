/* eslint-disable @next/next/google-font-display */
import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            rel="stylesheet"
            as="style"
            crossOrigin="anonymous"
            href="https://fonts.googleapis.com/css?family=Nunito"
          />
          <link rel="icon" type="image/png" href="/logo.png" />
          <Script src="https://unpkg.com/@themesberg/flowbite@1.3.0/dist/datepicker.bundle.js"></Script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
