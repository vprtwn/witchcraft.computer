import React, { useState } from 'react';
import { Card, Label, Text, Button, Select, Box, useColorMode, Badge } from 'theme-ui';
import { signIn, signOut, useSession } from 'next-auth/client';
import { readDict, postMetadataUpdate, toDict } from '../lib/metadataUtils';

export default (props) => {
  // TODO: add type safety: interfaces for style and stripeAccount
  const defaultStyle = { colorMode: 'light' };
  const stripeAccount = readDict(props.metadata, 'stripeAccount');
  const remoteStyle = readDict(props.metadata, 'style', defaultStyle);
  const [style, setStyle] = useState(remoteStyle);
  const [colorMode, setColorMode] = useColorMode();
  if (colorMode != style.colorMode) {
    setColorMode(colorMode);
  }

  const updateStyle = async function (style) {
    try {
      const newVal = await postMetadataUpdate('style', style, props.customerId, props.username);
      setStyle(toDict(newVal));
    } catch (e) {
      console.error(e);
    }
  };

  const connectUrl = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_STRIPE_CONNECT_CLIENT_ID}&scope=read_write&state=${props.username}`;

  return (
    <Card
      sx={{
        p: 3,
        my: 2,
        bg: 'white',
        border: '2px solid',
        borderColor: 'text',
      }}
    >
      <Box pb={2}>
        <Label variant="settingslabel">{stripeAccount ? 'Tip button enabled' : '💸 Add tips'}</Label>
        {!stripeAccount && (
          <>
            <Text variant="small">Flexjar makes it easy to collect tips on your page.</Text>
            <Text variant="small">Connect a Stripe account to get started. </Text>
            <Text variant="small">
              <Button
                variant="tinywide"
                mr={2}
                onClick={() => {
                  window.location.assign(connectUrl);
                }}
              >
                Connect Stripe
              </Button>{' '}
              <Button
                variant="tinywide"
                onClick={() => {
                  console.log('TODO');
                }}
              >
                Learn more
              </Button>
            </Text>
          </>
        )}
        {stripeAccount && (
          <Text variant="small">
            Flexjar is connected to your Stripe account <Badge variant="tiny">{stripeAccount.name}</Badge>
          </Text>
        )}
      </Box>

      <Box sx={{ bg: 'transparent', borderRadius: 4, pt: 3, px: 3 }}>
        <Text sx={{ fontSize: '12px', textAlign: 'center' }}>
          <Button onClick={() => signOut()} variant="tiny">
            sign out
          </Button>
        </Text>
      </Box>
    </Card>
  );
};
