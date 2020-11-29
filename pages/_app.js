import { Provider } from 'next-auth/client';
import { ThemeProvider, Badge, Card, Styled, Flex, Box, Link } from 'theme-ui';
import Head from 'next/head';
import theme from '../theme';
import { MDXProvider } from '@mdx-js/react';
import Layout from '../components/Layout';
import TrayIcon from '../components/TrayIcon';
import InfoFooter from '../components/InfoFooter';
import '../styles.css';
import React from 'react';
import { NextSeo } from 'next-seo';

// Markdown pages use this
const components = {
  wrapper: (props) => (
    <div>
      <TrayIcon />
      <Layout>
        <Card variant="card_dotted_black">
          <Flex>
            <Box>
              <Link variant="link_no_underline" href="/">
                <Badge variant="badge_outline">tray</Badge>
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

// Normal pages use this
const App = ({ Component, pageProps }) => {
  return (
    <Provider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <Styled.root>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            <link rel="icon" href="/favicon.png" />
            <link href="https://fonts.googleapis.com/css2?family=Recursive:CRSV@0&display=swap" rel="stylesheet" />
          </Head>
          <NextSeo
            title="Using More of Config"
            description="This example uses more of the available config options."
            canonical="https://www.canonical.ie/"
            openGraph={{
              url: 'https://www.url.ie/a',
              title: 'Open Graph Title',
              description: 'Open Graph Description',
              images: [
                {
                  url: 'tray-512.png',
                  width: 512,
                  height: 512,
                  alt: 'outbox infinity',
                },
              ],
              site_name: 'tray',
            }}
            twitter={{
              handle: '@handle',
              site: '@site',
              cardType: 'summary_large_image',
            }}
          />
          <MDXProvider components={components}>
            <Component {...pageProps} />
          </MDXProvider>
        </Styled.root>
      </ThemeProvider>
    </Provider>
  );
};
export default App;
