import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { validateSession } from '../../lib/validateSession';
import { connectStripeAccount } from '../../lib/ops';
import { ErrorResponse } from '../../lib/typedefs';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return;
  }
  // TODO(#39): use JWT – more secure?
  // const token = await jwt.getToken({ req, secret });
  const session = await getSession({ req });
  const authError = validateSession(session, req);
  if (authError) {
    return res.status(authError.httpStatus).json(authError);
  }
  try {
    const response = await connectStripeAccount(session);
    return res.json(response.data);
  } catch (e) {
    const response: ErrorResponse = {
      errorCode: 'op_error',
      errorMessage: e.message,
      httpStatus: 500,
    };
    return res.status(response.httpStatus).json(response);
  }
};
