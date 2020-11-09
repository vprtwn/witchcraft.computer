import { updatePage } from './updatePage';

// TODO: sync payment settings to stripe customer
export const syncPaymentSettings = async function (uploadUrl: string, data: object, newSettings: object) {
  try {
    // await updatePage(uploadUrl, data, 'payment_settings', newSettings);
  } catch (e) {
    console.error(e);
  }
};

export const syncOrder = async function (
  uploadUrl: string,
  data: object,
  newOrder: Record<string, string>[],
  removedId: string | null = null,
) {
  try {
    await updatePage(uploadUrl, data, 'b.order', newOrder, removedId);
  } catch (e) {
    console.error(e);
  }
};
