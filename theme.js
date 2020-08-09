// example base theme from @theme-ui/presets
export default {
  breakpoints: ["40em", "52em", "64em"],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    heading: "inherit",
    monospace: "Recursive, Menlo, monospace",
    body:
      'Recursive, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
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
    text: "#000",
    white: "#fff",
    background: "#f7fafc",
    primary: "#e6fffa",
    outline: "#edf2f7",
    modes: {
      light: {
        text: "#000",
        background: "#fff",
        primary: "#e6fffa",
        outline: "#edf2f7",
      },
      darkNectarine: {
        text: "#fff",
        background: "#17223b",
        primary: "#ff6768",
        outline: "#263859",
      },
    },
  },
  buttons: {
    small: {
      px: 2,
      py: 1,
      color: "text",
      border: "solid",
      borderWidth: 1,
      bg: "transparent",
      fontSize: 13,
      fontFamily: "Recursive",
      cursor: "pointer",
    },
    tiny: {
      px: 1,
      py: 0,
      color: "text",
      border: "solid",
      borderWidth: 1,
      bg: "transparent",
      fontSize: 10,
      fontFamily: "Recursive",
      cursor: "pointer",
    },
    tinywide: {
      px: 2,
      py: 0,
      color: "text",
      border: "solid",
      borderWidth: 1,
      bg: "transparent",
      fontSize: 10,
      fontFamily: "Recursive",
      cursor: "pointer",
    },
    tip: {
      px: 2,
      py: 0,
      color: "text",
      border: "solid",
      borderWidth: 1,
      bg: "transparent",
      fontSize: "12px",
      fontFamily: "Recursive",
      cursor: "pointer",
    },
    icon: {
      px: 2,
      py: 1,
      color: "primary",
      bg: "transparent",
      fontSize: 13,
      cursor: "pointer",
    },
  },
  links: {
    nav: {
      fontWeight: "bold",
      color: "inherit",
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  },
  cards: {
    primary: {
      paddingX: 3,
      paddingY: 2,
      borderRadius: 4,
    },
  },
  badges: {
    primary: {
      color: "white",
      bg: "primary",
    },
    tiny: {
      px: 2,
      py: 0,
      color: "text",
      border: "solid",
      borderWidth: 1,
      bg: "transparent",
      fontSize: 10,
      fontFamily: "Recursive",
    },
    invisible: {
      color: "transparent",
      bg: "transparent",
    },
  },
  images: {
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 99999,
    },
  },
  forms: {
    label: {
      fontSize: "10px",
      fontFamily: "Recursive",
      color: "text",
    },
    settingslabel: {
      fontSize: "12px",
      fontWeight: "bold",
      fontFamily: "Recursive",
      color: "text",
    },
    tipText: {
      mx: 0,
      border: "2px solid",
      fontSize: "13px",
      fontFamily: "Recursive",
      py: 1,
      px: 2,
      ml: 1,
      "&:focus": {
        border: "2px solid",
        outline: "none",
      },
    },
  },
  text: {
    small: {
      fontSize: "12px",
    },
    heading: {
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
    },
    tipText: {
      borderColor: "outline",
      fontSize: "13px",
      fontFamily: "Recursive",
      py: 1,
      px: 0,
    },
  },
  styles: {
    a: {
      color: "#4299e1",
    },
    progress: {
      color: "primary",
      bg: "outline",
    },
    root: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",
    },
    h1: {
      variant: "text.heading",
      fontSize: 6,
    },
    h2: {
      variant: "text.heading",
      fontSize: 4,
    },
    h3: {
      variant: "text.heading",
      fontSize: 3,
    },
    h4: {
      variant: "text.heading",
      fontSize: 2,
    },
    h5: {
      variant: "text.heading",
      fontSize: 1,
    },
    h6: {
      variant: "text.heading",
      fontSize: 0,
    },
    pre: {
      fontFamily: "monospace",
      overflowX: "auto",
      code: {
        color: "inherit",
      },
    },
    code: {
      fontFamily: "monospace",
      fontSize: "inherit",
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: 0,
    },
    th: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    td: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
  },
};
