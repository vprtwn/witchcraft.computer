import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import MarketingFooter from '../components/MarketingFooter';
import fetchJson from '../lib/fetchJson';
import { Box, Card, Flex, Link } from 'theme-ui';
import AboutTray from '../components/AboutTray';
import TrayIcon from '../components/TrayIcon';

const AboutPage = () => {
  return (
    <Layout>
      <TrayIcon />
      <Card variant="shadowCard">
        <AboutTray />
      </Card>
      <MarketingFooter />
    </Layout>
  );
};

export default AboutPage;
