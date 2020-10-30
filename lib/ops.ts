import Stripe from 'stripe';
import { ErrorResponse, CustomerOpResponse, AnyResponse, Metadata } from './typedefs';
import { emailFromUsername } from './utils';
import { syncMetadata, readBlockOrder } from './metadataUtils';
const LOGSYM = '🔄';

const logCustomerOp = (name: string, response: CustomerOpResponse) => {
  let logResponse = response as any;
  if (!response.errored) {
    const customer = response.data as Stripe.Customer;
    logResponse = { metadata: customer.metadata };
  }
  let sym = LOGSYM;
  if (name.startsWith('get')) {
    sym = '⬅️';
  }
  if (name.startsWith('update')) {
    sym = '⤴️';
  }
  console.log(`${sym} ${name}`, JSON.stringify(logResponse, null, 2));
};

const logAnyOp = (name: string, response: AnyResponse) => {
  let logResponse = response as any;
  if (!response.errored) {
    logResponse = response.data;
  }
  console.log(`${name}`, JSON.stringify(logResponse, null, 2));
};

/**
 * Get or create a Stripe customer.
 * Default behavior: creates a customer on the Tray platform account,
 * using the session user's *username*.
 * If stripeAccountId is provided, creates a customer on the the connected account,
 * using the sesssion user's *email*.
 */
export const getOrCreateCustomer = async (
  session: any,
  allowCreate: boolean = false,
  stripeAccountId: string | null = null,
): Promise<CustomerOpResponse> => {
  let customer: Stripe.Customer | null = null;
  let errorResponse: ErrorResponse | null = null;
  if (!session || !session.user || !session.user.username) {
    errorResponse = {
      httpStatus: 401,
      errorMessage: `Invalid session: ${JSON.stringify(session)}`,
      errorCode: 'invalid_session',
    };
  } else {
    const username = session.user.username;
    let customerEmail = emailFromUsername(username);
    if (stripeAccountId) {
      customerEmail = session.user.email;
    }
    try {
      const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
      let opts = null;
      if (stripeAccountId) {
        opts = { stripeAccount: stripeAccountId };
      }
      const response = await stripe.customers.list({ email: customerEmail }, opts);
      if (response.data.length > 0) {
        customer = response.data[0];
      }
      if (!customer && allowCreate && session.user) {
        const metadata = {
          email: session.user.email,
          name: session.user.name,
          profile_image: session.user.picture,
          twitter_id: session.user.id,
          twitter_username: session.user.username,
          twitter_description: session.user.description,
        };
        customer = await stripe.customers.create(
          {
            email: customerEmail,
            metadata: metadata,
          },
          opts,
        );
      }
      if (!customer) {
        errorResponse = {
          httpStatus: 404,
          errorMessage: 'No user data found',
          errorCode: 'customer_not_found',
        };
      }
    } catch (e) {
      errorResponse = {
        httpStatus: 500,
        errorMessage: e.message,
        errorCode: 'stripe_exception',
      };
    }
  }
  const response = {
    errored: errorResponse != null,
    data: errorResponse ? errorResponse : customer,
  };
  logCustomerOp('getOrCreateCustomer', response);
  return response;
};

export const getCustomer = async (username: string): Promise<CustomerOpResponse> => {
  let customer: Stripe.Customer | null = null;
  let errorResponse: ErrorResponse | null = null;
  const email = emailFromUsername(username);
  try {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const response = await stripe.customers.list({ email: email });
    if (response.data.length > 0) {
      customer = response.data[0];
    } else {
      errorResponse = {
        httpStatus: 404,
        errorMessage: 'No user data found',
        errorCode: 'customer_not_found',
      };
    }
  } catch (e) {
    errorResponse = {
      httpStatus: 500,
      errorMessage: e.message,
      errorCode: 'stripe_exception',
    };
  }
  const response = {
    errored: errorResponse != null,
    data: errorResponse ? errorResponse : customer,
  };
  logCustomerOp('getOrCreateCustomer', response);
  return response;
};

// UPDATE METADATA

export const updateMetadataForCustomerId = async (
  session: any,
  customerId: string | null,
  metadata: Stripe.Metadata,
): Promise<CustomerOpResponse> => {
  return updateCustomerMetadata(session, customerId, null, metadata);
};

export const updateMetadataForCustomer = async (
  session: any,
  customer: Stripe.Customer | null,
  metadata: Stripe.Metadata,
): Promise<CustomerOpResponse> => {
  return updateCustomerMetadata(session, null, customer, metadata);
};

// get a customer. if signed in, create a customer if it doesn't exist.
const updateCustomerMetadata = async (
  session: any,
  customerId: string | null,
  customer: Stripe.Customer | null,
  metadata: Stripe.Metadata,
): Promise<CustomerOpResponse> => {
  let errorResponse: ErrorResponse | null = null;
  let customerResponse: Stripe.Customer | null = null;
  if (!customerId && !customer) {
    errorResponse = {
      httpStatus: 400,
      errorMessage: 'Bad request',
      errorCode: 'no_customer_or_id',
    };
  }
  if (!session || !session.user || !session.user.username) {
    errorResponse = {
      httpStatus: 401,
      errorMessage: 'Invalid session',
      errorCode: 'invalid_session',
    };
  }
  const username = session.user.username;
  const expectedEmail = emailFromUsername(username);
  if (customer && expectedEmail !== customer.email) {
    errorResponse = {
      httpStatus: 401,
      errorMessage: `Permission denied: ${expectedEmail} !== ${customer.email}`,
      errorCode: 'session_user_not_customer',
    };
  }
  if (!errorResponse) {
    const getResponse = await getOrCreateCustomer(session);
    if (getResponse.errored) {
      errorResponse = getResponse.data as ErrorResponse;
    } else {
      const remoteCustomer = getResponse.data as Stripe.Customer;
      const remoteMetadata = remoteCustomer.metadata;
      const mergedMetadata = syncMetadata(metadata, remoteMetadata);

      try {
        const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
        let cid = customerId;
        if (!cid && customer) {
          cid = customer.id;
        }
        if (cid) {
          customerResponse = await stripe.customers.update(cid, { metadata: mergedMetadata });
        }
      } catch (e) {
        errorResponse = {
          httpStatus: 500,
          errorMessage: e.message,
          errorCode: 'stripe_exception',
        };
      }
    }
  }
  const response = {
    errored: errorResponse != null,
    data: errorResponse ? errorResponse : customerResponse,
  };
  logCustomerOp(customerId ? 'updateMetadataForCustomerId' : 'updateMetadataForCustomer', response);
  return response;
};

// Stripe Standard connect account setup
// https://stripe.com/docs/connect/standard-accounts
export const connectStripeAccount = async (session: any): Promise<AnyResponse> => {
  let dataResponse: object | null = null;
  let errorResponse: ErrorResponse | null = null;
  if (!session || !session.user || !session.user.username) {
    errorResponse = {
      httpStatus: 401,
      errorMessage: `Invalid session: ${JSON.stringify(session)}`,
      errorCode: 'invalid_session',
    };
  } else {
    // assumption: a customer already exists (doesn't allow create)
    const getResponse = await getOrCreateCustomer(session);
    if (getResponse.errored) {
      errorResponse = getResponse.data as ErrorResponse;
    } else {
      const customer = getResponse.data as Stripe.Customer;
      const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

      let stripeAccountId = customer.metadata['stripe_account_id'];
      const username = customer.metadata['twitter_username'];
      if (!stripeAccountId) {
        const email = customer.metadata['email'];
        const description = customer.metadata['twitter_description'];
        const twitterUrl = `https://twitter.com/${username}`;
        const bizName = `tray.club/@${username}`;
        try {
          console.log("Creating Stripe account");
          const account = await stripe.accounts.create({
            type: 'standard',
            business_type: 'individual',
            email: email,
            individual: { email: email },
            company: {
              name: bizName,
            },
            settings: {
              payments: {
                statement_descriptor: bizName,
              }
            },
            business_profile: {
              name: bizName,
              mcc: '5192',
              product_description: description,
              url: twitterUrl,
              // TODO: file stripe bug
              // supportUrl: twitterUrl, 
            },
          });
          stripeAccountId = account.id;
          const metadata = {
            stripe_account_id: stripeAccountId
          };
          const updateResponse = await updateMetadataForCustomer(session, customer, metadata);
          if (updateResponse.errored) {
            stripeAccountId = null;
            errorResponse = updateResponse.data as ErrorResponse;
          }
        } catch (e) {
          errorResponse = {
            httpStatus: 500,
            errorMessage: e.message,
            errorCode: 'stripe_exception',
          };
        }
      }
      if (stripeAccountId) {
        const account = await stripe.accounts.retrieve(
          stripeAccountId
        );
        // create an account link if charges aren't enabled
        if (!account.charges_enabled) {
          let returnUrl = `https://tray.club/@${username}`;
          if (process.env.NODE_ENV === 'development') {
            returnUrl = `http://127.0.0.1:3000/@${username}`;
          }
          try {
          console.log("Creating account link");
            const accountLinks = await stripe.accountLinks.create({
              account: stripeAccountId,
              return_url: returnUrl,
              // TODO: handle refreshes with a different url for smoother onboarding
              refresh_url: returnUrl,
              type: 'account_onboarding',
            });
            dataResponse = { url: accountLinks.url };
          } catch (e) {
            errorResponse = {
              httpStatus: 500,
              errorMessage: e.message,
              errorCode: 'stripe_exception',
            };
          }
        } else {
          dataResponse = { account: account };
        }
      }
    }
  }
  const response = {
    errored: errorResponse != null,
    data: errorResponse ? errorResponse : dataResponse,
  };
  logAnyOp('connectStripeAccount', response);
  return response;
};

export const disconnectStripeAccount = async (session: any): Promise<CustomerOpResponse> => {
  let customerResponse: Stripe.Customer | null = null;
  let errorResponse: ErrorResponse | null = null;
  if (!session || !session.user || !session.user.username) {
    errorResponse = {
      httpStatus: 401,
      errorMessage: `Invalid session: ${JSON.stringify(session)}`,
      errorCode: 'invalid_session',
    };
  } else {
    // assumption: a customer already exists
    const getResponse = await getOrCreateCustomer(session);
    if (getResponse.errored) {
      errorResponse = getResponse.data as ErrorResponse;
    } else {
      const customer = getResponse.data as Stripe.Customer;
      const metadata = {
        stripe_account_id: null,
      };
      const updateResponse = await updateMetadataForCustomer(session, customer, metadata);
      if (updateResponse.errored) {
        errorResponse = updateResponse.data as ErrorResponse;
      }
      customerResponse = updateResponse.data as Stripe.Customer;
    }
  }
  const response = {
    errored: errorResponse != null,
    data: errorResponse ? errorResponse : customerResponse,
  };
  logCustomerOp('disconnectStripeAccount', response);
  return response;
};
