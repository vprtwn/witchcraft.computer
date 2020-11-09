import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import AboutTray from '../components/AboutTray';
import TrayIcon from '../components/TrayIcon';
import SignInButton from '../components/SignInButton';
import MarketingFooter from '../components/MarketingFooter';
import { Card } from 'theme-ui';
import { GetServerSideProps } from 'next';
import { signIn, getSession, useSession } from 'next-auth/client';
import { generateUserPath, validateStripeConnectParams } from '../lib/utils';

const IndexPage = () => {
  const [session, loading] = useSession();
  const signedIn = session && session.user.username;

  return (
    <Layout>
      <TrayIcon />
      <Card variant="aboutCard">
        <AboutTray />
      </Card>
      {!signedIn && <SignInButton />}
      <MarketingFooter />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const query = ctx.query;
  const code = query.code as string | null;
  const state = query.state as string | null;
  const session = await getSession(ctx);

  if (session && session.user.username && !validateStripeConnectParams(state, code)) {
    console.log('redirecting');
    const { res } = ctx;
    const path = generateUserPath(session.user.username);
    res.setHeader('location', path);
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }
  return { props: {} };
};

export default IndexPage;
