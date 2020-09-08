import { ErrorResponse } from './typedefs';

export const validateSession = (session, username: string | null = null): ErrorResponse | null => {
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
  if (username && session && session.user.username !== username) {
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
