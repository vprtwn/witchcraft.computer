import { Provider } from 'next-auth/client';
import { ThemeProvider, Card, Styled, Flex, Box, Link } from 'theme-ui';
import Head from 'next/head';
import theme from '../theme';
import { MDXProvider } from '@mdx-js/react';
import Layout from '../components/Layout';

const components = {
  wrapper: (props) => (
    <div>
      <Layout>
        <Card variant="shadowCard" mt={3}>
          <Flex>
            <Box>
              <Link href="/about" variant="nav">
                tray
              </Link>
            </Box>
            <Box flex="1 1 auto" mx={1}>
              /
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
            <link
              href="https://fonts.googleapis.com/css2?family=Recursive:CASL,CRSV,MONO@0.5,1,0.5&display=swap"
              rel="stylesheet"
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
