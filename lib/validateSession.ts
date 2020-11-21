import { ErrorResponse } from './typedefs';
import { NextApiRequest } from 'next';
import { parseTrayUrl } from './utils';

export const validateSession = (session, req: NextApiRequest): ErrorResponse | null => {
  let response: ErrorResponse | null;
  if (!session || !session.user) {
    response = {
      httpStatus: 500,
      errorCode: 'invalid_session',
      errorMessage: 'Invalid session',
    };
  }
  if (session && !session.user.username) {
    response = {
      httpStatus: 401,
      errorCode: 'session_missing_username',
      errorMessage: 'no username in session',
    };
  }
  const referer = req.headers.referer;
  const [refererUsername, refererPageId] = parseTrayUrl(referer);
  if (refererUsername && session && session.user.username !== refererUsername) {
    response = {
      httpStatus: 401,
      errorCode: 'session_username_mismatch',
      errorMessage: "username doesn't match session username",
    };
  }
  if (response) {
    console.log('validateSession error', JSON.stringify(response, null, 2));
  }
  return response;
};
