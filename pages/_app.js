import { ThemeProvider, Badge, Card, Styled, Flex, Box, Link } from 'theme-ui';
import Head from 'next/head';
import theme from '../theme';
import { MDXProvider } from '@mdx-js/react';
import Layout from '../components/Layout';
import PageFooter from '../components/PageFooter';
import '../styles.css';
import React from 'react';
import { DefaultSeo, NextSeo } from 'next-seo';

const title = '✧ witchcraft.computer ✧';
const description = 'tech themed tarot deck';

// Markdown pages use this
const components = {
  wrapper: (props) => (
    <div style={{}}>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          url: 'https://witchcraft.computer',
          title: title,
          description: description,
          images: [
            {
              url: 'https://witchcraft.computer/tray-512.png',
              width: 512,
              height: 512,
              alt: title,
            },
          ],
          site_name: 'witchcraft.computer',
        }}
      />
      <Layout>
        <Card variant="card_info" sx={{ px: 3, my: 4, mx: 0, cursor: 'auto' }}>
          <Flex></Flex>
          <main {...props} />
        </Card>
      </Layout>
      <Box mb={3} />
      <PageFooter />
    </div>
  ),
};

// Normal pages use this
const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Styled.root>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
          <link rel="icon" href="/favicon.png" />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@xz/fonts@1/serve/roboto-slab.min.css" />
        </Head>
        <DefaultSeo
          title={title}
          description={description}
          openGraph={{
            url: 'https://witchcraft.computer',
            title: { title },
            description: { description },
            images: [
              {
                url: 'https://witchcraft.computer/icon-512.png',
                width: 512,
                height: 512,
                alt: 'witchcraft.computer',
              },
            ],
          }}
        />
        <MDXProvider components={components}>
          <Component {...pageProps} />
        </MDXProvider>
      </Styled.root>
    </ThemeProvider>
  );
};
export default App;
