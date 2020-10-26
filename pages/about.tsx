import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import MarketingFooter from '../components/MarketingFooter';
import fetchJson from '../lib/fetchJson';
import { Box, Card, Flex } from 'theme-ui';
import AboutTray from '../components/AboutTray';

const AboutPage = () => {
  return (
    <Layout>
      <Flex sx={{ pt: 3, justifyContent: 'center' }}>
        <svg width="30" height="26" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.23913 0H25.2228L30 17.55H0L4.23913 0Z" fill="black" />
          <path d="M6.34449 1.94995H23.2227L27.0652 17.55H2.93475L6.34449 1.94995Z" fill="white" />
          <path d="M0 17.55H30V22C30 24.2092 28.2091 26 26 26H4C1.79086 26 0 24.2092 0 22V17.55Z" fill="black" />
          <circle cx="15" cy="15" r="5" fill="white" />
        </svg>
      </Flex>
      <Card variant="shadowCard" mt={3}>
        {/* <Header /> */}
        <AboutTray />
      </Card>
      <MarketingFooter />
    </Layout>
  );
};

export default AboutPage;
