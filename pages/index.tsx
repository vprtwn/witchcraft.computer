import React from "react";
import Layout from "../components/Layout";
import { Box } from "theme-ui";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";

const IndexPage = () => {
  return (
    <Layout>
      <Box></Box>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  if (session && session.user.username) {
    const { res } = ctx;
    res.setHeader("location", `/${session.user.username}`);
    res.statusCode = 302;
    res.end();
    return;
  }
  return { props: {} };
};

export default IndexPage;
