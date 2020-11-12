import { unprefixUsername } from '../lib/utils';
import { getOrCreateCustomer } from '../lib/ops';
import { Session } from 'next-auth/client';
import { GetServerSidePropsResult } from 'next';

export const getPageProps = async (session: Session, query: object): Promise<GetServerSidePropsResult<object>> => {
  const AWS = require('aws-sdk');
  const s3 = new AWS.S3();
  const config = { accessKeyId: process.env.S3_ACCESS_KEY_ID, secretAccessKey: process.env.S3_SECRET };
  AWS.config.update(config);

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

  try {
    // fetch page data
    const s3data = await s3
      .getObject({
        Bucket: 'traypages',
        Key: objectKey,
      })
      .promise();
    const object = s3data.Body.toString('utf-8');
    data = JSON.parse(object);
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
      // fetch parent data
      try {
        const s3data = await s3
          .getObject({
            Bucket: 'traypages',
            Key: parentObjectKey,
          })
          .promise();
        const object = s3data.Body.toString('utf-8');
        parentData = JSON.parse(object);
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
