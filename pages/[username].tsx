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

  const [session, loading] = useSession();
  const [metadata, setMetadata] = useState(props.metadata);

  const signedIn = session && session.user.username;

  return (
    <Layout>
      {signedIn && (
        <Box>
          <Widget metadata={metadata} index={0} username={username} customerId={props.customerId} />
        </Box>
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  let error = null;
  let customer = null;
  if (session && session.user.username) {
    const email = `${session.user.username}@0l0.at`;
    try {
      const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
      const response = await stripe.customers.list({ email: email });
      if (response.data.length > 0) {
        customer = response.data[0];
        console.log("retrieved existing customer");
      }
      if (!customer) {
        customer = await stripe.customers.create({
          email: email,
        });
        console.log("created customer");
      }
    } catch (e) {
      error = e;
      console.error("error fetching customer: " + e);
    }
  }
  return {
    props: {
      metadata: customer ? customer.metadata : null,
      customerId: customer ? customer.id : null,
    },
  };
};

export default IndexPage;
