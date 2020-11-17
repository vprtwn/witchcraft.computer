import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import AboutTray from '../components/AboutTray';
import TrayIcon from '../components/TrayIcon';
import SignInButton from '../components/SignInButton';
import InfoFooter from '../components/InfoFooter';
import UserListBlock from '../components/UserListBlock';
import { Card, Badge, Flex, Text, Link } from 'theme-ui';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/client';
import Head from 'next/head';

const IndexPage = () => {
  const [session, loading] = useSession();
  const signedIn = session && session.user.username;

  const title = 'welcome to tray';
  const description = 'a new way to share notes, links, and music.';

  return (
    <>
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
      <Layout>
        <TrayIcon />
        <Card variant="card_dotted_black">
          <Text variant="text_md_sans">
            welcome to <Badge variant="badge_outline">tray</Badge>
          </Text>
          <Text variant="text_md_sans">a new way to share notes, links, and music.</Text>
          <Text variant="text_md_sans" sx={{ textAlign: 'right', pt: 2 }}>
            <i> "outbox infinity" </i>
          </Text>
        </Card>
        {!signedIn && <SignInButton />}
        {signedIn && (
          <Flex sx={{ justifyContent: 'center', mt: 4, mb: 3 }}>
            <Text sx={{ pr: 1 }}>your tray ⮕ </Text>
            <Link href={`/@${session.user.username}`} variant="link_standard" sx={{ fontWeight: 'bold' }}>
              {`tray.club/@${session.user.username}`}
            </Link>
          </Flex>
        )}
        <InfoFooter />
        <UserListBlock />
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return { props: {} };
};

export default IndexPage;
