import { Provider } from 'next-auth/client';
import { ThemeProvider, Badge, Card, Styled, Flex, Box, Link } from 'theme-ui';
import Head from 'next/head';
import theme from '../theme';
import { MDXProvider } from '@mdx-js/react';
import Layout from '../components/Layout';
import TrayIcon from '../components/TrayIcon';
import '../styles.css';

const components = {
  wrapper: (props) => (
    <div>
      <TrayIcon />
      <Layout>
        <Card variant="aboutCard">
          <Flex>
            <Box>
              <Link href="/about" variant="nav">
                <Badge variant="outline">tray</Badge>
              </Link>
            </Box>
            <Box flex="1 1 auto" mx={1} sx={{ fontWeight: 'bold' }}>
              :
            </Box>
            <Box>
              <Link href="/policies" variant="nav">
                policies
              </Link>
            </Box>
          </Flex>
          <main {...props} />
        </Card>
      </Layout>
      <Box mb={5} />
    </div>
  ),
};

// @NOTE: using next-auth v3 beta
export default ({ Component, pageProps }) => {
  return (
    <Provider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <Styled.root>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            <link rel="icon" href="/favicon.png" />
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@xz/fonts@1/serve/inter.css" />
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@xz/fonts@1/serve/liberation-mono.min.css" />
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@xz/fonts@1/serve/mononoki.min.css" />
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@xz/fonts@1/serve/roboto-mono.min.css" />
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@xz/fonts@1/serve/source-code-pro.min.css" />
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@xz/fonts@1/serve/space-mono.min.css" />
            {/* <link
              href="https://fonts.googleapis.com/css2?family=Recursive:CASL,CRSV,MONO@0.5,1,0.5&display=swap"
              rel="stylesheet"
            /> */}
            <link href="https://fonts.googleapis.com/css2?family=Recursive:CRSV@0&display=swap" rel="stylesheet" />
          </Head>
          <MDXProvider components={components}>
            <Component {...pageProps} />
          </MDXProvider>
        </Styled.root>
      </ThemeProvider>
    </Provider>
  );
};
