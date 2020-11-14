import { NextApiRequest, NextApiResponse } from 'next';
import { ErrorResponse } from '../../lib/typedefs';
import { AWS_ENDPOINT, AWS_REGION, AWS_BUCKET } from '../../lib/const';

// PUBLIC, UNAUTHENTICATED, KINDA DANGEROUS
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return;
  }
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
    const users = rawList.filter((o) => !o['Key'].includes('/') && o.Size > 500);
    res.json({ users: users });
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
