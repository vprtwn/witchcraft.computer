import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { validateSession } from '../../lib/validateSession';
import jwt from 'next-auth/jwt';
const secret = process.env.SECRET;
import { updateMetadataForCustomerId } from '../../lib/ops';
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

  // TODO: get username from origin – more secure?
  const username = params.username;
  const customerId = params.customerId;

  const authError = validateSession(session, username);
  if (authError) {
    return res.status(authError.httpStatus).json(authError);
  }
  if (!customerId) {
    res.status(400).json({});
    return;
  }

  const metadata = params.metadata;
  const response = await updateMetadataForCustomerId(session, customerId, metadata);
  if (response.errored) {
    const error = response.data as ErrorResponse;
    return res.status(error.httpStatus).json(error);
  }
  const customer = response.data as Stripe.Customer;
  res.json(customer.metadata);
};
