import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { validateSession } from '../../lib/validateSession';
import { connectStripeAccount } from '../../lib/ops';
import { ErrorResponse } from '../../lib/typedefs';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return;
  }
  // TODO: use JWT – more secure?
  // const token = await jwt.getToken({ req, secret });
  const session = await getSession({ req });
  const params = JSON.parse(req.body);
  const state = params.state;
  const code = params.code;
  const authError = validateSession(session, state);
  if (authError) {
    return res.status(authError.httpStatus).json(authError);
  }
  try {
    const updateResponse = await connectStripeAccount(session, state, code);
    res.json(updateResponse.data);
  } catch (e) {
    const response: ErrorResponse = {
      errorCode: 'op_error',
      errorMessage: e.message,
      httpStatus: 500,
    };
    res.status(response.httpStatus).json(response);
  }
};
