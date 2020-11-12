export const updatePage = async (
  uploadUrl: string,
  currentPage: object,
  key: string,
  value: object | string,
  removedKey: string | null = null, // this is ugly
  order: Record<string, string>[] | null = null,
): Promise<object> => {
  console.log('updatePage', uploadUrl);
  if (!currentPage) {
    return;
  }
  try {
    const payload = currentPage;
    payload[key] = value;
    if (removedKey) {
      delete payload[removedKey];
    }
    if (order) {
      payload['b.order'] = order;
    }
    const params = {
      uploadUrl: uploadUrl,
      payload: payload,
    };
    const result = await fetch('/api/upload', {
      method: 'POST',
      body: JSON.stringify(params),
    });
    console.log('updatePage', result.status);
    return payload;
  } catch (e) {
    return { error: e.message };
  }
};
