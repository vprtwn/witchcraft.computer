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
    modes: {
      light: {
        text: "#000",
        background: "#fff",
        primary: "#000",
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
      color: "primary",
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
