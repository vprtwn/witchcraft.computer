# 0l0

## Getting started

- Create an `.env.local` using the info from the Paper brainstorming doc
- `yarn` (install dependencies)
- `yarn dev` (run locally)
- Changes merged to master will automatically deploy to Vercel. (vercel teams costs \$20/month, easier to just use the Github integration)

## remark plugins to investigate

- embeds aren't working (haven't gotten any of the remark plugins to work)
- maybe embeds should be a separate card type anyway...

- https://github.com/kevin940726/remark-codesandbox
- https://github.com/zestedesavoir/zmarkdown/tree/HEAD/packages/remark-grid-tables
- viz
  - https://github.com/temando/remark-mermaid
  - https://github.com/temando/remark-graphviz
  - https://github.com/shedali/remark-smcat
- https://github.com/hanford/remark-slate
- https://github.com/zestedesavoir/zmarkdown/tree/HEAD/packages/remark-ping
- https://github.com/RichardLitt/remark-title
- https://github.com/Nevenall/remark-terms
- typography
  - https://github.com/mavrin/remark-typograf
  - https://github.com/remarkjs/remark-textr
  - https://github.com/Swizec/remark-utf8

## mdx/runtime, hast, rehype, oh my

This stuff is confusing.

- I tried using hast-util-sanitize with GH defaults: https://github.com/syntax-tree/hast-util-sanitize#schema
- This was tricky. I couldn't figure out how to avoid syntax errors bubbling up to the frontend, and it didn't seem like sanitization was happening. It's late though, and I might be missing something (dropping a code snippet below to pick up later, maybe)
- NextJS throws an error overlay on syntax errors within react-live. I think this is because I'm rendering MDX within react-live, or something... If you could disable the error overlay, that could be a path forward: https://github.com/vercel/next.js/issues/13387
- I thought it _might_ be possible to conditionally render after running
  babel-standalone's parse on the JSX, but that seems tricky and beyond my abilities. Possibly slow, too.
- I also thought: maybe there's a rehype or hast plugin that can do this. I didn't find one, but don't really know how to use these plugins (in the context of the MDX runtime)

  - https://github.com/rehypejs/rehype/blob/main/doc/plugins.md#list-of-plugins
  - https://github.com/syntax-tree/hast#list-of-utilities

- I decided to abandon MDX and just use MD with remark plugins (seems like there are some nice plugins, and it's more user-friendly than JSX components anyway)
- Using rehype-sanitize (rather than the above technique) is basically strict markdown only.
- This conversation seems to suggest this also: https://spectrum.chat/mdx/general/runtime-users-how-do-you-deal-with-xss-sanitization~bc2b8f66-f3af-4920-a012-2500a5639fb2

```
var merge = require("deepmerge");
var gh = require("hast-util-sanitize/lib/github");
var sanitize = require("hast-util-sanitize");
var assert = require("hast-util-assert");
var raw = require("hast-util-raw");
...
var schema = merge(gh, { tagNames: { "*": ["Demo"] } });
...
render(<MDX remarkPlugins={[emoji]} rehypePlugins={[sanitize, {schema: schema}]} components={components}>{\
```
