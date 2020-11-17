import { Provider } from 'next-auth/client';
import { ThemeProvider, Badge, Card, Styled, Flex, Box, Link } from 'theme-ui';
import Head from 'next/head';
import theme from '../theme';
import { MDXProvider } from '@mdx-js/react';
import Layout from '../components/Layout';
import TrayIcon from '../components/TrayIcon';
import InfoFooter from '../components/InfoFooter';
import '../styles.css';

const title = 'tray – info';
const description = 'policies • faq';

const components = {
  wrapper: (props) => (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Head>
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

// @NOTE: using next-auth v3 beta
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
          <MDXProvider components={components}>
            <Component {...pageProps} />
          </MDXProvider>
        </Styled.root>
      </ThemeProvider>
    </Provider>
  );
};
export default App;
