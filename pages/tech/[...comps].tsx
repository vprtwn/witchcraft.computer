import React from 'react';
import Layout from '../../components/Layout';
import PageFooter from '../../components/PageFooter';
import { Image, Box, Text, Link, Heading, Flex, Card } from 'theme-ui';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

const UserPage = (props) => {
  const list = [
    {
      id: 's-ki',
      name: 'King of Code',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-swords/king-of-swords/',
    },
    {
      id: 's-q',
      name: 'Queen of Code',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-swords/queen-of-swords/',
    },
    {
      id: 's-kn',
      name: 'Knight of Code',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-swords/knight-of-swords/',
    },
    {
      id: 's-p',
      name: 'Page of Code',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-swords/page-of-swords/',
    },
    {
      id: 's-10',
      name: 'Ten of Code',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-swords/ten-of-swords/',
    },
    {
      id: 's-9',
      name: 'Nine of Code',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-swords/nine-of-swords/',
    },
    {
      id: 's-8',
      name: 'Eight of Code',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-swords/eight-of-swords/',
    },
    {
      id: 's-7',
      name: 'Seven of Code',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-swords/seven-of-swords/',
    },
    {
      id: 's-6',
      name: 'Six of Code',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-swords/six-of-swords/',
    },
    {
      id: 's-5',
      name: 'Five of Code',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-swords/five-of-swords/',
    },
    {
      id: 's-4',
      name: 'Four of Code',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-swords/four-of-swords/',
    },
    {
      id: 's-3',
      name: 'Three of Code',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-swords/three-of-swords/',
    },
    {
      id: 's-2',
      name: 'Two of Code',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-swords/two-of-swords/',
    },
    {
      id: 's-a',
      name: 'Ace of Code',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-swords/ace-of-swords/',
    },
    {
      id: 'c-ki',
      name: 'King of Pixels',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-cups/king-of-cups/',
    },
    {
      id: 'c-q',
      name: 'Queen of Pixels',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-cups/queen-of-cups',
    },
    {
      id: 'c-kn',
      name: 'Knight of Pixels',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-cups/knight-of-cups',
    },
    {
      id: 'c-p',
      name: 'Page of Pixels',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-cups/page-of-cups',
    },
    {
      id: 'c-10',
      name: 'Ten of Pixels',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-cups/ten-of-cups',
    },
    {
      id: 'c-9',
      name: 'Nine of Pixels',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-cups/nine-of-cups',
    },
    {
      id: 'c-8',
      name: 'Eight of Pixels',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-cups/eight-of-cups',
    },
    {
      id: 'c-7',
      name: 'Seven of Pixels',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-cups/seven-of-cups',
    },
    {
      id: 'c-6',
      name: 'Six of Pixels',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-cups/six-of-cups',
    },
    {
      id: 'c-5',
      name: 'Five of Pixels',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-cups/five-of-cups',
    },
    {
      id: 'c-4',
      name: 'Four of Pixels',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-cups/four-of-cups',
    },
    {
      id: 'c-3',
      name: 'Three of Pixels',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-cups/three-of-cups',
    },
    {
      id: 'c-2',
      name: 'Two of Pixels',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-cups/two-of-cups',
    },
    {
      id: 'c-a',
      name: 'Ace of Pixels',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-cups/ace-of-cups',
    },
    {
      id: 'w-ki',
      name: 'King of Docs',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-wands/king-of-wands',
    },
    {
      id: 'w-q',
      name: 'Queen of Docs',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-wands/queen-of-wands',
    },
    {
      id: 'w-kn',
      name: 'Knight of Docs',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-wands/knight-of-wands',
    },
    {
      id: 'w-p',
      name: 'Page of Docs',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-wands/page-of-wands',
    },
    {
      id: 'w-10',
      name: 'Ten of Docs',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-wands/ten-of-wands',
    },
    {
      id: 'w-9',
      name: 'Nine of Docs',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-wands/nine-of-wands',
    },
    {
      id: 'w-8',
      name: 'Eight of Docs',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-wands/eight-of-wands',
    },
    {
      id: 'w-7',
      name: 'Seven of Docs',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-wands/seven-of-wands',
    },
    {
      id: 'w-6',
      name: 'Six of Docs',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-wands/six-of-wands',
    },
    {
      id: 'w-5',
      name: 'Five of Docs',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-wands/five-of-wands',
    },
    {
      id: 'w-4',
      name: 'Four of Docs',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-wands/four-of-wands',
    },
    {
      id: 'w-3',
      name: 'Three of Docs',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-wands/three-of-wands',
    },
    {
      id: 'w-2',
      name: 'Two of Docs',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-wands/two-of-wands',
    },
    {
      id: 'w-a',
      name: 'Ace of Docs',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-wands/ace-of-wands',
    },
    {
      id: 'p-ki',
      name: 'King of Keyboards',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-pentacles/king-of-pentacles',
    },
    {
      id: 'p-q',
      name: 'Queen of Keyboards',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-pentacles/queen-of-pentacles',
    },
    {
      id: 'p-kn',
      name: 'Knight of Keyboards',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-pentacles/knight-of-pentacles',
    },
    {
      id: 'p-p',
      name: 'Page of Keyboards',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-pentacles/page-of-pentacles',
    },
    {
      id: 'p-10',
      name: 'Ten of Keyboards',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-pentacles/ten-of-pentacles',
    },
    {
      id: 'p-9',
      name: 'Nine of Keyboards',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-pentacles/nine-of-pentacles',
    },
    {
      id: 'p-8',
      name: 'Eight of Keyboards',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-pentacles/eight-of-pentacles',
    },
    {
      id: 'p-7',
      name: 'Seven of Keyboards',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-pentacles/seven-of-pentacles',
    },
    {
      id: 'p-6',
      name: 'Six of Keyboards',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-pentacles/six-of-pentacles',
    },
    {
      id: 'p-5',
      name: 'Five of Keyboards',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-pentacles/five-of-pentacles',
    },
    {
      id: 'p-4',
      name: 'Four of Keyboards',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-pentacles/four-of-pentacles',
    },
    {
      id: 'p-3',
      name: 'Three of Keyboards',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-pentacles/three-of-pentacles',
    },
    {
      id: 'p-2',
      name: 'Two of Keyboards',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-pentacles/two-of-pentacles',
    },
    {
      id: 'p-a',
      name: 'Ace of Keyboards',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-pentacles/ace-of-pentacles',
    },
    {
      id: 'a-tw',
      name: 'The IPO',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/major-arcana/world/',
    },
    {
      id: 'a-jg',
      name: 'The Perf Cycle',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/major-arcana/judgement/',
    },
    {
      id: 'a-sn',
      name: 'The Launch',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/major-arcana/sun/',
    },
    {
      id: 'a-mn',
      name: 'The Bubble',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/major-arcana/moon/',
    },
    {
      id: 'a-sr',
      name: 'The User',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/major-arcana/star/',
    },
    {
      id: 'a-tt',
      name: 'The Reorg',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/major-arcana/tower/',
    },
    {
      id: 'a-td',
      name: 'The Hacker',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/major-arcana/devil/',
    },
    {
      id: 'a-t',
      name: 'The Break',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/major-arcana/temperance/',
    },
    {
      id: 'a-d',
      name: 'The Migration',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/major-arcana/death/',
    },
    {
      id: 'a-hm',
      name: 'The User Research',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/major-arcana/hanged-man/',
    },
    {
      id: 'a-s',
      name: 'The Investor',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/major-arcana/strength/',
    },
    {
      id: 'a-wf',
      name: 'The Unicorn',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/major-arcana/wheel-of-fortune/',
    },
    {
      id: 'a-h',
      name: 'The Product Manager',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/major-arcana/hermit',
    },
    {
      id: 'a-j',
      name: 'HR',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/major-arcana/justice',
    },
    {
      id: 'a-c',
      name: 'The Startup',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/major-arcana/chariot/',
    },
    {
      id: 'a-l',
      name: 'The Offsite',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/major-arcana/lovers/',
    },
    {
      id: 'a-pt',
      name: 'The Engineering Manager',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/major-arcana/hierophant',
    },
    {
      id: 'a-er',
      name: 'The CTO',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/major-arcana/emperor',
    },
    {
      id: 'a-es',
      name: 'The CEO',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/major-arcana/empress',
    },
    {
      id: 'a-ps',
      name: 'The Designer',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/major-arcana/high-priestess/',
    },
    {
      id: 'a-m',
      name: 'The Engineer',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/major-arcana/magician',
    },
    {
      id: 'a-f',
      name: 'The New User',
      wiki: 'https://www.biddytarot.com/tarot-card-meanings/major-arcana/fool/',
    },
  ];
  const map = {};
  list.forEach((c) => {
    map[c.id] = c;
  });

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
    const data = map[first];
    cards.push(data);
    selected = data;
    title = `${data.name} ✧ witchcraft.computer`;
  }

  const description = 'tech tarot deck';
  const url = `https://witchcraft.computer`;
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
        <Flex sx={{ justifyContent: 'center' }}>
          <Flex sx={{ flexDirection: 'row', justifyContent: 'center' }}>
            {cards.map((card, i) => {
              const prefix = card.id.split('-')[0];
              return (
                <Flex
                  key={card.id}
                  sx={{ mx: 1, mt: 3, mb: 3, width: 300, flexDirection: 'column', alignItems: 'center' }}
                >
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
                  <Box sx={{ fontFamily: 'mono', pt: 3, pb: 0 }}>
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
  return {
    props: { baseUrl: baseUrl },
  };
};
export default UserPage;
