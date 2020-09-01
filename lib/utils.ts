import { customAlphabet } from 'nanoid';
import { OrderItem } from './typedefs';

// list utils (for drag and drop)
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

// string utils
// TODO: different cards for different types
export const generateCardId = (): string => {
  const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 6);
  const id = nanoid();
  return `c.${id}`;
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
