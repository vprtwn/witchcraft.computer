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
    background: '#f7fafc',
    darkGray: '#2d3748',
    outline: '#edf2f7',
    modes: {
      light: {
        text: '#000',
        background: '#fff',
        outline: '#edf2f7',
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
        bg: 'outline',
      },
    },
    tiny: {
      px: 2,
      py: 1,
      color: 'text',
      border: 'solid',
      borderWidth: 1,
      bg: 'transparent',
      fontSize: 12,
      fontFamily: 'Recursive',
      cursor: 'pointer',
      '&:hover': {
        bg: 'outline',
      },
    },
    shadowButton: {
      boxShadow: '0 0 8px rgba(0, 0, 0, 0.125)',
      border: 'solid 1px outline',
      borderRadius: 8,
      bg: 'white',
      color: 'text',
      fontFamily: 'Recursive',
      fontSize: 13,
      cursor: 'pointer',
      py: 2,
      '&:hover': {
        bg: 'outline',
      },
    },
    payment: {
      boxShadow: '0 0 12px rgba(0, 0, 0, 0.25)',
      border: 'solid 1px outline',
      borderRadius: 16,
      bg: 'text',
      color: 'white',
      fontFamily: 'Inter',
      fontSize: 18,
      cursor: 'pointer',
      '&:hover': {
        bg: 'darkGray',
      },
    },
    paymentContinue: {
      boxShadow: '0 0 12px rgba(0, 0, 0, 0.25)',
      border: 'solid 1px outline',
      borderRadius: 16,
      bg: 'text',
      color: 'white',
      fontFamily: 'Inter',
      fontSize: 16,
      cursor: 'pointer',
      '&:hover': {
        bg: 'darkGray',
      },
    },
    paymentCancel: {
      border: 'solid 1px',
      borderColor: 'outline',
      borderWidth: 1,
      borderRadius: 16,
      bg: 'transparent',
      color: 'text',
      fontFamily: 'Inter',
      fontSize: 16,
      cursor: 'pointer',
      '&:hover': {
        bg: 'outline',
      },
    },
    icon: {
      cursor: 'pointer',
      '&:hover': {
        bg: 'outline',
      },
    },
    iconselected: {
      cursor: 'pointer',
      bg: 'outline',
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
      borderColor: 'text',
      borderRadius: 4,
      bg: 'white',
    },
    shadowBlock: {
      p: 3,
      my: 2,
      bg: 'white',
      boxShadow: '0 0 8px rgba(0, 0, 0, 0.125)',
      borderRadius: 8,
      border: '1px solid outline',
    },
    primary: {
      paddingX: 3,
      paddingY: 2,
      borderRadius: 4,
    },
  },
  badges: {
    primary: {
      color: 'white',
      bg: 'text',
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
      // standard input
      bg: 'white',
      py: 2,
    },
    buttonLabel: {
      fontSize: '11px',
      fontFamily: 'Recursive',
      color: 'text',
      cursor: 'pointer',
      // fontWeight: 'bold',
    },
    settingsLabel: {
      fontSize: '15px',
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
      bg: 'outline',
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
