import React, { useState, useEffect, useRef } from 'react';
import Layout from '../../components/Layout';
import PageFooter from '../../components/PageFooter';
import { Image, Box, Text, Link, Heading, Flex, Card } from 'theme-ui';
import { GetServerSideProps } from 'next';
import fetchJson from '../../lib/fetchJson';
import { Router, useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
const psl = require('psl');

const UserPage = (props) => {
  const router = useRouter();
  let selected = null;

  const { comps } = router.query;
  const first = comps[0];
  let basePath = '/';
  let cards = [];
  let headings = null;
  let title = 'witchcraft.computer';
  if (first) {
    basePath = `o/${first}`;
    const data = props.map[first];
    cards.push(data);
    selected = data;
    title = `${data.name} ✧ witchcraft.computer`;
  }

  let description = '';
  if (cards.length > 1) {
    cards.forEach((c) => {
      if (description.length > 0) {
        description = description + ' ✧ ';
      }
      description = description + c.name;
    });
  } else {
    description = cards[0].desc;
  }
  const url = `https://witchcraft.computer`;
  let previewImage = `http://witchcraft.computer/rider-waite/${cards[0].id}.png`;
  if (selected) {
    previewImage = `http://witchcraft.computer/rider-waite/${selected.id}.png`;
  }

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
                url: previewImage,
                alt: title,
              },
            ],
            site_name: 'witchcraft.computer',
          }}
        />
        <Flex sx={{ justifyContent: 'center', mx: 2 }}>
          <Flex sx={{ flexDirection: 'row', justifyContent: 'center' }}>
            {cards.map((card, i) => {
              const prefix = card.id.split('-')[0];
              return (
                <Flex key={card.id} sx={{ mx: 1, mt: 3, width: 300, flexDirection: 'column', alignItems: 'center' }}>
                  {headings && (
                    <Text
                      sx={{
                        fontFamily: 'mono',
                        fontWeight: 'bold',
                        mb: 2,
                      }}
                    >
                      {headings[i]}
                    </Text>
                  )}
                  <Card variant={`card_${prefix}`} sx={{}}>
                    <Image
                      src={`${props.baseUrl}/rider-waite/${card.id}.svg`}
                      sx={{ transform: card.reversed ? 'rotate(180deg);' : 'none' }}
                    />
                  </Card>
                  <Box sx={{ fontFamily: 'mono', py: 3 }}>
                    <Link href={selected.wiki} target={'_blank'}>
                      <Heading sx={{ fontFamily: 'mono' }}>{selected.name}</Heading>
                    </Link>
                  </Box>
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
  const list = await fetchJson(`${baseUrl}/data_tech.json`);
  const map = {};
  list.forEach((c) => {
    map[c.id] = c;
  });
  return {
    props: { baseUrl: baseUrl, list: list, map: map },
  };
};
export default UserPage;
