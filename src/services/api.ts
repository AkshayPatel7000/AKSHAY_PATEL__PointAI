// types used only in useSKUs — no imports needed here

const BASE_URL = 'https://t03.tryndbuy.com/api';
const AUTH_ID = '3c643a25e11144ad';

const headers = {
  authID: AUTH_ID,
  'Content-Type': 'application/json',
};

/**
 * Returns the full image URL for a given SKUID string.
 * e.g. "ITEM0002ZX44" → "https://demo03.tryndbuy.com/images/ITEM0002ZX44.jpg"
 */
export const getImageUrl = (skuid: string): string =>
  `https://demo03.tryndbuy.com/images/TH${skuid}.jpg`;

/**
 * Fetches the mapped SKU list from the TryndBuy API.
 * Returns raw response text so callers can JSON.parse() themselves.
 */
export const fetchMappedSKUs = async (): Promise<string> => {
  const response = await fetch(`${BASE_URL}/GetMappedSKUDetails`, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};
