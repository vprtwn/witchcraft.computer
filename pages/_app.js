import { Provider } from "next-auth/client";
import { ThemeProvider, Styled, Container } from "theme-ui";
import Head from "next/head";
import theme from "../theme";

// @NOTE: using next-auth v3 beta
export default ({ Component, pageProps }) => {
  return (
    <Provider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <Styled.root>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            <link rel="icon" href="/favicon.png" />
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/@xz/fonts@1/serve/inter.css"
            />
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/@xz/fonts@1/serve/hk-grotesk.min.css"
            />
            {/* Recursive font: sorta monospace but not, somewhat casual */}
            <link
              href="https://fonts.googleapis.com/css2?family=Recursive:CASL,CRSV,MONO@0.5,1,0.5&display=swap"
              rel="stylesheet"
            />
          </Head>
          <Component {...pageProps} />
        </Styled.root>
      </ThemeProvider>
    </Provider>
  );
};
