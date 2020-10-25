# Tray

## Getting started

- Create an `.env.local` using credentials
- Install dependencies: `yarn`
- Run dev: `yarn dev`
- Run unit tests: `jest`
- Changes on master should automatically deploy to Vercel (as long as the build succeeds)

## About

### Storage

- Using metadata on Stripe Customer objects for storage.
- Just for fun, I'd like to push this as far as possible
- You get 40? keys and values of 500 chars, so it's pretty workable (and free).
- Maybe these limitations drive what's possible in the free tier of the product.

### Updating the TextBlock Editor

- TextBlock uses a [forked rich-markdown-editor](https://github.com/mysterious-technology/rich-markdown-editor)
- First, push to the `flexjar` branch of the fork.
  - I'm not sure if you have to run `yarn build` and commit those changes, or if that happens as part of yarn...
- When you're done, run
  - `yarn remove rich-markdown-editor`
  - `yarn cache clean`
  - `yarn add rich-markdown-editor@mysterious-technology/rich-markdown-editor#flexjar`
  - (Because we're pinned to a git branch, `yarn upgrade` doesn't seem to work)
- Modifications are a combination of visual (removing extraneous elements) and functional (removing elements we don't support)

### Auth

- Twitter-authentication only, using [NextAuthJS](https://next-auth.js.org/)

### UI

- Using [theme-ui](https://theme-ui.com/components) for components, theming, CSS-in-JS
- Icons from https://systemuicons.com/
