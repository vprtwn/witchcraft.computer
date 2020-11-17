// example base theme from @theme-ui/presets
export default {
  fonts: {
    mono:
      'Recursive, San Francisco Mono, Monaco, "Consolas", "Lucida Console", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", monospace',
    sans:
      '-apple-system, BlinkMacSystemFont, "avenir next", avenir, helvetica, "helvetica neue", ubuntu, roboto, noto, "segoe ui", arial, sans-serif',
    body:
      '-apple-system, BlinkMacSystemFont, "avenir next", avenir, helvetica, "helvetica neue", ubuntu, roboto, noto, "segoe ui", arial, sans-serif',
  },
  fontWeights: {
    body: 400,
    bold: 700,
  },
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
    spotifyGreen: '#1DB954',
    youtubeRed: '#FF0000',
    bandcampTeal: '#629aa9',
    soundcloudOrange: '#ff7700',
    twitterBlue: '#00acee',
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
      fontSize: 13,
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
      fontSize: 13,
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
      fontSize: 15,
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
      fontSize: 13,
      fontFamily: 'mono',
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
      fontSize: '18px',
      fontWeight: 'bold',
      whiteSpace: 'pre-wrap',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    link_no_underline: {
      fontSize: '13px',
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
      fontSize: '11px',
      fontWeight: 'normal',
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
      fontSize: '16px',
      bg: 'white',
      borderColor: 'black',
      borderRadius: 8,
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
    label: {
      fontSize: '12px',
      fontFamily: 'mono',
      color: 'text',
    },
    input: {
      // PaymentBlock amount input
      fontSize: 24,
      fontWeight: 'bold',
      bg: 'transparent',
      borderWidth: 0,
      textAlign: 'center',
      fontFamily: 'mono',
      py: 2,
    },
    input_standard: {
      fontFamily: 'mono',
      fontSize: 13,
      bg: 'white',
      py: 2,
      border: '1px solid lightGray',
    },
    input_link: {
      py: 2,
      px: 3,
      bg: 'transparent',
      border: 'none',
      fontSize: '14px',
      fontFamily: 'mono',
    },
    label_icon_button: {
      fontSize: 11,
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
      fontSize: '11px',
      fontFamily: 'mono',
    },
    text_sm: {
      fontSize: '13px',
      fontFamily: 'mono',
    },
    text_md_mono: {
      fontSize: '14px',
      fontFamily: 'sans',
      fontFamily: 'mono',
    },
    text_block_link_comment: {
      width: '100%',
      fontSize: '13px',
      fontFamily: 'mono',
      px: 3,
      py: 2,
      whiteSpace: 'pre-wrap',
    },
    text_block_text: {
      fontSize: '16px',
      fontFamily: 'mono',
      py: 2,
      px: 1,
      whiteSpace: 'pre-wrap',
    },
  },
  styles: {
    a: {
      color: 'black',
    },
    progress: {
      color: 'text',
      bg: 'lightGray',
    },
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
    },
    h1: {
      variant: 'text.heading',
      fontSize: 6,
    },
    h2: {
      variant: 'text.heading',
      fontSize: 4,
    },
    h3: {
      variant: 'text.heading',
      fontSize: 3,
    },
    h4: {
      variant: 'text.heading',
      fontSize: 2,
    },
    h5: {
      variant: 'text.heading',
      fontSize: 1,
    },
    h6: {
      variant: 'text.heading',
      fontSize: 0,
    },
    pre: {
      fontFamily: 'mono',
      overflowX: 'auto',
      code: {
        color: 'inherit',
      },
    },
    code: {
      fontFamily: 'mono',
      fontSize: 'inherit',
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
    },
    th: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
    td: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
  },
};
