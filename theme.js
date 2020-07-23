// example base theme from @theme-ui/presets
export default {
  breakpoints: ["40em", "52em", "64em"],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    heading: "inherit",
    monospace: "Cascadia Code, Menlo, monospace",
    body:
      'HK Grotesk, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  colors: {
    text: "#000",
    background: "#fff",
    primary: "#1a202c",
    secondary: "#30c",
    error: "#c53030",
    lightgreen: "#c6f6d5",
    verylightgreen: "#f0fff4",
    lightindigo: "#c3dafe",
    lightteal: "#b2f5ea",
    lightpink: "#fed7e2",
    verylightyellow: "#fffff0",
    lightyellow: "#fefcbf",
    lightpurple: "#e9d8fd",
    verylightpurple: "#faf5ff",
    lightorange: "#fbd38d",
    verylightorange: "#FFF6E1",
    lightblue: "#bee3f8",
    lightgray: "#edf2f7",
    verylightgray: "#f7fafc",
    verylightteal: "#e6fffa",
    mediumgray: "#cbd5e0",
    darkgray: "#a0aec0",
    lightblue: "#bee3f8",
    mediumyellow: "#f6e05e",
    mediumorange: "#fbd38d",
  },
  buttons: {
    primary: {
      color: "background",
      bg: "primary",
      border: "solid",
      borderWidth: 1,
      cursor: "pointer",
      "&:hover": {
        borderWidth: 1,
        bg: "background",
        color: "primary",
      },
    },
    marketing: {
      color: "background",
      bg: "primary",
      fontSize: 20,
      fontWeight: "bold",
      variant: "text.heading",
      // fontFamily: "monospace",
      fontWeight: "medium",
      border: "solid",
      borderWidth: 2,
      borderRadius: 8,
      // whiteSpace: "nowrap",
      "&:hover": {
        borderWidth: 2,
        bg: "background",
        color: "primary",
      },
    },
    small: {
      px: 2,
      py: 1,
      color: "primary",
      border: "solid",
      borderWidth: 1,
      bg: "transparent",
      fontSize: 13,
      cursor: "pointer",
    },
    setup: {
      px: 0,
      py: 0,
      bg: "transparent",
      fontWeight: "bold",
      fontSize: 18,
      color: "inherit",
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
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
      boxShadow: "0 0 8px rgba(0, 0, 0, 0.125)",
      marginX: 2,
      marginY: 4,
      maxWidth: 800,
    },
    flat: {
      paddingX: 3,
      paddingY: 2,
      borderRadius: 4,
      border: "1px solid",
      borderColor: "mediumgray",
      maxWidth: 800,
    },
  },
  badges: {
    primary: {
      color: "background",
      bg: "primary",
    },
    large: {
      color: "background",
      bg: "primary",
      fontSize: 13,
      my: 2,
      py: 1,
      px: 2,
    },
  },
  images: {
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 99999,
    },
  },
  textarea: {
    borderColor: "mediumgray",
    pl: 3,
    "&:focus": {
      borderColor: "mediumorange",
      bg: "verylightorange",
    },
    "::selection": {
      bg: "mediumyellow",
    },
  },
  text: {
    heading: {
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
    },
  },
  styles: {
    a: {
      color: "#4299e1",
    },
    progress: {
      color: "lightorange",
      bg: "lightindigo",
    },
    root: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",
    },
    h1: {
      variant: "text.heading",
      fontSize: 5,
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
