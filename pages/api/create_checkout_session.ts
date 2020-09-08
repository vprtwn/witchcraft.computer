import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { validateSession } from '../../lib/validateSession';
import { readDict } from '../../lib/metadataUtils';
import { usernameFromUrl } from '../../lib/utils';
import { getCustomer } from '../../lib/ops';
import { ErrorResponse } from '../../lib/typedefs';
import Stripe from 'stripe';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return;
  }
  // TODO: use JWT – more secure?
  // const token = await jwt.getToken({ req, secret });
  const session = await getSession({ req });

  const params = JSON.parse(req.body);
  const amount = params.amount;
  const message = params.message;
  const authError = validateSession(session);

  if (authError) {
    return res.status(authError.httpStatus).json(authError);
  }
  const returnUrl = req.headers.referer;
  const username = usernameFromUrl(returnUrl);

  let stripeKey = process.env.STRIPE_SECRET_KEY;
  if (session.user.username === username) {
    stripeKey = process.env.STRIPE_TEST_SECRET_KEY;
  }
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
  let connectedCustomerId = null;
  if (session.user.email) {
    // TODO: create customer using session user's email
    console.error('TODO CREATE CUSTOMER ', session.user.email);
  }

  // create checkout session
  const checkoutParams = {
    payment_method_types: ['card'],
    customer: connectedCustomerId,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `@${username}`,
            description: message,
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    payment_intent_data: {
      description: message,
      metadata: { from_flexjar_url: returnUrl, from_flexjar_user: session.user.username },
    },
    success_url: returnUrl,
    cancel_url: returnUrl,
    submit_type: 'donate',
  };
  console.dir(checkoutParams);

  try {
    const checkoutSession = await stripe.checkout.sessions.create(checkoutParams, {
      stripeAccount: stripeAccount.id,
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
