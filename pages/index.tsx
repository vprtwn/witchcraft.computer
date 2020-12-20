import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import InfoFooter from '../components/InfoFooter';
import { Card, Badge, Box, Flex, Text, Link } from 'theme-ui';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/client';
import { NextSeo } from 'next-seo';

const IndexPage = () => {
  const [session, loading] = useSession();
  const signedIn = session && session.user.username;

  const title = 'tarot express ✧ free online tarot reading';
  const url = 'https://tarot.express';
  const description = 'free online tarot card divinations';
  return (
    <>
      <Layout>
        <NextSeo
          title={title}
          description={description}
          openGraph={{
            url: url,
            title: title,
            description: description,
            images: [
              {
                url: `https://api.microlink.io/?url=${url}&screenshot=true&meta=false&embed=screenshot.url`,
                width: 512,
                height: 512,
                alt: 'tarot express',
              },
            ],
            site_name: 'tray',
          }}
          twitter={{
            handle: `@tarotExpressApp`,
            site: `@tarotExpressApp`,
            cardType: 'summary_large_image',
          }}
        />
        <Card variant="card_block_link" sx={{ px: 3, py: 2 }}>
          <Text variant="text_md_mono">
            tarot <Badge variant="badge_tray">express</Badge>
          </Text>
        </Card>
        <InfoFooter />
        <Box sx={{ py: 5 }}></Box>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return { props: {} };
};

export default IndexPage;
