import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import TrayIcon from '../components/TrayIcon';
import SignInButton from '../components/SignInButton';
import InfoFooter from '../components/InfoFooter';
import UserListBlock from '../components/UserListBlock';
import { Card, Badge, Box, Flex, Text, Link } from 'theme-ui';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/client';

const IndexPage = () => {
  const [session, loading] = useSession();
  const signedIn = session && session.user.username;

  return (
    <>
      <Layout>
        <TrayIcon />
        <Card variant="card_block_link" sx={{ px: 3, py: 2 }}>
          <Text variant="text_md_mono">
            welcome to <Badge variant="badge_outline">tray</Badge>
          </Text>
          <Text variant="text_md_mono" sx={{ textAlign: 'right', pt: 1 }}>
            a space to share notes and cool links
          </Text>
          <Text variant="text_md_mono" sx={{ pt: 1 }}>
            here's an <Link href="https://tray.club/@bgdotjpg">example</Link>
          </Text>
        </Card>
        {!signedIn && (
          <Box sx={{ mt: 3 }}>
            <SignInButton />
          </Box>
        )}
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
