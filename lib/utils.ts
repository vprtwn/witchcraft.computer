import { GOOGLE_FAVICONS } from './const';
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

export const linkStyleForUrl = (url: string, size: number): LinkStyle => {
  let color = 'black';
  let logo = null;
  const isUrl = require('is-url');
  if (!url) {
    return { borderColor: color, logo };
  }
  const sanitizedUrl = sanitizeUrl(url);
  if (!isUrl(sanitizedUrl)) {
    return { borderColor: color, logo };
  }
  const psl = require('psl');
  const parsedUrl = new URL(sanitizedUrl);
  const parsedHost = psl.parse(parsedUrl.host);
  const domain = parsedHost.domain;
   if (domain === 'behance.net' || domain === 'behance.com') {
    color = 'behance';
  } else if (domain === 'bandcamp.com') {
    color = 'bandcamp';
  } else if (domain === 'dribbble.com') {
    color = 'dribbble';
  } else if (domain === 'goodreads.com') {
    color = 'goodreads';
  } else if (domain === 'instagram.com') {
    color = 'instagram';
  } else if (domain === 'paypal.com') {
    color = 'paypal';
  } else if (domain === 'pinterest.com') {
    color = 'pinterest';
  } else if (domain === 'cash.app') {
    color = 'squareCash';
  } else if (domain === 'soundcloud.com') {
    color = 'soundcloud';
  } else if (domain === 'spotify.com') {
    color = 'spotify';
  } else if (domain === 'twitter.com' || domain === 't.co') {
    color = 'twitter';
  } else if (domain === 'venmo.com') {
    color = 'venmo';
  } else if (domain === 'youtube.com' || domain === 'youtu.be') {
    color = 'youtube';
  }

  logo = `${GOOGLE_FAVICONS}?domain=${domain}&sz=${size}`
  return { borderColor: color, logo };
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

// returns [username, page id]
export const parseUploadUrl = (inputUrl: string): [string | null, string | null] => {
  if (!isUrl(inputUrl)) {
    DEBUG && console.error('not a url');
    return [null, null];
  }
  let url = inputUrl;
  const parsedUrl = new URL(url);
  const parsedHost = psl.parse(parsedUrl.host);
  const domain = parsedHost.domain;
  if (!domain) {
    DEBUG && console.error('failed to parse domain: ', url);
    return [null, null];
  }
  let allowedDomains = ['amazonaws.com'];
  if (!allowedDomains.includes(domain)) {
    DEBUG && console.error('not an allowed domain: ', domain);
    return [null, null];
  }

  const pathname = parsedUrl.pathname;
  // /bgdotjpg
  // /bgdotjpg/12345

  const pathComps = pathname.split('/').filter((c) => c.length > 0);
  console.log('pathComps', pathComps);
  let username = pathComps[0];
  username = unprefixUsername(username);
  const pageId = pathComps[1];
  if (pageId) {
    return [username, pageId];
  }
  return [username, null];
};

export const emailFromUsername = (username: string): string => {
  return `${username}+twitter@tray.club`;
};

export const unprefixUsername = (username: string): string => {
  let newUsername = username;
  if (username.startsWith('@')) {
    newUsername = username.replace('@', '');
  }
  if (username.startsWith('%40')) {
    newUsername = username.replace('%40', '');
  }
  return newUsername;
};
