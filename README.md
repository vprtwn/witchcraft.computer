# flexjar

## Getting started

- Create an `.env.local` using credentials
- Install dependencies: `yarn`
- Run dev: `yarn dev`
- Run unit tests: `jest`
- Changes on master should automatically deploy to Vercel

## About

### Storage

- Using metadata on Stripe Customer objects for storage.
- Just for fun, I'd like to push this as far as possible
- You get 40? keys and values of 500 chars, so it's pretty workable (and free).
- Maybe these limitations drive what's possible in the free tier of the product.

### Text editing

- Using a [forked rich-markdown-editor](https://github.com/mysterious-technology/rich-markdown-editor).
- Modifications: Removed different editor components (like image uploads, youtube embeds) that would take more work to support. It's possible these components should be standalone "Widget" types anyway, and not supported in the Text Widget.

### Auth

- Twitter-authentication only, using [NextAuthJS](https://next-auth.js.org/)

### UI

- Using [theme-ui](https://theme-ui.com/components) for components, theming, CSS-in-JS
- Icons from https://systemuicons.com/
