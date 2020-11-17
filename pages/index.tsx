import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import AboutTray from '../components/AboutTray';
import TrayIcon from '../components/TrayIcon';
import SignInButton from '../components/SignInButton';
import InfoFooter from '../components/InfoFooter';
import UserListBlock from '../components/UserListBlock';
import { Card, Textarea, Flex, Text, Link } from 'theme-ui';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/client';

const IndexPage = () => {
  const [session, loading] = useSession();
  const signedIn = session && session.user.username;

  return (
    <Layout>
      <TrayIcon />
      <Card variant="card_dotted_black">
        <AboutTray />
      </Card>
      {!signedIn && <SignInButton />}
      {signedIn && (
        <Flex sx={{ justifyContent: 'center', my: 3 }}>
          <Text sx={{ pr: 1 }}>your tray ⮕ </Text>
          <Link href={`/@${session.user.username}`} variant="link_standard" sx={{ fontWeight: 'bold' }}>
            {`tray.club/@${session.user.username}`}
          </Link>
        </Flex>
      )}
      <InfoFooter />
      <UserListBlock />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return { props: {} };
};

export default IndexPage;
