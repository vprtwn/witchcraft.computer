import { OrderItem } from './typedefs';
import Stripe from 'stripe';
import fetchJson from '../lib/fetchJson';

export const updatePage = async (
  uploadUrl: string,
  currentPage: object,
  key: string,
  value: object | string,
  removedKey: string | null = null, // this is ugly
  order: Record<string, string>[] | null = null,
): Promise<object> => {
  try {
    const payload = currentPage;
    payload[key] = value;
    if (removedKey) {
      // TODO: refactor this & test
      payload[removedKey] = null;
    }
    if (order) {
      payload['b.order'] = order;
    }
    const params = {
      uploadUrl: uploadUrl,
      payload: payload,
    };
    const result = await fetchJson('api/upload', {
      method: 'POST',
      body: JSON.stringify(params),
    });
    return payload;
  } catch (e) {
    return { error: e.message };
  }
};

export const readString = (metadata: object | null, key: string, defaultVal: string | null = null): string | null => {
  if (!metadata) {
    return null;
  }
  let value = defaultVal;
  if (metadata[key]) {
    value = metadata[key];
  }
  let parsedValue = null;
  try {
    parsedValue = JSON.parse(value);
  } catch (e) {}
  if (parsedValue) {
    return defaultVal;
  }
  return value;
};

export const readDict = (
  metadata: object | null,
  key: string,
  defaultVal: Record<string, string | number | null> | null = null,
): Record<string, string | number | null> | null => {
  if (!metadata) {
    return null;
  }
  let value = null;
  if (metadata[key]) {
    value = metadata[key];
  }
  let parsedValue = null;
  try {
    parsedValue = JSON.parse(value);
  } catch (e) {}
  if (!parsedValue || Array.isArray(parsedValue)) {
    return defaultVal;
  }
  return parsedValue;
};

export const readBlockOrder = (
  metadata: object | null,
  defaultVal: Array<OrderItem> | null = null,
): Array<OrderItem> | null => {
  if (!metadata) {
    return defaultVal;
  }
  let value = null;
  if (metadata['b.order']) {
    value = metadata['b.order'];
  } else {
    return defaultVal;
  }
  let parsedValue: Array<OrderItem> = defaultVal;
  try {
    parsedValue = JSON.parse(value);
  } catch (e) {}
  if (Array.isArray(parsedValue)) {
    return parsedValue as Array<OrderItem>;
  }
  return defaultVal;
};
