import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Layout from '../components/Layout';
import PageFooter from '../components/PageFooter';
import { Box, Alert, IconButton, Flex, Card, Button, Textarea } from 'theme-ui';
import { GetServerSideProps } from 'next';
import fetchJson from '../lib/fetchJson';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

const UserPage = (props) => {
  const title = 'foo';
  const description = 'bar';
  const url = `https://tarot.express`;

  const router = useRouter();
  const { comps } = router.query;
  const type = comps[0];
  const first = comps[1];
  const second = comps[2];
  const third = comps[3];
  if (type === 'c') {
  }

  console.log('query', comps);

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          url: url,
          title: title,
          description: description,
          images: [
            {
              url: `https://api.microlink.io/?url=${url}&screenshot=true&meta=false&embed=screenshot.url`,
              width: 512,
              height: 512,
              alt: 'outbox infinity',
            },
          ],
          site_name: 'tarot express',
        }}
        twitter={{
          handle: `@${props.username}`,
          site: `@${props.username}`,
          cardType: 'summary_large_image',
        }}
      />
      <Layout>
        {/* {DEBUG && !props.error && (
          <Textarea rows={10} sx={{ borderColor: 'blue', my: 4 }} defaultValue={JSON.stringify(props, null, 2)} />
        )} */}
        {props.error && (
          <Textarea rows={10} sx={{ borderColor: 'red', my: 4 }} defaultValue={JSON.stringify(props.error, null, 2)} />
        )}
        {!props.error && (
          <>
            <Header name={title} username={props.username} pageId={props.pageId} />
          </>
        )}
        <PageFooter />
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // const username = params[0] as string;
  // const pageId = params[1] as string;

  return {
    props: {},
  };
};
export default UserPage;
