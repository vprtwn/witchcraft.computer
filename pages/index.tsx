import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import MarketingFooter from '../components/MarketingFooter';
import fetchJson from '../lib/fetchJson';
import { Box, Button } from 'theme-ui';
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
        window.location.assign(`${path}?v=settings`);
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
      <Header />
      <Box sx={{ bg: 'transparent', borderRadius: 4, py: 2, px: 3 }}>
        <Button
          onClick={() => signIn('twitter')}
          variant="small"
          sx={{
            bg: 'white',
          }}
        >
          <Box
            aria-hidden="true"
            sx={{
              display: 'inline-block',
              width: '1.2em',
              height: '1.2em',
              marginRight: '0.4em',
              verticalAlign: 'sub',
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z" />
            </svg>
          </Box>
          Sign in
        </Button>
      </Box>
      <Box></Box>
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
