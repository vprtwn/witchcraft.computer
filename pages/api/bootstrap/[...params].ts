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
  if (authError) {
    return res.status(authError.httpStatus).json(authError);
  }

  const AWS = require('aws-sdk');
  const s3 = new AWS.S3();
  const config = { accessKeyId: process.env.S3_ACCESS_KEY_ID, secretAccessKey: process.env.S3_SECRET };
  AWS.config.update(config);

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
      console.error(`Error retrieving stripe account <${stripeAccountId}> `, e.message);
    }
  }

  try {
    let objectKey = `@${username}`;
    let parentObjectKey = null;
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
    return res
      .status(200)
      .json({ uploadUrl: uploadUrl, parentUploadUrl: parentUploadUrl, stripeAccount: stripeAccount });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};
