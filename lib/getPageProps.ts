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
  let error = null;
  let data = null;
  let signedIn = false; // signed in as this user
  let uploadUrl = null;
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
  if (pageId) {
    objectKey = `@${username}/${pageId}`;
  }

  try {
    const s3data = await s3
      .getObject({
        Bucket: 'traypages',
        Key: objectKey,
      })
      .promise();
    const object = s3data.Body.toString('utf-8');
    data = JSON.parse(object);
  } catch (e) {
    console.error(`no object at ${objectKey}`, e.message);
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

    // create a signed S3 URL for page data updates
    try {
      uploadUrl = await s3.getSignedUrlPromise('putObject', {
        Bucket: 'traypages',
        Key: objectKey,
        ContentType: 'application/json',
      });
    } catch (e) {
      return {
        props: {
          error: e,
        },
      };
    }
    // if this is a new user, populate initial page data
    if (customerResponse.createdCustomer || !data) {
      try {
        let initialData = {};
        if (pageId) {
          initialData = {
            title: 'New page',
          };
        } else {
          initialData = {
            email: session.user.email,
            name: session.user.name,
            profile_image: session.user.picture,
            twitter_id: session.user.id,
            twitter_username: session.user.username,
            twitter_description: session.user.description,
          };
        }
        await fetch(uploadUrl, {
          method: 'PUT',
          body: JSON.stringify(initialData, null, 2),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        data = initialData;
      } catch (e) {
        return { props: { error: { message: e.message } } };
      }
    }
  }
  // trim nulls from data
  const trimmedData = data;
  const keys = Object.keys(trimmedData);
  let trim = false;
  keys.forEach((k) => {
    const val = trimmedData[k];
    if (!val) {
      delete trimmedData[k];
      trim = true;
    }
  });
  if (trim) {
    try {
      await fetch(uploadUrl, {
        method: 'PUT',
        body: JSON.stringify(trimmedData, null, 2),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      data = trimmedData;
    } catch (e) {
      console.error('trimming data failed', e.message);
    }
  }

  return {
    props: {
      data: data,
      username: username,
      pageId: pageId,
      signedIn: signedIn,
      uploadUrl: uploadUrl,
      error: error,
    },
  };
};
