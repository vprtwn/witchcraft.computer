import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/client';
import AltMarketingTemplate from '../../components/AltMarketingTemplate';

const AltMarketingLinktreePage = () => {
  return <AltMarketingTemplate productName="TapBio" productColor="#888888" />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return { props: {} };
};

export default AltMarketingLinktreePage;
