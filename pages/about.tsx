import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import MarketingFooter from '../components/MarketingFooter';
import fetchJson from '../lib/fetchJson';
import { Text, Card, Flex, Link } from 'theme-ui';
import AboutTray from '../components/AboutTray';
import TrayIcon from '../components/TrayIcon';
import { useSession } from 'next-auth/client';
import SignInButton from '../components/SignInButton';

const AboutPage = (props) => {
  const [session, loading] = useSession();
  const signedIn = session && session.user.username;

  return (
    <Layout>
      <TrayIcon />
      <Card variant="aboutCard">
        <AboutTray />
      </Card>
      {!signedIn && <SignInButton />}
      {signedIn && (
        <Flex sx={{ justifyContent: 'center', mt: 3 }}>
          <Text sx={{ pr: 1 }}>Your tray ➜</Text>
          <Link href={`/@${session.user.username}`} variant="primary" sx={{ fontWeight: 'bold' }}>
            {`tray.club/@${session.user.username}`}
          </Link>
        </Flex>
      )}
      <MarketingFooter />
    </Layout>
  );
};
export default AboutPage;
