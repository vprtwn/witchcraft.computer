import { NextApiRequest, NextApiResponse } from 'next';
import { ErrorResponse, BlockType } from '../../lib/typedefs';
import fetchJson from '../../lib/fetchJson';
import { AWS_ENDPOINT, AWS_REGION, AWS_BUCKET } from '../../lib/const';
import { parseBlockId } from '../../lib/utils';

// PUBLIC, UNAUTHENTICATED, KINDA DANGEROUS
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return;
  }
  const fetchData = async (userKey: string): Promise<object | null> => {
    try {
      const url = AWS_ENDPOINT + '/' + userKey;
      const d = await fetchJson(url);
      return d;
    } catch (e) {
      return null;
    }
  };

  try {
    const AWS = require('aws-sdk');
    const s3 = new AWS.S3({
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET,
      region: AWS_REGION,
    });

    const response = await s3
      .listObjectsV2({
        Bucket: AWS_BUCKET,
        Prefix: '@',
      })
      .promise();
    const rawList = response['Contents'];
    const users = rawList.filter((o) => !o['Key'].includes('/'));
    const sortedUsers = users.sort((a, b) => {
      return b['LastModified'] - a['LastModified'];
    });
    const userPages = await Promise.all(sortedUsers.map((u) => fetchData(u.Key)));
    const filteredPages = userPages.filter((p) => {
      let hide = false;
      const order = p['b.order'];
      if (order || (order && order.length === 0)) {
        hide = true;
      }
      let hasValidBlock = false;
      if (order) {
        order.forEach((k) => {
          const id = k.i;
          const type = parseBlockId(id);
          const block = p[id];
          if (type === BlockType.Page && block.title !== '' && block.title !== 'New page') {
            hasValidBlock = true;
          }
          if (type === BlockType.Link && block.text.length > 0 && block.url.length > 0) {
            hasValidBlock = true;
          }
          if (type === BlockType.Text && block !== 'edit me') {
            hasValidBlock = true;
          }
        });
      }
      hide = !hasValidBlock;
      return !hide;
    });

    const result = { users: filteredPages };
    res.json(result);
  } catch (e) {
    const response: ErrorResponse = {
      errorCode: 's3_error',
      errorMessage: e.message,
      httpStatus: 500,
    };
    console.log('error', e);
    res.status(response.httpStatus).json(response);
  }
};
