import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Uploads data to a signed S3 URL.
 * Should really do this client-side and avoid the roundtrip, but I can't figure out S3 CORS settings.
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(500);
  }

  const AWS = require('aws-sdk');
  const s3 = new AWS.S3();
  const config = { accessKeyId: process.env.S3_ACCESS_KEY_ID, secretAccessKey: process.env.S3_SECRET };
  AWS.config.update(config);

  const {
    query: { params },
  } = req;
  const username = params[0];
  const pageId = params[1];

  try {
    let objectKey = `@${username}`;
    if (pageId) {
      objectKey = `@${username}/${pageId}`;
    }
    const s3data = await s3
      .getObject({
        Bucket: 'traypages',
        Key: objectKey,
      })
      .promise();
    const object = s3data.Body.toString('utf-8');
    const json = JSON.parse(object);
    return res.status(200).json({ title: json.title });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};
