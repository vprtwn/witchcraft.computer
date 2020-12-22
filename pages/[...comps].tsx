import React, { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import PageFooter from '../components/PageFooter';
import { Image, Box, Text, Button, Flex, Card } from 'theme-ui';
import { GetServerSideProps } from 'next';
import fetchJson from '../lib/fetchJson';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
const psl = require('psl');

const UserPage = (props) => {
  const title = 'foo';
  const description = 'bar';
  const url = `https://witchcraft.computer`;
  const twitter = '@fastTarot';

  const router = useRouter();
  const { comps } = router.query;
  const type = comps[0];
  const first = comps[1];
  const second = comps[2];
  const third = comps[3];
  let cards = [];
  let headings = null;
  if (type === 's') {
    const data = props.map[first];
    cards.push(data);
  } else if (type === 'ppf' && props.map[first] && props.map[second] && props.map[third]) {
    headings = ['present', 'past', 'future'];
    cards.push(props.map[first]);
    cards.push(props.map[second]);
    cards.push(props.map[third]);
  }

  // router.events.on('hashChangeStart', (hash) => {
  //   console.log('hash', hash);
  // });

  return (
    <Layout>
      <Box sx={{ flexDirection: 'column', justifyContent: 'center', my: 4 }}>
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
            site_name: 'tarot express',
          }}
          twitter={{
            handle: twitter,
            site: twitter,
            cardType: 'summary_large_image',
          }}
        />
        <Flex sx={{ justifyContent: 'center', mx: 2 }}>
          <Flex sx={{ flexDirection: 'row', justifyContent: 'center' }}>
            {cards.map((card, i) => {
              const prefix = card.id.split('-')[0];
              return (
                <Flex sx={{ mx: 1, mt: 3, width: 300, flexDirection: 'column', alignItems: 'center' }}>
                  {headings && <Text sx={{ fontFamily: 'mono', mb: 2 }}>{headings[i]}</Text>}
                  <Card
                    variant={`card_${prefix}`}
                    sx={{}}
                    onClick={() => {
                      window.location.assign(`#${card.id}`);
                    }}
                  >
                    <Image src={`${props.baseUrl}/rider-waite/${card.id}.svg`} />
                  </Card>
                  <Text
                    sx={{
                      fontSize: 18,
                      textAlign: 'center',
                      lineHeight: 1.2,
                      fontFamily: 'mono',
                      fontWeight: 'medium',
                      pt: 2,
                    }}
                  >
                    {card.name}
                  </Text>
                </Flex>
              );
            })}
          </Flex>
        </Flex>
        <PageFooter />
      </Box>
    </Layout>
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
export default UserPage;
