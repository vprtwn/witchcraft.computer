const withCSS = require("@zeit/next-css");
const withMDX = require("@next/mdx")({
  extension: /\.(md|mdx)$/,
});

module.exports = withCSS(
  withMDX({
    pageExtensions: ["mdx", "jsx", "js", "ts", "tsx"],
    webpack: (config, { isServer }) => {
      // Fixes npm packages that depend on `fs` module
      if (!isServer) config.node = { fs: "empty" };
      return config;
    },
  })
);
