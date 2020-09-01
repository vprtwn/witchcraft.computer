import { Metadata, MetadataValue, OrderItem } from './typedefs';
import Stripe from 'stripe';
import fetchJson from '../lib/fetchJson';

export const postMetadataUpdate = async (
  key: string,
  value: MetadataValue,
  customerId: string,
  username: string,
  removedKey: string | null = null, // this is ugly
): Promise<MetadataValue> => {
  const update = {};
  update[key] = value;
  if (removedKey) {
    // TODO: refactor this & test
    update[removedKey] = null;
    if (removedKey.startsWith('c.')) {
      update[`${removedKey}.meta`] = null;
    }
  }
  const params = {
    username: username,
    metadata: update,
    customerId: customerId,
  };
  const newMetadata = await fetchJson(`/api/update_metadata`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
  let newVal = newMetadata[key];
  try {
    newVal = JSON.parse(newVal);
  } catch (e) {}
  return newVal;
};

/**
 * Performs a deep merge, then flattens the result to [string:string].
 * Local values are unserialized: {foo: [1, 2]}
 * Remote values are expected to be serialized strings: {foo: "[1,2]"}
 * Runs before POSTing a metadata update.
 */
export const syncMetadata = (local: Record<string, MetadataValue>, remote: Stripe.Metadata): Metadata => {
  const merged: Record<string, MetadataValue> = {};
  Object.keys(remote).forEach((k) => {
    const value = local[k];
    let remoteValue = remote[k];
    merged[k] = remoteValue;
    // overwrite remote arrays with local
    if (Array.isArray(value)) {
      merged[k] = value;
    }
    // overwrite remote strings with local
    else if (typeof value === 'string') {
      merged[k] = value;
    } else {
      // merge remote dicts with local
      let parsedValue = null;
      try {
        parsedValue = JSON.parse(remoteValue);
      } catch (e) {}
      if (parsedValue) {
        const newValue = parsedValue;
        const mergedValue = Object.assign(newValue, value);
        merged[k] = mergedValue;
      }
    }
  });
  // clear remote keys if explicitly set to null
  Object.keys(local).forEach((k) => {
    if (local[k] === null) {
      merged[k] = null;
    } else if (!merged[k]) {
      merged[k] = local[k];
    }
  });
  // console.log("merged", JSON.stringify(merged, null, 2));
  const flattened: Stripe.Metadata = {};
  // flatten
  Object.keys(merged).forEach((k) => {
    const value = merged[k];
    if (typeof value === 'string') {
      flattened[k] = value;
    } else {
      if (value) {
        flattened[k] = JSON.stringify(value);
      } else {
        flattened[k] = null;
      }
    }
  });
  return flattened;
};

export const readString = (
  metadata: Stripe.Metadata | null,
  key: string,
  defaultVal: string | null = null,
): string | null => {
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
  metadata: Stripe.Metadata | null,
  key: string,
  defaultVal: Record<string, string> | null = null,
): Record<string, string> | null => {
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

export const readOrder = (
  metadata: Stripe.Metadata | null,
  defaultVal: Array<OrderItem> | null = null,
): Array<OrderItem> | null => {
  if (!metadata) {
    return null;
  }
  let value = null;
  if (metadata['order']) {
    value = metadata['order'];
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

// type transformations
export const toDict = (metadataValue: MetadataValue): Record<string, string> => {
  const dict: Record<string, string> = {};
  if (!metadataValue || typeof metadataValue === 'string') {
    return dict;
  }
  Object.assign(dict, metadataValue);
  return dict;
};
