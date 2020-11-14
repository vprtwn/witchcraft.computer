import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import AboutTray from '../components/AboutTray';
import TrayIcon from '../components/TrayIcon';
import SignInButton from '../components/SignInButton';
import InfoFooter from '../components/InfoFooter';
import UserListBlock from '../components/UserListBlock';
import { Card, Textarea } from 'theme-ui';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/client';

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
      <InfoFooter />
      <UserListBlock />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return { props: {} };
};

export default IndexPage;
