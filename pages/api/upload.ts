import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { validateSession } from '../../lib/validateSession';
import jwt from 'next-auth/jwt';
const secret = process.env.SECRET;
import fetchJson from '../../lib/fetchJson';

/**
 * Uploads data to a signed S3 URL.
 * Should really do this client-side and avoid the roundtrip, but I can't figure out S3 CORS settings.
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return;
  }
  const params = JSON.parse(req.body);

  const uploadUrl = params.uploadUrl;
  const payload = params.payload;
  console.dir(params);

  try {
    const response = await fetch(uploadUrl, {
      method: 'PUT',
      body: JSON.stringify(payload, null, 2),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.status(response.status).json(response.headers);
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};
