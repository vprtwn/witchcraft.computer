import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { readDict } from '../../lib/metadataUtils';
import { usernameFromUrl } from '../../lib/utils';
import { getCustomer } from '../../lib/ops';
import { ErrorResponse } from '../../lib/typedefs';
import Stripe from 'stripe';

// PUBLIC, UNAUTHENTICATED, not secure?
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return;
  }
  const username = usernameFromUrl(req.headers.referer);

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
  try {
    const account = await stripe.accounts.retrieve(stripeAccountId);
    return res.json({ account: account });
  } catch (e) {
    const response: ErrorResponse = {
      errorCode: 'stripe_error',
      errorMessage: e.message,
      httpStatus: 500,
    };
    return res.status(response.httpStatus).json(response);
  }
};
