import React, { useState, useEffect, useRef } from 'react';
import { Card, Box, Button, Flex, IconButton, Input } from 'theme-ui';
import { readDict } from '../lib/metadataUtils';
import fetchJson from '../lib/fetchJson';
import NumberFormat from 'react-number-format';
import MinusButtonIcon from './MinusButtonIcon';
import PaymentFeedBlock from './PaymentFeedBlock';
import PlusButtonIcon from './PlusButtonIcon';
import { useStripe } from '@stripe/react-stripe-js';

export default (props) => {
  const [showingForm, setShowingForm] = useState(false);
  const [amount, setAmount] = useState(props.defaultAmount as number);
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const stripe = useStripe();

  useEffect(() => {
    if (showingForm) {
      firstInputRef.current.focus();
    }
  }, [showingForm]);

  const handleCheckout = async (e) => {
    if (e) {
      e.preventDefault();
    }
    const message = e.currentTarget.message.value;
    const body = { amount: amount, message: message };
    let checkoutSessionId = null;
    try {
      const response = await fetchJson('/api/create_checkout_session', {
        method: 'POST',
        body: JSON.stringify(body),
      });
      checkoutSessionId = response.id;
      console.dir(response);
    } catch (e) {
      // TODO: handle errors (in this entire function)
      console.error(e);
      return;
    }

    if (!checkoutSessionId) {
      console.error('create checkout session failed');
      return;
    }

    const { error } = await stripe!.redirectToCheckout({
      sessionId: checkoutSessionId,
    });
    if (error) {
      console.error(error);
      return;
    }
  };

  return (
    <Card variant="block" sx={{ my: 4, py: 2, px: 3, bg: showingForm ? 'lightGreen' : 'offWhite' }}>
      {showingForm && (
        <Card variant="shadowCard" as="form" onSubmit={handleCheckout} sx={{}}>
          <Flex sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <IconButton
              type="button"
              sx={{ p: 4 }}
              onClick={() => {
                if (amount > 100) {
                  setAmount(amount - 100);
                }
              }}
            >
              <MinusButtonIcon />
            </IconButton>
            <Box sx={{ textAlign: 'center' }}>
              <NumberFormat
                name="amount"
                id="amount"
                decimalScale={0}
                allowEmptyFormatting={true}
                allowNegative={false}
                type="tel"
                // defaultValue={(props.defaultAmount as number) / 100.0}
                displayType={'input'}
                thousandSeparator={true}
                prefix={'$'}
                customInput={Input}
                value={(amount as number) / 100.0}
                renderText={(value) => <Input value={value}></Input>}
                onValueChange={(values) => setAmount(~~(values.floatValue * 100))}
              />
            </Box>
            <IconButton
              type="button"
              sx={{ p: 4 }}
              onClick={() => {
                setAmount(amount + 100);
              }}
            >
              <PlusButtonIcon />
            </IconButton>
          </Flex>
          <Input
            name="message"
            id="message"
            placeholder="Message"
            mt={1}
            mb={3}
            sx={{ fontSize: 14, fontWeight: 'normal' }}
            ref={firstInputRef}
          />
          <Flex sx={{ justifyContent: 'space-between' }}>
            <Button
              type="button"
              variant="shadowButton"
              onClick={() => {
                setShowingForm(false);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="shadowButton"
              type="submit"
              onClick={() => {
                //todo
              }}
            >
              Continue
            </Button>
          </Flex>
        </Card>
      )}
      {!showingForm && (
        <Flex sx={{ justifyContent: 'space-between', py: 2 }}>
          <Button
            variant="shadowButton"
            sx={{ flexGrow: 1, fontSize: 15 }}
            onClick={() => {
              setShowingForm(true);
            }}
          >
            {props.text}
          </Button>
        </Flex>
      )}
      {!props.hideTipsFeed && <PaymentFeedBlock />}
    </Card>
  );
};
