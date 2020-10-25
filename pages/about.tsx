import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import MarketingFooter from '../components/MarketingFooter';
import fetchJson from '../lib/fetchJson';
import { Box, Card, Button } from 'theme-ui';
import AboutTray from '../components/AboutTray';

const AboutPage = () => {
  return (
    <Layout>
      <Card variant="shadowCard" mt={3}>
        {/* <Header /> */}
        <AboutTray />
      </Card>
      <MarketingFooter />
    </Layout>
  );
};

export default AboutPage;
