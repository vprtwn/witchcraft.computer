import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import MarketingFooter from '../components/MarketingFooter';
import fetchJson from '../lib/fetchJson';
import { Box, Button } from 'theme-ui';
import AboutFlexjar from '../components/AboutFlexjar';

const AboutPage = () => {
  return (
    <Layout>
      <Header />
      <AboutFlexjar />
      <MarketingFooter />
    </Layout>
  );
};

export default AboutPage;
