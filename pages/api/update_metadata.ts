import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import jwt from "next-auth/jwt";
const secret = process.env.SECRET;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return;
  }
  const session = await getSession({ req });
  if (session && !session.user.username) {
    const code = "error_session_missing_username";
    console.error(code);
    return res.status(401).json({
      message: "no username in session",
      code: code,
    });
  }
  const params = JSON.parse(req.body);
  const username = params.username;
  const customerId = params.customerId;
  if (session && session.user.username !== username) {
    const code = "error_session_username_mismatch";
    console.error(code);
    return res.status(401).json({
      message: "username doesn't match session username",
      code: code,
    });
  }
  // TODO: JWT example below. Using JWT would be more secure?
  // const token = await jwt.getToken({ req, secret });
  const metadata = params.metadata;
  try {
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    await stripe.customers.update(customerId, { metadata: metadata });
  } catch (e) {
    const code = "error_customer_update_error";
    console.error(code);
    return res.status(500).json({
      message: e.message,
      code: code,
    });
  }
  res.json({});
};
