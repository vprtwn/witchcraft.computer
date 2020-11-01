import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { validateSession } from '../../lib/validateSession';
import { connectStripeAccount } from '../../lib/ops';
import { ErrorResponse } from '../../lib/typedefs';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return;
  }
  // TODO(#39): use JWT – more secure?
  // const token = await jwt.getToken({ req, secret });
  const session = await getSession({ req });
  const authError = validateSession(session, null);
  if (authError) {
    return res.status(authError.httpStatus).json(authError);
  }
  try {
    const AWS = require('aws-sdk');
    const s3 = new AWS.S3();
    const config = { accessKeyId: process.env.S3_ACCESS_KEY_ID, secretAccessKey: process.env.S3_SECRET };
    AWS.config.update(config);

    const filename = 'test-file';

    const url = await s3.getSignedUrlPromise('putObject', {
      Bucket: 'tray.club',
      Key: filename,
      ContentType: 'application/json',
      Expires: 60 * 3,
    });
    return res.status(200).json({ url: url });
  } catch (e) {
    const response: ErrorResponse = {
      errorCode: 'op_error',
      errorMessage: e.message,
      httpStatus: 500,
    };
    return res.status(response.httpStatus).json(response);
  }
};
