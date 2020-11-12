export const transformPageData = (
  pageData: object,
  key: string,
  value: object | string,
  removedKey: string | null = null, // this is ugly
  order: Record<string, string>[] | null = null,
): object => {
  const result = pageData;
  result[key] = value;
  if (removedKey) {
    delete result[removedKey];
  }
  if (order) {
    result['b.order'] = order;
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
    const result = await fetch('/api/upload', {
      method: 'POST',
      body: JSON.stringify(params),
    });
    console.log('result', result);
    return data;
  } catch (e) {
    return { error: e.message };
  }
};
