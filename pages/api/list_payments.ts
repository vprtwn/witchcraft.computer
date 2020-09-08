import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { readDict } from '../../lib/metadataUtils';
import { usernameFromUrl } from '../../lib/utils';
import { getCustomer } from '../../lib/ops';
import { ErrorResponse } from '../../lib/typedefs';
import Stripe from 'stripe';

// PUBLIC, UNAUTHENTICATED, KINDA DANGEROUS
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return;
  }
  // TODO: use JWT – more secure?
  // const token = await jwt.getToken({ req, secret });
  // const session = await getSession({ req });
  // const params = JSON.parse(req.body);

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
  const stripeAccount = readDict(customer.metadata, 'stripeAccount');
  if (!stripeAccount) {
    const error: ErrorResponse = {
      errorCode: 'no_payment_setup',
      errorMessage: "This account hasn't enabled payments.",
      httpStatus: 400,
    };
    return res.status(error.httpStatus).json(error);
  }

  try {
    const payments = await stripe.paymentIntents.list(
      {
        customer: stripeAccount.customer_id,
        limit: 100,
      },
      {
        stripeAccount: stripeAccount.id,
      },
    );
    res.json({ payments: payments });
  } catch (e) {
    const response: ErrorResponse = {
      errorCode: 'stripe_error',
      errorMessage: e.message,
      httpStatus: 500,
    };
    res.status(response.httpStatus).json(response);
  }
};
