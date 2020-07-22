import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { Box } from "theme-ui";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/client";

const IndexPage = () => {
  const {
    query: { username },
  } = useRouter();

  const [session, loading] = useSession();

  // useEffect(() => {
  //   if (session && session.user.username) {
  //     window.location.assign(`/${session.user.username}`);
  //   }
  // }, [session]);

  return (
    <Layout>
      <Box>{username}</Box>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // const session = await getSession(ctx);
  // if (session && session.user.username) {
  //   const { res } = ctx;
  //   res.setHeader("location", `/${session.user.username}`);
  //   res.statusCode = 302;
  //   res.end();
  //   return;
  // }
  return { props: {} };
};

export default IndexPage;
