import { NextApiRequest, NextApiResponse } from 'next';
import { getCustomer } from '../../../lib/ops';
import { ErrorResponse } from '../../../lib/typedefs';
import Stripe from 'stripe';
import { getSession } from 'next-auth/client';
import { validateSession } from '../../../lib/validateSession';

/**
 * Returns a new signed upload URL.
 * If this is a child page, also returns an upload URL for the parent page.
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(400);
  }
  // TODO(#39): use JWT – more secure?
  // const token = await jwt.getToken({ req, secret });
  const session = await getSession({ req });
  const authError = validateSession(session, req);
  let error = null;
  if (authError) {
    return res.status(authError.httpStatus).json(authError);
  }
  let s3 = null;

  try {
    const AWS = require('aws-sdk');
    s3 = new AWS.S3();
    const config = {
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET,
      endpoint: 'https://traypages.s3-us-west-2.amazonaws.com',
      region: 'us-west-2',
    };
    AWS.config.update(config);
  } catch (e) {
    const message = 'Error initializing AWS SDK: ' + e.message;
    console.error(message);
    error = message;
  }

  const {
    query: { params },
  } = req;
  const username = params[0] as string;
  const pageId = params[1] as string;

  let uploadUrl = null;
  let parentUploadUrl = null;
  let stripeAccount = null;

  let stripeKey = process.env.STRIPE_SECRET_KEY;
  const stripe = require('stripe')(stripeKey);

  // get stripe account id
  const customerRes = await getCustomer(username);
  if (customerRes.errored) {
    const error = customerRes.data as ErrorResponse;
    return res.status(error.httpStatus).json(error);
  }
  const customer = customerRes.data as Stripe.Customer;
  const stripeAccountId = customer.metadata['stripe_account_id'];
  if (stripeAccountId) {
    try {
      stripeAccount = await stripe.accounts.retrieve(stripeAccountId);
    } catch (e) {
      const message = `Error retrieving Stripe account <${stripeAccountId}>: ` + e.message;
      console.error(message);
      error = message;
    }
  }

  let objectKey = `@${username}`;
  let parentObjectKey = null;
  try {
    if (pageId) {
      parentObjectKey = objectKey;
      objectKey = `@${username}/${pageId}`;
    }

    uploadUrl = await s3.getSignedUrlPromise('putObject', {
      Bucket: 'traypages',
      Key: objectKey,
      ContentType: 'application/json',
    });
    if (parentObjectKey) {
      parentUploadUrl = await s3.getSignedUrlPromise('putObject', {
        Bucket: 'traypages',
        Key: parentObjectKey,
        ContentType: 'application/json',
      });
    }
  } catch (e) {
    const message = `Error creating upload URL(s) <${objectKey}>, <${parentObjectKey}>: ` + e.message;
    error = message;
  }
  return res
    .status(200)
    .json({ error: error, uploadUrl: uploadUrl, parentUploadUrl: parentUploadUrl, stripeAccount: stripeAccount });
};
