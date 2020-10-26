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
  const result = Array.from(list) as OrderItem[];
  result.push(newObject);
  return result;
};

//====== string utils =======
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
  if (type === 'link' && comps.length === 3) {
    return BlockType.Link;
  } else if (type === 'text' && comps.length === 3) {
    return BlockType.Text;
  }
  return BlockType.Unknown;
};

// twitter username from url
export const usernameFromUrl = (inputUrl: string): string | null => {
  if (!isUrl(inputUrl)) {
    DEBUG && console.error('not a url');
    return null;
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
    return null;
  }
  let allowedDomains = ['tray.club'];
  if (process.env.NODE_ENV !== 'production') {
    allowedDomains = allowedDomains.concat(['127.0.0.1:3000', 'localhost:3000']);
  }
  if (!allowedDomains.includes(domain)) {
    DEBUG && console.error('not an allowed domain: ', domain);
    return null;
  }

  const pathname = parsedUrl.pathname; // /benzguo/status/12345

  const pathComps = pathname.split('/');
  if (pathComps.length !== 2) {
    DEBUG && console.error('not enough path components');
    return null;
  }
  const username = pathComps[pathComps.length - 1];
  return unprefixUsername(username);
};

export const emailFromUsername = (username: string): string => {
  return `${username}+twitter@jar.bio`;
};

export const generateUserPath = (username: string): string => {
  return `/@${username}`;
};

export const unprefixUsername = (username: string): string => {
  let newUsername = username;
  if (username.startsWith('@')) {
    newUsername = username.replace('@', '');
  }
  return newUsername;
};

export const validateStripeConnectParams = (
  state: string[] | string | null,
  code: string[] | string | null,
): boolean => {
  return code && code !== 'undefined' && state && state !== 'undefined';
};
