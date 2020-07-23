import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Widget from "../components/Widget";
import { useRouter } from "next/router";
import { Box } from "theme-ui";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/client";

const IndexPage = (props) => {
  const {
    query: { username },
  } = useRouter();

  return (
    <Layout>
      <Widget
        metadata={props.metadata}
        index={0}
        username={username}
        customerId={props.customerId}
        signedIn={props.signedIn}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const query = ctx.query;
  const username = query.username as string;
  const session = await getSession(ctx);
  let error = null;
  let customer = null;
  let signedIn = false;
  // signedIn: check session against url
  if (session && session.user.username) {
    const sessionUsername = session.user.username;
    signedIn = sessionUsername === username;
  }
  // get customer metadata
  const email = `${username}@0l0.at`;
  try {
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    const response = await stripe.customers.list({ email: email });
    if (response.data.length > 0) {
      customer = response.data[0];
      console.log("retrieved existing customer");
    }
    if (!customer && signedIn) {
      customer = await stripe.customers.create({
        email: email,
      });
      console.log("created customer");
    }
  } catch (e) {
    error = e.message;
    console.error("error fetching customer: " + e);
  }
  return {
    props: {
      metadata: customer ? customer.metadata : null,
      customerId: customer ? customer.id : null,
      signedIn: signedIn,
      error: error,
    },
  };
};

export default IndexPage;
