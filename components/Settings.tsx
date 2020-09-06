import React, { useState } from 'react';
import { Card, Label, Text, Button, Flex, Box, useColorMode, Badge } from 'theme-ui';
import { signOut } from 'next-auth/client';
import { readDict } from '../lib/metadataUtils';
import fetchJson from '../lib/fetchJson';
import SignOutButtonIcon from './SignOutButtonIcon';

export default (props) => {
  // TODO: add type safety: interfaces for style and stripeAccount
  const defaultStyle = { colorMode: 'light' };
  const initialStripeAccount = readDict(props.metadata, 'stripeAccount');
  const [stripeAccount, setStripeAccount] = useState(initialStripeAccount);
  const remoteStyle = readDict(props.metadata, 'style', defaultStyle);
  const [style, setStyle] = useState(remoteStyle);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [colorMode, setColorMode] = useColorMode();
  if (colorMode != style.colorMode) {
    setColorMode(colorMode);
  }

  const connectUrl = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_STRIPE_CONNECT_CLIENT_ID}&scope=read_write&state=${props.username}`;

  const disconnectStripe = async function () {
    try {
      await fetchJson('/api/disconnect_stripe', {
        method: 'POST',
      });
      setStripeAccount(null);
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  return (
    <Card
      sx={{
        p: 3,
        my: 2,
        bg: 'white',
        boxShadow: '0 0 8px rgba(0, 0, 0, 0.125)',
        borderRadius: 8,
        border: '1px solid outline',
        // borderColor: 'text',
      }}
    >
      <Box pb={2}>
        <Label variant="settingslabel">{stripeAccount ? 'Payments enabled' : '💸 Add payments'}</Label>
        {!stripeAccount && (
          <Box pt={2}>
            <Text variant="small">Flexjar makes it easy to collect tips on your page.</Text>
            <Text variant="small">Connect a Stripe account to get started. </Text>
            <Box pt={3}>
              <Button
                variant="tiny"
                mr={2}
                onClick={() => {
                  window.location.assign(connectUrl);
                }}
              >
                Connect Stripe
              </Button>{' '}
            </Box>
          </Box>
        )}
        {stripeAccount && (
          <Box>
            <Text variant="small">Flexjar is connected to your Stripe account:</Text>
            <pre>{JSON.stringify(stripeAccount, null, 2)}</pre>
            <Button
              variant="tiny"
              mr={2}
              onClick={() => {
                disconnectStripe();
              }}
            >
              Disconnect Stripe
            </Button>{' '}
            {errorMessage && <Text variant="small">{errorMessage}</Text>}
          </Box>
        )}
      </Box>

      <Flex sx={{ bg: 'transparent', borderRadius: 4, pt: 4, flexDirection: 'row-reverse' }}>
        <Button onClick={() => signOut()} variant="tiny" sx={{ color: 'outline', cursor: 'pointer' }}>
          <SignOutButtonIcon />
        </Button>
      </Flex>
    </Card>
  );
};
