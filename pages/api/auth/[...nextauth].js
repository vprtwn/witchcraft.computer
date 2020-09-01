import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const DEBUG = true;
const LOGSYM = '🔑';

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
const options = {
  // https://next-auth.js.org/configuration/providers
  providers: [
    Providers.Twitter({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),
  ],
  // The secret should be set to a reasonably long random string.
  // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a seperate secret is defined explicitly for encrypting the JWT.
  secret: process.env.SECRET,

  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    jwt: true,

    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  // JSON Web tokens are only used for sessions if the `jwt: true` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    encryption: true,
  },

  // You can define custom pages to override the built-in pages.
  // The routes shown here are the default URLs that will be used when a custom
  // pages is not specified for that route.
  // https://next-auth.js.org/configuration/pages
  pages: {
    // signIn: '/api/auth/signin',  // Displays signin buttons
    // signOut: '/api/auth/signout', // Displays form with sign out button
    // error: '/api/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/api/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    session: async (session, token) => {
      DEBUG && console.log(`${LOGSYM}  next-auth.callback.session.token`, JSON.stringify(token, null, 2));
      if (token.username) {
        session.user.name = token.name;
        session.user.picture = token.picture;
        session.user.username = token.username;
        session.user.email = token.email;
      }
      DEBUG && console.log(`${LOGSYM} next-auth.callback.session.session`, JSON.stringify(session, null, 2));

      return Promise.resolve(session);
    },
    jwt: async (token, profile) => {
      if (profile) {
        DEBUG && console.log('👤 profile', JSON.stringify(profile, null, 2));
        token.username = profile.screen_name;
        token.email = profile.email;
      }
      // DEBUG && console.log(`${LOGSYM} next-auth.callback.jwt.token`, JSON.stringify(token, null, 2));
      return Promise.resolve(token);
    },
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/options#events
  events: {},

  // Enable debug messages in the console if you are having problems
  debug: false,
};

export default (req, res) => NextAuth(req, res, options);
