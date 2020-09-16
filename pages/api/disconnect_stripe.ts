import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { validateSession } from '../../lib/validateSession';
import { disconnectStripeAccount } from '../../lib/ops';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
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
    const updateResponse = await disconnectStripeAccount(session);
    res.json(updateResponse.data);
  } catch (error) {
    res.status(500).json({ message: error.message, code: error.code });
  }
};
