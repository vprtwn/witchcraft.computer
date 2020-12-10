import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import TrayIcon from '../components/TrayIcon';
import TryItButton from '../components/TryItButton';
import InfoFooter from '../components/InfoFooter';
import { Card, Badge, Box, Flex, Text, Link } from 'theme-ui';
import { NextSeo } from 'next-seo';

const AltMarketingTemplate = (props) => {
  const title = 'tray vs Linktree ✧ create your personal site with tray';
  const url = 'https://tray.club';
  const description = `tray is the ${props.productName} alternative for normal people.`;

  return (
    <Layout>
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
          site_name: 'tray',
        }}
        twitter={{
          handle: `@trayClub`,
          site: `@trayClub`,
          cardType: 'summary_large_image',
        }}
      />
      <TrayIcon />
      <Card variant="card_block_link" sx={{ px: 3, py: 2, cursor: 'auto' }}>
        <Text variant="text_md_mono">
          tray is a free alternative to{' '}
          <Badge variant="badge_tray" sx={{ bg: props.productColor }}>
            {props.productName}
          </Badge>
        </Text>
        <Text variant="text_md_mono" sx={{ textAlign: 'right', pt: 3 }}>
          <Badge variant="badge_tray">tray</Badge> lets you add <Badge variant="badge_outline">links</Badge>
        </Text>
        <Text variant="text_md_mono" sx={{ textAlign: 'right', pt: 1 }}>
          free text <Badge variant="badge_outline">notes</Badge>
        </Text>
        <Text variant="text_md_mono" sx={{ textAlign: 'right', pt: 1 }}>
          and even nested <Badge variant="badge_outline">pages</Badge>
        </Text>
        <Text variant="text_md_mono" sx={{ pt: 3 }}>
          here's an <Link href="https://tray.club/@bgdotjpg">example</Link>
        </Text>
        <Text variant="text_md_mono" sx={{ pt: 3 }}>
          tray is the page builder for normal people - we keep it simple.
        </Text>
      </Card>
      <Box sx={{ mt: 3 }}>
        <TryItButton />
      </Box>
      <InfoFooter />
      <Box sx={{ py: 5 }}></Box>
    </Layout>
  );
};
export default AltMarketingTemplate;
