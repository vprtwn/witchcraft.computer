import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { parseTrayUrl } from '../../lib/utils';
import { getCustomer } from '../../lib/ops';
import { ErrorResponse } from '../../lib/typedefs';
import Stripe from 'stripe';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return;
  }
  // TODO(#39): use JWT – more secure?
  // const token = await jwt.getToken({ req, secret });
  // const session = await getSession({ req });
  // const params = JSON.parse(req.body);

  // Note: refererPageId is unreliable
  const [username, refererPageId] = parseTrayUrl(req.headers.referer);

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
  if (!stripeAccountId) {
    const error: ErrorResponse = {
      errorCode: 'no_payment_setup',
      errorMessage: "This account hasn't enabled payments.",
      httpStatus: 400,
    };
    return res.status(error.httpStatus).json(error);
  }

  try {
    // TODO(#38): this should use the Search API in the future
    const listRes = await stripe.paymentIntents.list(
      {
        limit: 100,
      },
      {
        stripeAccount: stripeAccountId,
      },
    );
    const rawPIs = listRes.data;
    const results = rawPIs
      .filter((p) => {
        return p.metadata && p.metadata.from_tray_origin_url && p.amount_received > 0;
      })
      .map((p) => {
        return {
          id: p.id,
          amount: p.amount_received,
          message: p.description,
          originUrl: p.metadata.from_tray_origin_url,
          twitterUsername: p.metadata.from_tray_twitter_username,
          profileImage: p.metadata.from_tray_profile_image,
        };
      });
    res.json({ payments: results });
  } catch (e) {
    const response: ErrorResponse = {
      errorCode: 'stripe_error',
      errorMessage: e.message,
      httpStatus: 500,
    };
    res.status(response.httpStatus).json(response);
  }
};
