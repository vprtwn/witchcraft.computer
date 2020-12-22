import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import fetchJson from '../lib/fetchJson';
import InfoFooter from '../components/InfoFooter';
import { Flex, Badge, Box, Button, Text, Link } from 'theme-ui';
import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

const IndexPage = (props) => {
  const keys = Object.keys(props.map);

  const title = 'tarot express ✧ free online tarot reading';
  const url = 'https://witchcraft.computer';
  const description = 'free online tarot card divinations';
  const twitter = '@fastTarot';
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
                alt: title,
              },
            ],
            site_name: 'tray',
          }}
          twitter={{
            handle: twitter,
            site: twitter,
            cardType: 'summary_large_image',
          }}
        />
        <Flex sx={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Text variant="text_md_mono" sx={{ my: 2 }}>
            <Badge variant="badge_tray">witchcraft.computer</Badge>
          </Text>
          <Button
            variant="button"
            sx={{ my: 2 }}
            onClick={() => {
              const i1 = Math.floor(Math.random() * keys.length);
              const i2 = Math.floor(Math.random() * keys.length);
              const i3 = Math.floor(Math.random() * keys.length);
              const url = `/ppf/${keys[i1] + (Math.random() < 0.5 ? '_' : '')}/${
                keys[i2] + (Math.random() < 0.5 ? '_' : '')
              }/${keys[i3] + (Math.random() < 0.5 ? '_' : '')}`;
              window.location.assign(url);
            }}
          >
            present, past, future
          </Button>
          <Button
            variant="button"
            sx={{ my: 2 }}
            onClick={() => {
              const i = Math.floor(Math.random() * keys.length);
              const key = keys[i] + (Math.random() < 0.5 ? '_' : '');
              const url = `/s/${key}`;
              window.location.assign(url);
            }}
          >
            one answer
          </Button>
          {/* <Button variant="button">All Cards</Button> */}
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
  const list = await fetchJson(`${baseUrl}/data.json`);
  const map = {};
  list.forEach((c) => {
    map[c.id] = c;
  });
  return {
    props: { baseUrl: baseUrl, list: list, map: map },
  };
};

export default IndexPage;
