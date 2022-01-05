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
    offWhite: '#f7fafc',
    primary: '#000',
    lightGreen: '#f0fff4',
    lightRed: '#fff5f5',
    lightBlue: '#ebf8ff',
    lightTeal: '#e6fffa',
    lightOrange: '#fffaf0',
    background: '#fff',
    lightGray: '#edf2f7',
    modes: {
      light: {
        text: '#000',
        background: '#fff',
        lightGray: '#edf2f7',
      },
    },
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
    link_standard: {
      color: 'inherit',
    },
    link_block: {
      color: 'inherit',
      textDecoration: 'none',
      whiteSpace: 'pre-wrap',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    link_page_block: {
      color: 'inherit',
      textDecoration: 'none',
      fontSize: 4,
      fontWeight: 'bold',
      whiteSpace: 'pre-wrap',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    link_no_underline: {
      fontSize: 1,
      fontFamily: 'sans',
      fontWeight: 'bold',
      color: 'inherit',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
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
    badge_tray: {
      fontFamily: 'mono',
      fontSize: 2,
      color: 'white',
      borderRadius: 4,
      fontWeight: 'normal',
    },
    badge_outline: {
      fontWeight: 'normal',
      fontFamily: 'mono',
      fontSize: 2,
      color: 'primary',
      bg: 'transparent',
      boxShadow: 'inset 0 0 0 1px',
    },
  },
  cards: {
    card_a: {
      py: 0,
      px: 0,
      border: `solid 2px`,
      bg: 'white',
      borderColor: 'black',
      fontFamily: 'mono',
      borderRadius: 8,
      cursor: 'pointer',
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
    card_rainbow_link: {
      py: 0,
      px: 0,
      mb: 1,
      border: '0px solid',
      borderColor: 'lightGray',
      borderRadius: 8,
      background: 'linear-gradient(-45deg, #e6fffa, #faf5ff, #ebf8ff)',
      fontFamily: 'mono',
      backgroundSize: '400% 400%',
      animation: 'gradient 10s ease infinite',
      boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
    },
  },
  forms: {
    checkbox: {
      color: 'black',
    },
    switch: {
      // label: {
      fontFamily: 'mono',
      fontSize: 0,
      // },
    },
    label_icon_button: {
      fontSize: 0,
      fontFamily: 'mono',
      color: 'text',
      cursor: 'pointer',
    },
  },
  alerts: {
    alert_error: {
      color: 'red',
      bg: 'lightRed',
    },
  },
  text: {
    text_xs: {
      fontSize: 0,
      fontFamily: 'mono',
    },
    text_sm: {
      fontSize: 1,
      fontFamily: 'mono',
    },
    text_md_mono: {
      fontSize: 3,
      fontFamily: 'mono',
    },
    text_block_link_comment: {
      width: '100%',
      fontSize: 1,
      fontFamily: 'mono',
      px: 3,
      py: 2,
      whiteSpace: 'pre-wrap',
      cursor: 'auto',
    },
    text_block_text: {
      fontSize: 3,
      fontFamily: 'mono',
      py: 2,
      px: 1,
      whiteSpace: 'pre-wrap',
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
