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
    background: '#f7fafc',
    primary: '#e6fffa',
    outline: '#edf2f7',
    modes: {
      light: {
        text: '#000',
        background: '#fff',
        primary: '#e6fffa',
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
    small: {
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
      py: 0,
      color: 'text',
      border: 'solid',
      borderWidth: 1,
      bg: 'transparent',
      fontSize: 10,
      fontFamily: 'Recursive',
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
    primary: {
      paddingX: 3,
      paddingY: 2,
      borderRadius: 4,
    },
  },
  badges: {
    primary: {
      color: 'white',
      bg: 'primary',
    },
    tiny: {
      px: 2,
      py: 0,
      color: 'text',
      border: 'solid',
      borderWidth: 1,
      bg: 'transparent',
      fontSize: 10,
      fontFamily: 'Recursive',
    },
    invisible: {
      color: 'transparent',
      bg: 'transparent',
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
    formlabel: {
      fontSize: '13px',
      fontFamily: 'Recursive',
      color: 'text',
    },
    input: {
      bg: 'white',
      py: 1,
    },
    buttonlabel: {
      fontSize: '11px',
      fontFamily: 'Recursive',
      color: 'text',
      // fontWeight: 'bold',
    },
    settingslabel: {
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
      color: 'primary',
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
