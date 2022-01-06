import { FONT_MONO, FONT_SANS } from './lib/const';
export default {
  fonts: {
    mono: FONT_MONO,
    sans: FONT_SANS,
    body: FONT_SANS,
  },
  fontWeights: {
    body: 400,
    bold: 700,
  },
  fontSizes: [11, 13, 14, 16, 18, 28],
  lineHeights: {
    body: 1.5,
  },
  useLocalStorage: false,
  colors: {
    text: '#000',
    gray: '#718096',
    white: '#fff',
    primary: '#000',
    background: '#fff',
  },
  buttons: {
    button: {
      px: 4,
      py: 2,
      color: 'text',
      border: 'solid 2px black',
      bg: 'transparent',
      fontSize: 3,
      cursor: 'pointer',
      boxShadow: '0 0 8px rgba(0, 0, 0, 0.25)',
      '&:hover': {
        boxShadow: '0 0 16px rgba(0, 0, 0, 0.25)',
      },
      fontFamily: 'mono',
    },
  },
  links: {
    link_footer: {
      mx: 2,
      py: 1,
      fontSize: 0,
      fontWeight: 'normal',
      fontFamily: 'mono',
      color: 'gray',
      '&:visited': { color: 'gray' },
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
  badges: {
    badge_black: {
      fontFamily: 'mono',
      fontSize: 2,
      color: 'white',
      borderRadius: 4,
      fontWeight: 'normal',
    },
  },
  cards: {
    card_foil: {
      py: 0,
      px: 0,
      border: `solid 2px`,
      bg: 'white',
      borderColor: 'black',
      fontFamily: 'mono',
      borderRadius: 8,
      // cursor: 'pointer',
      background: 'linear-gradient(-45deg, #e6fffa, #faf5f5, #ebf8ff)',
      backgroundSize: '400% 400%',
      animation: 'gradient 13s ease infinite',
      boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
    },
    card_info: {
      py: 0,
      px: 0,
      border: `solid 2px`,
      bg: 'white',
      borderColor: 'black',
      fontFamily: 'mono',
      borderRadius: 8,
      cursor: 'pointer',
      boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
    },
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
    },
  },
};
