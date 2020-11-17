# Tray

## Getting started

- Create an `.env.local` using credentials
- Install dependencies: `yarn`
- Run dev: `yarn dev`
- Run tests (jk who has the time): `jest`
- Successful builds on master automatically deploy to Vercel

## Tech overview

### Storage

- Pages are stored as JSON files on S3 (traydata bucket)
- There's some stripe integration stuff lying around. Might add it back but not feeling that inspired by payments <> tray right now.
- Curious about using [Cloudflare durable objects](https://blog.cloudflare.com/introducing-workers-durable-objects/) for collaborative storage (comments)

### Auth

- Twitter Oauth, using [NextAuthJS](https://next-auth.js.org/)
- I feel pretty strongly that Twitter-only auth is the way.

### UX

- [theme-ui](https://theme-ui.com/components) for components and theming. need to clean up theme.js and do a big audit (#78)
- Icons from https://icons.mono.company/

## Roadmap

Creators:

- Uploading audio
- Analytics

Consumers:

- Subscription with payouts to creators based on what you read
- Mobile app? focused on listening

## Documentation

### Updating the TextBlock Editor

Note: These instructions are for `rich-markdown-editor`, which I stopped using (see `52721ab`, last commit before removal).

- TextBlock uses a [forked rich-markdown-editor](https://github.com/mysterious-technology/rich-markdown-editor). Modifications on this fork are pretty minimal: visual (removing extraneous elements) and functional (removing unsupported elements)
- First, push to the `flexjar` branch of the fork.
  - I'm not sure if you have to run `yarn build` and commit those changes, or if that happens as part of yarn...
- When you're done, run
  - `yarn remove rich-markdown-editor`
  - `yarn cache clean`
  - `yarn add rich-markdown-editor@mysterious-technology/rich-markdown-editor#flexjar`
  - (Because we're pinned to a git branch, `yarn upgrade` doesn't work, you need to remove and re-add)
