// example base theme from @theme-ui/presets
export default {
  breakpoints: ['40em', '52em', '64em'],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    mono:
      'Recursive, San Francisco Mono, Monaco, "Consolas", "Lucida Console", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", monospace',
    sans:
      '-apple-system, BlinkMacSystemFont, "avenir next", avenir, helvetica, "helvetica neue", ubuntu, roboto, noto, "segoe ui", arial, sans-serif',
    body:
      '-apple-system, BlinkMacSystemFont, "avenir next", avenir, helvetica, "helvetica neue", ubuntu, roboto, noto, "segoe ui", arial, sans-serif',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1,
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
    primary: {
      px: 2,
      py: 1,
      color: 'text',
      border: 'solid',
      borderWidth: 1,
      bg: 'transparent',
      fontSize: 13,
      fontFamily: 'mono',
      cursor: 'pointer',
      '&:hover': {
        bg: 'lightGray',
      },
    },
    tiny: {
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
        bg: 'lightGray',
      },
    },
    shadowButton: {
      border: 'dotted 1px lightGray',
      borderRadius: 12,
      bg: 'white',
      color: 'text',
      fontFamily: 'mono',
      fontSize: 13,
      cursor: 'pointer',
      py: 2,
      boxShadow: '0 0 4px rgba(0, 0, 0, 0.125)',
      '&:hover': {
        boxShadow: '0 0 16px rgba(0, 0, 0, 0.125)',
      },
    },
    newMenuButton: {
      border: 'dotted 1px lightGray',
      borderRadius: 8,
      bg: 'white',
      color: 'text',
      fontFamily: 'mono',
      fontSize: 15,
      cursor: 'pointer',
      py: 2,
      boxShadow: '0 0 4px rgba(0, 0, 0, 0.125)',
      '&:hover': {
        boxShadow: '0 0 16px rgba(0, 0, 0, 0.125)',
      },
    },
    icon: {
      cursor: 'pointer',
      '&:hover': {
        bg: 'lightGray',
      },
    },
    iconselected: {
      cursor: 'pointer',
      bg: 'lightGray',
    },
  },
  links: {
    primary: {
      color: 'inherit',
    },
    nav: {
      fontWeight: 'bold',
      color: 'inherit',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    block: {
      color: 'inherit',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
  badges: {
    outline: {
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
    textBlock: {
      py: 0,
      px: 0,
      border: '0px solid',
      borderColor: 'lightGray',
      borderRadius: 4,
      bg: 'white',
    },
    shadowCard: {
      p: 3,
      my: 2,
      bg: 'white',
      boxShadow: '0 0 8px rgba(0, 0, 0, 0.125)',
      borderRadius: 12,
      border: '1px solid lightGray',
    },
    aboutCard: {
      p: 3,
      bg: 'white',
      borderRadius: 12,
      border: '1px dotted black',
    },
    primary: {
      paddingX: 3,
      paddingY: 2,
      borderRadius: 4,
    },
  },
  images: {
    profile: {
      width: 48,
      height: 48,
      borderRadius: 99999,
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
    formLabel: {
      fontSize: '13px',
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
    standardInput: {
      fontFamily: 'mono',
      fontSize: 13,
      bg: 'white',
      py: 2,
      border: '1px solid lightGray',
    },
    linkInput: {
      px: 2,
      bg: 'transparent',
      border: 'none',
      py: 1,
    },
    buttonLabel: {
      fontSize: 11,
      fontFamily: 'mono',
      color: 'text',
      cursor: 'pointer',
      // fontWeight: 'bold',
    },
    settingsLabel: {
      fontSize: 15,
      fontWeight: 'bold',
      fontFamily: 'mono',
      color: 'text',
    },
  },
  text: {
    tiny: {
      fontSize: '11px',
    },
    small: {
      fontSize: '13px',
    },
    large: {
      fontSize: '14px',
    },
    heading: {
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
    },
  },
  styles: {
    a: {
      color: '#4299e1',
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
