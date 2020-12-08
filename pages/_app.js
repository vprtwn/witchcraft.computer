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
import { DefaultSeo, NextSeo } from 'next-seo';

// Markdown pages use this
const components = {
  wrapper: (props) => (
    <div>
      <NextSeo
        title="about tray"
        description="FAQ, terms of service, privacy policy, etc"
        openGraph={{
          url: 'https://tray.club',
          title: 'about tray',
          description: 'FAQ, terms of service, privacy policy, etc',
          images: [
            {
              url: 'https://tray.club/tray-512.png',
              width: 512,
              height: 512,
              alt: 'outbox infinity',
            },
          ],
          site_name: 'tray',
        }}
        twitter={{
          handle: '@trayClub',
          site: '@trayClub',
          cardType: 'summary_large_image',
        }}
      />
      <TrayIcon />
      <Layout>
        <Card variant="card_block_link" sx={{ px: 3, py: 2 }}>
          <Flex>
            <Box sx={{ pt: 2 }}>
              <Link variant="link_no_underline" href="/">
                <Badge variant="badge_tray">tray</Badge>
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
          <DefaultSeo
            title="tray"
            description="a space to share notes and cool links"
            openGraph={{
              url: 'https://tray.club',
              title: 'tray',
              description: 'a space to share notes and cool links',
              images: [
                {
                  url: 'https://tray.club/tray-512.png',
                  width: 512,
                  height: 512,
                  alt: 'outbox infinity',
                },
              ],
              site_name: 'tray',
            }}
            twitter={{
              handle: '@trayClub',
              site: '@trayClub',
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
