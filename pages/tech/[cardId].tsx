import React from 'react';
import Layout from '../../components/Layout';
import PageFooter from '../../components/PageFooter';
import allCards, { cardsById } from '../../lib/cards';
import { Image, Box, Text, Link, Heading, Flex, Card } from 'theme-ui';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';

const url = `https://witchcraft.computer`;
const description = 'tech tarot deck';

type P = { cardId: string };
const UserPage = ({ cardId }: P) => {
  let selected = null;
  let cards = [];
  let headings = null;
  const baseId = cardId.replace('_', '');
  let data = cardsById[baseId];
  if (cardId.endsWith('_')) {
    data['reversed'] = true;
  }
  cards.push(data);
  selected = data;
  const title = `${data.name} ✧ witchcraft.computer`;
  const previewImage = `http://witchcraft.computer/rider-waite/${selected.id}.png`;

  return (
    <Layout>
      <Box sx={{ flexDirection: 'column', justifyContent: 'center', mt: 4, mb: 0 }}>
        <NextSeo
          title={title}
          description={description}
          openGraph={{
            url: url,
            title: title,
            description,
            images: [{ url: previewImage, alt: title }],
            site_name: 'witchcraft.computer',
          }}
        />
        <Flex sx={{ justifyContent: 'center' }}>
          <Flex sx={{ flexDirection: 'row', justifyContent: 'center' }}>
            {cards.map((card, i) => (
              <Flex
                key={card.id}
                sx={{ mx: 1, mt: 3, mb: 3, width: 300, flexDirection: 'column', alignItems: 'center' }}
              >
                {headings && <Text sx={{ fontFamily: 'mono', fontWeight: 'bold', mb: 2 }}>{headings[i]}</Text>}
                <Card variant={`card_foil`}>
                  <Image
                    src={`/rider-waite/${card.id}.png`}
                    sx={{ transform: card.reversed ? 'rotate(180deg);' : 'none' }}
                  />
                </Card>
                <Box sx={{ fontFamily: 'mono', pt: 3, pb: 0 }}>
                  <Link href={selected.wiki} target={'_blank'}>
                    <Heading sx={{ fontFamily: 'mono' }}>{selected.name}</Heading>
                  </Link>
                </Box>
              </Flex>
            ))}
          </Flex>
        </Flex>
        <PageFooter />
      </Box>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  return { props: { cardId: ctx.params.cardId } };
};

export async function getStaticPaths() {
  const regularPaths = allCards.map((c) => ({ params: { cardId: c.id } }));
  const upsideDown = allCards.map((c) => ({ params: { cardId: `${c.id}_` } }));
  return {
    paths: regularPaths.concat(upsideDown),
    fallback: false,
  };
}

export default UserPage;
