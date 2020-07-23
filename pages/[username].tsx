import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { useDebounce } from "use-debounce";
import { Box, Card } from "theme-ui";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/client";
import { LiveProvider, LiveEditor, LiveError, LivePreview, withLive } from "react-live";
import fetchJson from "../lib/fetchJson";

const IndexPage = (props) => {
  const {
    query: { username },
  } = useRouter();

  const initialValue = "<span></span>";

  const [session, loading] = useSession();
  const [metadata, setMetadata] = useState(props.metadata);
  const [val1, setVal1] = useState(props.metadata ? props.metadata["1"] : initialValue);
  const [dVal1] = useDebounce(val1, 1000);
  const [val2, setVal2] = useState(props.metadata ? props.metadata["2"] : initialValue);
  const [dVal2] = useDebounce(val1, 1000);
  const [val3, setVal3] = useState(props.metadata ? props.metadata["3"] : initialValue);
  const [dVal3] = useDebounce(val1, 1000);

  useEffect(() => {
    const update = async function () {
      try {
        const metadata = {
          "1": val1,
          "2": val2,
          "3": val3,
        };
        const params = { username: username, metadata: metadata, customerId: props.customerId };
        await fetchJson(`/api/update_metadata`, {
          method: "POST",
          body: JSON.stringify(params),
        });
      } catch (e) {
        console.error(e);
      }
    };
    update();
  }, [dVal1, dVal2, dVal3]);

  return (
    <Layout>
      {session && session.user.username && (
        <Box>
          <Card>
            <LiveProvider code={val1}>
              <LiveError />
              <LiveEditor
                style={{
                  backgroundColor: "#f7fafc",
                  marginBottom: "12px",
                }}
                onChange={(e) => {
                  setVal1(e);
                }}
              />
              <LivePreview />
            </LiveProvider>
          </Card>
          <Card>
            <LiveProvider code={val2}>
              <LiveError />
              <LiveEditor
                style={{
                  backgroundColor: "#f7fafc",
                  marginBottom: "12px",
                }}
                onChange={(e) => {
                  setVal2(e);
                }}
              />
              <LivePreview />
            </LiveProvider>
          </Card>
          <Card>
            <LiveProvider code={val3}>
              <LiveError />
              <LiveEditor
                style={{
                  backgroundColor: "#f7fafc",
                  marginBottom: "12px",
                }}
                onChange={(e) => {
                  setVal3(e);
                }}
              />
              <LivePreview />
            </LiveProvider>
          </Card>
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
