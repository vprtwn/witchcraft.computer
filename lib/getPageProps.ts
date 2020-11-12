import { unprefixUsername } from '../lib/utils';
import { getOrCreateCustomer } from '../lib/ops';
import { AWS_ENDPOINT } from './const';
import { Session } from 'next-auth/client';
import { GetServerSidePropsResult } from 'next';

export const getPageProps = async (session: Session, query: object): Promise<GetServerSidePropsResult<object>> => {
  let pageId = null;
  let data = null;
  let parentData = null;
  let signedIn = false; // signed in as this user
  let sessionUsername = null;

  const params = query['username'];
  let username = params[0] as string;
  username = unprefixUsername(username);
  if (params.length > 2) {
    return {
      props: {
        error: { message: 'invalid URL' },
      },
    };
  }

  if (params.length > 1) {
    pageId = params[1];
  }
  let objectKey = `@${username}`;
  let parentObjectKey = null;
  if (pageId) {
    parentObjectKey = objectKey;
    objectKey = `@${username}/${pageId}`;
  }

  // fetch page data
  try {
    const url = AWS_ENDPOINT + '/' + objectKey;
    const response = await fetch(url);
    const json = await response.json();
    data = json;
  } catch (e) {
    console.error(`Failed to fetch page at ${objectKey}:`, e.message);
  }

  if (session && session.user.username) {
    sessionUsername = session.user.username;
    signedIn = sessionUsername === username;
  }

  if (signedIn) {
    // get a Stripe Customer or create one
    const customerResponse = await getOrCreateCustomer(session, signedIn);
    if (customerResponse.errored) {
      return {
        props: {
          error: customerResponse.data,
        },
      };
    }

    if (pageId) {
      // fetch parent page data
      try {
        const url = AWS_ENDPOINT + '/' + parentObjectKey;
        const response = await fetch(url);
        const json = await response.json();
        parentData = json;
      } catch (e) {
        console.error(`Failed to fetch parent page at ${objectKey}:`, e.message);
      }
    }
  }

  return {
    props: {
      data: data,
      parentData: parentData,
      username: username,
      pageId: pageId,
      signedIn: signedIn,
    },
  };
};
