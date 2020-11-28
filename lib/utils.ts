import { customAlphabet } from 'nanoid';
import { OrderItem, BlockType } from './typedefs';
const psl = require('psl');
const isUrl = require('is-url');

let DEBUG = false;

//====== list utils (for drag and drop) =======
export const reorder = (list, startIndex, endIndex): OrderItem[] => {
  const result = Array.from(list) as OrderItem[];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const remove = (list, index): { removedId: string; items: OrderItem[] } => {
  const result = Array.from(list) as OrderItem[];
  const [removed] = result.splice(index, 1);
  return { removedId: removed.i, items: result };
};

export const add = (list, newObject): OrderItem[] => {
  if (!list) {
    return [];
  }
  const result = Array.from(list) as OrderItem[];
  result.push(newObject);
  return result;
};

//====== string utils =======
// page IDs are unique per user. 14,000 required for 1% chance of collision.
export const generatePageId = (): string => {
  const nanoid = customAlphabet('0123456789', 10);
  return nanoid();
};

export const generatePageBlockId = (pageId: string): string => {
  return `b.page.${pageId}`;
};

export const generateBlockId = (type: BlockType): string => {
  const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 6);
  const id = nanoid();
  let typeString: string;
  switch (type) {
    case BlockType.Link:
      typeString = 'link';
      break;
    case BlockType.Text:
      typeString = 'text';
      break;
    case BlockType.Page:
      typeString = 'page';
      break;
  }
  return `b.${typeString}.${id}`;
};

export const parseBlockId = (id: string): BlockType => {
  if (!id.startsWith('b.')) {
    return BlockType.Unknown;
  }
  const comps = id.split('.');
  if (comps.length < 2) {
    return BlockType.Unknown;
  }
  const type = comps[1];
  if (comps.length === 3) {
    if (type === 'link') {
      return BlockType.Link;
    } else if (type === 'text') {
      return BlockType.Text;
    } else if (type === 'page') {
      return BlockType.Page;
    }
  }

  return BlockType.Unknown;
};

export interface LinkStyle {
  borderColor: string;
  logo: string | null;
}

// previously, UI allowed setting e.g. "producthunt.com" as a url
export const sanitizeUrl = (url: string): string => {
  if (url && !url.includes('://') && !url.startsWith('https://') && !url.startsWith('https://')) {
    return `http://${url}`;
  }
  return url;
};

export const linkStyleForUrl = (url: string): LinkStyle => {
  let color = 'black';
  let logo = null;
  const isUrl = require('is-url');
  if (!url) {
    return { borderColor: color, logo: logo };
  }
  const sanitizedUrl = sanitizeUrl(url);
  if (!isUrl(sanitizedUrl)) {
    return { borderColor: color, logo: logo };
  }
  const psl = require('psl');
  const parsedUrl = new URL(sanitizedUrl);
  const parsedHost = psl.parse(parsedUrl.host);
  const domain = parsedHost.domain;
  if (domain === 'airbnb.com') {
    logo = 'airbnb';
  } else if (domain === 'amazon.com') {
    logo = 'amazon';
  } else if (domain === 'angellist.com') {
    logo = 'angellist';
  } else if (domain === 'audible.com') {
    logo = 'audible';
  } else if (domain === 'apple.com') {
    logo = 'apple';
  } else if (domain === 'behance.net' || domain === 'behance.com') {
    logo = 'behance';
  } else if (domain === 'bandcamp.com') {
    color = 'bandcamp';
    logo = 'bandcamp';
  } else if (domain === 'codepen.com') {
    logo = 'codepen';
  } else if (domain === 'deezer.com') {
    logo = 'deezer';
  } else if (domain === 'dev.to') {
    logo = 'dev_to';
  } else if (domain === 'dribbble.com') {
    logo = 'dribbble';
    color = 'dribbble';
  } else if (domain === 'discord.gg' || domain === 'discord.com') {
    logo = 'discord';
  } else if (domain === 'dropbox.com') {
    logo = 'dropbox';
  } else if (domain === 'ebay.com') {
    logo = 'ebay';
  } else if (domain === 'etsy.com') {
    logo = 'etsy';
  } else if (domain === 'facebook.com' || domain == 'fb.me') {
    logo = 'facebook';
  } else if (domain === 'flattr.com') {
    logo = 'flattr';
  } else if (domain === 'flickr.com') {
    logo = 'flickr';
  } else if (domain === 'figma.com') {
    logo = 'figma';
  } else if (domain === 'github.com') {
    logo = 'github';
  } else if (domain === 'gitlab.com') {
    logo = 'gitlab';
  } else if (domain === 'glitch.com') {
    logo = 'glitch';
  } else if (domain === 'goodreads.com') {
    color = 'goodreads';
    logo = 'goodreads';
  } else if (domain === 'instagram.com') {
    logo = 'instagram';
  } else if (domain === 'keybase.io') {
    logo = 'keybase';
  } else if (domain === 'kickstarter.com') {
    logo = 'kickstarter';
  } else if (domain === 'ko-fi.com') {
    logo = 'ko-fi';
  } else if (domain === 'liberapay.com') {
    logo = 'liberapay';
  } else if (domain === 'linkedin.com') {
    logo = 'linkedin';
  } else if (domain === 'medium.com') {
    logo = 'medium';
  } else if (domain === 'messenger.com') {
    logo = 'messenger';
  } else if (domain === 'netflix.com') {
    logo = 'netflix';
  } else if (domain === 'netflix.com') {
    logo = 'netflix';
  } else if (domain === 'patreon.com') {
    logo = 'patreon';
  } else if (domain === 'paypal.com') {
    logo = 'paypal';
    color = 'paypal';
  } else if (domain === 'pinterest.com') {
    logo = 'pinterest';
    color = 'pinterest';
  } else if (domain === 'producthunt.com') {
    logo = 'producthunt';
  } else if (domain === 'reddit.com') {
    logo = 'reddit';
  } else if (domain === 'cash.app') {
    logo = 'square_cash';
    color = 'squareCash';
  } else if (domain === 'signal.org') {
    logo = 'signal';
  } else if (domain === 'stackoverflow.com') {
    logo = 'stackoverflow';
  } else if (domain === 'stackexchange.com') {
    logo = 'stackexchange';
  } else if (domain === 'steampowered.com') {
    logo = 'steam';
  } else if (domain === 'stitcher.com') {
    logo = 'stitcher';
  } else if (domain === 'strava.com') {
    logo = 'strava';
  } else if (domain === 'soundcloud.com') {
    logo = 'soundcloud';
    color = 'soundcloud';
  } else if (domain === 'spotify.com') {
    logo = 'spotify';
    color = 'spotify';
  } else if (domain === 'telegram.org' || domain == 't.me') {
    logo = 'telegram';
  } else if (domain === 'trello.com') {
    logo = 'trello';
  } else if (domain === 'twitter.com' || domain === 't.co') {
    color = 'twitter';
    logo = 'twitter';
  } else if (domain === 'twitch.com') {
    logo = 'twitch';
  } else if (domain === 'venmo.com') {
    color = 'venmo';
    logo = 'venmo';
  } else if (domain === 'vimeo.com') {
    logo = 'vimeo';
  } else if (domain === 'wikipedia.com') {
    logo = 'wikipedia';
  } else if (domain === 'yelp.com') {
    logo = 'yelp';
  } else if (domain === 'youtube.com' || domain === 'youtu.be') {
    color = 'youtube';
    logo = 'youtube';
  }
  return { borderColor: color, logo: logo };
};

// returns [username, page id]
export const parseTrayUrl = (inputUrl: string): [string | null, string | null] => {
  if (!isUrl(inputUrl)) {
    DEBUG && console.error('not a url');
    return [null, null];
  }
  let url = inputUrl;
  const localhostDomain = 'http://127.0.0.1:3000';
  if (url.startsWith(localhostDomain)) {
    url = url.replace(localhostDomain, 'https://tray.club');
  }
  const parsedUrl = new URL(url);
  const parsedHost = psl.parse(parsedUrl.host);
  const domain = parsedHost.domain;
  if (!domain) {
    DEBUG && console.error('failed to parse domain: ', url);
    return [null, null];
  }
  let allowedDomains = ['tray.club'];
  if (process.env.NODE_ENV !== 'production') {
    allowedDomains = allowedDomains.concat(['127.0.0.1:3000', 'localhost:3000']);
  }
  if (!allowedDomains.includes(domain)) {
    DEBUG && console.error('not an allowed domain: ', domain);
    return [null, null];
  }

  const pathname = parsedUrl.pathname;
  // /bgdotjpg
  // /bgdotjpg/12345
  // /pay/bgdotjpg

  const pathComps = pathname.split('/').filter((c) => c.length > 0);
  console.log('pathComps', pathComps);
  let username = pathComps[0];
  if (username === 'pay') {
    username = pathComps[1];
    username = unprefixUsername(username);
    if (username) {
      return [username, null];
    }
  } else {
    username = unprefixUsername(username);
    const pageId = pathComps[1];
    if (pageId) {
      return [username, pageId];
    }
    return [username, null];
  }
};

export const emailFromUsername = (username: string): string => {
  return `${username}+twitter@tray.club`;
};

export const unprefixUsername = (username: string): string => {
  let newUsername = username;
  if (username.startsWith('@')) {
    newUsername = username.replace('@', '');
  }
  return newUsername;
};
