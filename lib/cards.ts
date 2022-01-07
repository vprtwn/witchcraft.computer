type Card = {
  id: string;
  name: string;
  wiki: string;
};
const allCards: Card[] = [
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

type CardMap = { [cardId: string]: Card };
export const cardsById: CardMap = allCards.reduce((p, c) => ({ ...p, [c.id]: c }), {});

export default allCards;
