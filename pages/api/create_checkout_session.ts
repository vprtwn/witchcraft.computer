import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { parseTrayUrl } from '../../lib/utils';
import { getCustomer, getOrCreateCustomer } from '../../lib/ops';
import { ErrorResponse } from '../../lib/typedefs';
import Stripe from 'stripe';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return;
  }
  // TODO(#39): use JWT – more secure?
  // const token = await jwt.getToken({ req, secret });
  const session = await getSession({ req });

  const params = JSON.parse(req.body);
  const amount = params.amount;
  const message = params.message;

  const returnUrl = req.headers.referer;
  const [username, pageId] = parseTrayUrl(returnUrl);

  let stripeKey = process.env.STRIPE_SECRET_KEY;
  if (session.user.username === username) {
    stripeKey = process.env.STRIPE_TEST_SECRET_KEY;
  }
  const stripe = require('stripe')(stripeKey);

  // get stripe account id
  let customer = null;
  try {
    const customerRes = await getCustomer(username);
    if (customerRes.errored) {
      const error = customerRes.data as ErrorResponse;
      return res.status(error.httpStatus).json(error);
    }
    customer = customerRes.data as Stripe.Customer;
  } catch (e) {
    const error: ErrorResponse = {
      errorCode: 'get_account_id_error',
      errorMessage: e.message,
      httpStatus: 500,
    };
    return res.status(error.httpStatus).json(error);
  }
  const stripeAccountId = customer.metadata['stripe_account_id'] as string;
  if (!stripeAccountId) {
    const error: ErrorResponse = {
      errorCode: 'no_payment_setup',
      errorMessage: "This account hasn't enabled payments.",
      httpStatus: 400,
    };
    return res.status(error.httpStatus).json(error);
  }
  let connectedCustomerId = null;
  let metadata = { from_tray_origin_url: returnUrl };
  if (session.user) {
    metadata['from_tray_twitter_username'] = session.user.username;
    metadata['from_tray_profile_image'] = session.user.picture;

    const getResponse = await getOrCreateCustomer(session, true, stripeAccountId);
    if (getResponse.errored) {
      const eRes = getResponse.data as ErrorResponse;
      return res.status(eRes.httpStatus).json(eRes);
    }
    const customer = getResponse.data as Stripe.Customer;
    connectedCustomerId = customer.id;
  }

  const productData = {
    name: `@${username}`,
  };
  if (message) {
    productData['description'] = message;
  }

  // create checkout session
  const checkoutParams = {
    payment_method_types: ['card'],
    customer: connectedCustomerId,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: productData,
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    payment_intent_data: {
      description: message,
      metadata: metadata,
    },
    success_url: returnUrl,
    cancel_url: returnUrl,
    submit_type: 'donate',
  };

  try {
    const checkoutSession = await stripe.checkout.sessions.create(checkoutParams, {
      stripeAccount: stripeAccountId,
    });
    const checkoutSessionId = checkoutSession.id;
    res.json({ id: checkoutSessionId });
  } catch (e) {
    const response: ErrorResponse = {
      errorCode: 'stripe_error',
      errorMessage: e.message,
      httpStatus: 500,
    };
    res.status(response.httpStatus).json(response);
  }
};
