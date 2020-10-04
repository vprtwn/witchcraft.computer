// example base theme from @theme-ui/presets
export default {
  breakpoints: ['40em', '52em', '64em'],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    heading: 'inherit',
    monospace: 'Recursive, Menlo, monospace',
    body: 'Recursive, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
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
    green: '#68d391',
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
      fontFamily: 'Recursive',
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
      fontSize: 11,
      fontFamily: 'Recursive',
      cursor: 'pointer',
      '&:hover': {
        bg: 'lightGray',
      },
    },
    shadowButton: {
      border: 'solid 1px lightGray',
      borderRadius: 8,
      bg: 'white',
      color: 'text',
      fontFamily: 'Recursive',
      fontSize: 13,
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
    nav: {
      fontWeight: 'bold',
      color: 'inherit',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
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
    label: {
      fontSize: '10px',
      fontFamily: 'Recursive',
      color: 'text',
    },
    formLabel: {
      fontSize: '13px',
      fontFamily: 'Recursive',
      color: 'text',
    },
    input: {
      // PaymentBlock amount input
      fontSize: 30,
      bg: 'transparent',
      borderWidth: 0,
      textAlign: 'center',
      py: 2,
    },
    standardInput: {
      bg: 'white',
      py: 2,
      border: '1px solid lightGray',
    },
    linkInput: {
      px: 2,
      fontFamily: 'Inter',
      bg: 'transparent',
      border: 'none',
      py: 1,
    },
    buttonLabel: {
      fontSize: 11,
      fontFamily: 'Recursive',
      color: 'text',
      cursor: 'pointer',
      // fontWeight: 'bold',
    },
    settingsLabel: {
      fontSize: 15,
      fontWeight: 'bold',
      fontFamily: 'Recursive',
      color: 'text',
    },
  },
  text: {
    small: {
      fontSize: '13px',
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
      fontFamily: 'monospace',
      overflowX: 'auto',
      code: {
        color: 'inherit',
      },
    },
    code: {
      fontFamily: 'monospace',
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
