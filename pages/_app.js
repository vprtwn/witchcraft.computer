import { Provider } from "next-auth/client";
import { ThemeProvider, Styled, Container } from "theme-ui";
import { MDXProvider } from "@mdx-js/react";
import Head from "next/head";
import theme from "../theme";

const components = {
  wrapper: (props) => (
    <div>
      <Container
        style={{ paddingLeft: "20px", paddingRight: "20px", paddingBottom: "20px", maxWidth: 700 }}
      >
        <main {...props} />
      </Container>
    </div>
  ),
};

// @NOTE: These options are new in v3 beta and are work in progress
export default ({ Component, pageProps }) => {
  return (
    <Provider
      // Provider options are not required but can be useful in situations where
      // you have a short session maxAge time. Shown here with default values.
      options={{
        // Client Max Age controls how often the useSession in the client should
        // contact the server to sync the session state. Value in seconds.
        // e.g.
        // * 0  - Disabled (always use cache value)
        // * 60 - Sync session state with server if it's older than 60 seconds
        clientMaxAge: 0,
        // Keep Alive tells windows / tabs that are signed in to keep sending
        // a keep alive request (which extends the current session expiry) to
        // prevent sessions in open windows from expiring. Value in seconds.
        //
        // Note: If a session has expired when keep alive is triggered, all open
        // windows / tabs will be updated to reflect the user is signed out.
        keepAlive: 0,
      }}
      session={pageProps.session}
    >
      <ThemeProvider theme={theme}>
        <Styled.root>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.png" />
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/@xz/fonts@1/serve/inter.css"
            />
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/@xz/fonts@1/serve/ibm-plex-sans.min.css"
            />
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/@xz/fonts@1/serve/ibm-plex-mono.min.css"
            />
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/@xz/fonts@1/serve/liberation-mono.min.css"
            />
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/@xz/fonts@1/serve/liberation-sans.min.css"
            />
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/@xz/fonts@1/serve/cascadia-code.min.css"
            />
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/@xz/fonts@1/serve/hk-grotesk.min.css"
            />
          </Head>
          <MDXProvider components={components}>
            <Component {...pageProps} />
          </MDXProvider>
        </Styled.root>
      </ThemeProvider>
    </Provider>
  );
};
