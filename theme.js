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
    bandcamp: '#1ad',
    behance: '#4175fa',
    dribbble: '#c32361',
    goodreads: '#814910',
    paypal: '#002c8a',
    pinterest: '#bd081b',
    soundcloud: '#ff7700',
    spotify: '#3bd75f',
    squareCash: '#00d632',
    twitter: '#1da1f2',
    venmo: '#3396cd',
    youtube: '#ed1d24',
    modes: {
      light: {
        text: '#000',
        background: '#fff',
        lightGray: '#edf2f7',
      },
    },
  },
  buttons: {
    button_small: {
      px: 2,
      py: 1,
      color: 'text',
      border: 'solid 1px lightGray',
      borderWidth: 1,
      bg: 'transparent',
      fontSize: 1,
      fontFamily: 'mono',
      cursor: 'pointer',
      '&:hover': {
        boxShadow: '0 0 16px rgba(0, 0, 0, 0.125)',
      },
    },
    button_emphasis: {
      py: 2,
      color: 'text',
      border: 'dotted 1px lightGray',
      borderRadius: 12,
      bg: 'white',
      fontSize: 1,
      fontFamily: 'mono',
      cursor: 'pointer',
      boxShadow: '0 0 4px rgba(0, 0, 0, 0.125)',
      '&:hover': {
        boxShadow: '0 0 16px rgba(0, 0, 0, 0.125)',
      },
    },
    button_emphasis_large: {
      py: 2,
      color: 'text',
      border: 'dotted 1px lightGray',
      borderRadius: 8,
      bg: 'white',
      fontSize: 3,
      fontFamily: 'mono',
      cursor: 'pointer',
      boxShadow: '0 0 4px rgba(0, 0, 0, 0.125)',
      '&:hover': {
        boxShadow: '0 0 16px rgba(0, 0, 0, 0.125)',
      },
    },
    button_small_rainbow: {
      px: 2,
      py: 2,
      color: 'text',
      border: 'solid 1px lightGray',
      borderWidth: 1,
      bg: 'transparent',
      fontSize: 1,
      cursor: 'pointer',
      boxShadow: '0 0 8px rgba(0, 0, 0, 0.125)',
      '&:hover': {
        boxShadow: '0 0 16px rgba(0, 0, 0, 0.125)',
      },
      fontFamily: 'sans',
      background: 'linear-gradient(-45deg, #e6fffa, #faf5ff, #ebf8ff)',
      backgroundSize: '400% 400%',
      animation: 'gradient 10s ease infinite',
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
      color: 'inherit',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
  badges: {
    badge_outline: {
      fontFamily: 'mono',
      color: 'primary',
      bg: 'transparent',
      boxShadow: 'inset 0 0 0 1px',
    },
  },
  cards: {
    block: {
      py: 0,
      px: 0,
      border: '1px solid',
      borderColor: 'lightGray',
      borderRadius: 8,
      bg: 'white',
    },
    card_dotted_gray: {
      p: 3,
      border: '1px dotted',
      borderColor: 'lightGray',
      borderRadius: 8,
      bg: 'transparent',
    },
    card_dotted_black: {
      p: 3,
      border: '1px dotted',
      borderColor: 'black',
      borderRadius: 8,
      bg: 'transparent',
    },
    card_block_link: {
      py: 0,
      px: 0,
      border: `solid 2px`,
      fontSize: 3,
      bg: 'white',
      borderColor: 'black',
      borderRadius: 8,
      cursor: 'pointer',
    },
    card_block_text: {
      py: 0,
      px: 0,
      border: '0px solid',
      borderColor: 'lightGray',
      borderRadius: 4,
      bg: 'white',
      cursor: 'text',
    },
    card_rainbow_link: {
      py: 0,
      px: 0,
      mb: 1,
      border: '1px solid',
      borderColor: 'lightGray',
      borderRadius: 8,
      background: 'linear-gradient(-45deg, #e6fffa, #faf5ff, #ebf8ff)',
      backgroundSize: '400% 400%',
      animation: 'gradient 10s ease infinite',
    },
    card_payment: {
      py: 2,
      px: 3,
      border: '1px solid',
      borderColor: 'lightGray',
      borderRadius: 8,
      bg: 'white',
    },
    card_payment_form: {
      p: 3,
      my: 2,
      bg: 'white',
      boxShadow: '0 0 8px rgba(0, 0, 0, 0.125)',
      borderRadius: 12,
      border: '1px solid lightGray',
    },
  },
  forms: {
    checkbox: {
      color: 'black',
    },
    input: {
      // PaymentBlock amount input
      fontSize: 5,
      fontWeight: 'bold',
      bg: 'transparent',
      borderWidth: 0,
      textAlign: 'center',
      fontFamily: 'mono',
      py: 2,
    },
    input_standard: {
      fontFamily: 'mono',
      fontSize: 1,
      bg: 'white',
      py: 2,
      border: '1px solid lightGray',
    },
    input_payment_message: {
      fontFamily: 'mono',
      fontSize: 3,
    },
    input_link: {
      py: 2,
      px: 3,
      bg: 'transparent',
      border: 'none',
      fontSize: 2,
      fontFamily: 'mono',
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
      fontSize: 2,
      fontFamily: 'mono',
    },
    text_block_link_comment: {
      width: '100%',
      fontSize: 1,
      fontFamily: 'mono',
      px: 3,
      py: 2,
      whiteSpace: 'pre-wrap',
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
