import fetchJson from './fetchJson';

export const transformPageData = (
  pageData: object,
  key: string,
  value: object | string,
  removedKey: string | null = null, // this is ugly
  order: Record<string, string>[] | null = null,
): object | null => {
  if (!pageData) {
    return null;
  }
  const result = pageData;
  result[key] = value;
  if (removedKey) {
    delete result[removedKey];
  }
  if (order) {
    result['b.order'] = order;
  }
  if (result) {
    const latestOrder = result['b.order'];
    if (latestOrder) {
      const orderIds = latestOrder.map((item) => item.i);
      const pageKeys = Object.keys(result).filter((item) => item.startsWith('b.') && item !== 'b.order');
      pageKeys.forEach((k) => {
        if (!orderIds.includes(k)) {
          delete result[k];
        }
      });
    }
  }
  return result;
};

export const updatePage = async (uploadUrl: string, data: object): Promise<object> => {
  if (!uploadUrl) {
    return { error: 'no upload URL' };
  }
  console.log('updating page', data);
  try {
    const params = {
      uploadUrl: uploadUrl,
      payload: data,
    };
    const result = await fetchJson('/api/upload', {
      method: 'POST',
      body: JSON.stringify(params),
    });
    console.log('result', result);
    return result;
  } catch (e) {
    return { error: e.message };
  }
};
