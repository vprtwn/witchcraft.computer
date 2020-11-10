import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Scrape metadata from a URL
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(500);
  }

  const {
    query: { b64url },
  } = req;

  const atob = require('abab/lib/atob');
  const got = require('got');
  const metascraper = require('metascraper')([
    require('metascraper-title')(),
    require('metascraper-description')(),
    require('metascraper-author')(),
    require('metascraper-spotify')(),
    require('metascraper-soundcloud')(),
    require('metascraper-youtube')(),
    require('metascraper-amazon')(),
  ]);

  let metadata = null;

  try {
    let targetUrl = atob(b64url as string);
    const response = await fetch(targetUrl);
    let html = await response.text();
    metadata = await metascraper({ url: targetUrl, html });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }

  res.json({ metadata: metadata });
};
