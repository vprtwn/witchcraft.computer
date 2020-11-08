# Tray

## Getting started

- Create an `.env.local` using credentials
- Install dependencies: `yarn`
- Run dev: `yarn dev`
- Run tests (jk who has time for tests): `jest`
- Successful builds on master automatically deploy to Vercel

## Tech

### Storage

- Pages are stored as JSON files on S3 (traypages bucket)
- Read-only user settings are stored on  Stripe customer metadata
- Every page has a tip button. Tip comments are descriptions on Stripe PaymentIntents, and can be displayed (optionally) as a feed on any page.
- Curious about using [Cloudflare durable objects](https://blog.cloudflare.com/introducing-workers-durable-objects/) for collaborative storage (comments)

### Auth

- Twitter Oauth, using [NextAuthJS](https://next-auth.js.org/)

### UX

- Using [theme-ui](https://theme-ui.com/components) for components, theming, CSS-in-JS
- Icons from https://icons.mono.company/

## Roadmap

Creators:
- Subpages
- Rich links (customized for Youtube, Spotify)
- Upload audio
- Analytics
- Subscription with payouts to creators based on what you view. 

Consumers: Mobile app, favorites, discovery, following, etc. Spotify x Tumblr x Bandcamp.

## Documentation

### Updating the TextBlock Editor

- TextBlock uses a [forked rich-markdown-editor](https://github.com/mysterious-technology/rich-markdown-editor)
- First, push to the `flexjar` branch of the fork.
  - I'm not sure if you have to run `yarn build` and commit those changes, or if that happens as part of yarn...
- When you're done, run
  - `yarn remove rich-markdown-editor`
  - `yarn cache clean`
  - `yarn add rich-markdown-editor@mysterious-technology/rich-markdown-editor#flexjar`
  - (Because we're pinned to a git branch, `yarn upgrade` doesn't work, you need to remove and re-add)
- Modifications on this fork are pretty minimal: visual (removing extraneous elements) and functional (removing unsupported elements)





