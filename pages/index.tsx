import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import AboutTray from '../components/AboutTray';
import TrayIcon from '../components/TrayIcon';
import MarketingFooter from '../components/MarketingFooter';
import fetchJson from '../lib/fetchJson';
import { Box, Button, Card } from 'theme-ui';
import { GetServerSideProps } from 'next';
import Router, { useRouter } from 'next/router';
import { signIn, getSession, useSession } from 'next-auth/client';
import { generateUserPath, validateStripeConnectParams } from '../lib/utils';

const IndexPage = () => {
  const {
    query: { code, state },
  } = useRouter();

  useEffect(() => {
    const connectStripe = async function () {
      const body = { code: code, state: state };
      try {
        await fetchJson('/api/connect_stripe', {
          method: 'POST',
          body: JSON.stringify(body),
        });
        const path = generateUserPath(state as string);
        window.location.assign(`${path}`);
      } catch (e) {
        return { props: { error: e.message } };
      }
    };
    if (validateStripeConnectParams(state, code)) {
      connectStripe();
    }
  }, [code, state]);

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
    return;
  }
  return { props: {} };
};

export default IndexPage;
