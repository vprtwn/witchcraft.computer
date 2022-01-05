import React, { useState } from 'react';
import Layout from '../components/Layout';
import InfoFooter from '../components/InfoFooter';
import { Flex, Badge, Switch, Button, Text, Box } from 'theme-ui';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

const IndexPage = (props) => {
  const keys = [
    's-ki',
    's-q',
    's-kn',
    's-p',
    's-10',
    's-9',
    's-8',
    's-7',
    's-6',
    's-5',
    's-4',
    's-3',
    's-2',
    's-a',
    'c-ki',
    'c-q',
    'c-kn',
    'c-p',
    'c-10',
    'c-9',
    'c-8',
    'c-7',
    'c-6',
    'c-5',
    'c-4',
    'c-3',
    'c-2',
    'c-a',
    'w-ki',
    'w-q',
    'w-kn',
    'w-p',
    'w-10',
    'w-9',
    'w-8',
    'w-7',
    'w-6',
    'w-5',
    'w-4',
    'w-3',
    'w-2',
    'w-a',
    'p-ki',
    'p-q',
    'p-kn',
    'p-p',
    'p-10',
    'p-9',
    'p-8',
    'p-7',
    'p-6',
    'p-5',
    'p-4',
    'p-3',
    'p-2',
    'p-a',
    'a-tw',
    'a-jg',
    'a-sn',
    'a-mn',
    'a-sr',
    'a-tt',
    'a-td',
    'a-t',
    'a-d',
    'a-hm',
    'a-s',
    'a-wf',
    'a-h',
    'a-j',
    'a-c',
    'a-l',
    'a-pt',
    'a-er',
    'a-es',
    'a-ps',
    'a-m',
    'a-f',
  ];

  const title = '✧ witchcraft.computer ✧';
  const url = 'https://witchcraft.computer';
  const description = 'tech tarot deck';
  const [reverseEnabled, setReverseEnabled] = useState<boolean>(true);
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
                url: `http://witchcraft.computer/rider-waite/a-m.png`,
                alt: title,
              },
            ],
            site_name: 'witchcraft.computer',
          }}
        />
        <Flex sx={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', mt: 3 }}>
          <Text variant="text_md_mono" sx={{ my: 2 }}>
            <Badge variant="badge_tray" sx={{ fontWeight: 'bold', fontSize: 13 }}>
              witchcraft.computer
            </Badge>
          </Text>
          <Box>
            <Button
              variant="button"
              sx={{ mt: 3 }}
              onClick={() => {
                const i = Math.floor(Math.random() * keys.length);
                const key = keys[i] + (Math.random() < 0.3 ? '_' : '');
                const url = `tech/${key}`;
                window.location.assign(url);
              }}
            >
              Go
            </Button>
            <Switch
              label="↺"
              sx={{ mt: 1 }}
              checked={reverseEnabled}
              onChange={() => setReverseEnabled(!reverseEnabled)}
            />
          </Box>
        </Flex>
        <InfoFooter />
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let baseUrl = 'http://witchcraft.computer';
  if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://127.0.0.1:3000';
  }
  return {
    props: { baseUrl: baseUrl },
  };
};

export default IndexPage;
