import { Provider } from 'next-auth/client';
import { ThemeProvider, Badge, Card, Styled, Flex, Box, Link } from 'theme-ui';
import Head from 'next/head';
import theme from '../theme';
import { MDXProvider } from '@mdx-js/react';
import Layout from '../components/Layout';
import TrayIcon from '../components/TrayIcon';
import InfoFooter from '../components/InfoFooter';
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
          </Flex>
          <main {...props} />
        </Card>
      </Layout>
      <Box mb={3} />
      <InfoFooter />
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
