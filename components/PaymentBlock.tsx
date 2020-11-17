import React, { useState, useEffect, useRef } from 'react';
import { Card, Box, Button, Flex, IconButton, Input } from 'theme-ui';
import fetchJson from '../lib/fetchJson';
import NumberFormat from 'react-number-format';
import MinusButtonIcon from './MinusButtonIcon';
import PaymentFeedBlock from './PaymentFeedBlock';
import PlusButtonIcon from './PlusButtonIcon';
import { loadStripe } from '@stripe/stripe-js';

const PaymentBlock = (props) => {
  const [showingForm, setShowingForm] = useState(false);
  const [amount, setAmount] = useState(props.defaultAmount as number);
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const stripeAccount = props.stripeAccount;
  let stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (props.signedIn) {
    stripeKey = process.env.NEXT_PUBLIC_STRIPE_TEST_PUBLISHABLE_KEY;
  }
  const stripePromise = loadStripe(stripeKey, { stripeAccount: stripeAccount['id'] });

  useEffect(() => {
    if (showingForm) {
      firstInputRef.current.focus();
    }
  }, [showingForm]);

  const handleCheckout = async (e) => {
    if (e) {
      e.preventDefault();
    }
    const stripe = await stripePromise;
    const body = { amount: amount, message: firstInputRef.current.value };
    let checkoutSessionId = null;
    try {
      const response = await fetchJson('/api/create_checkout_session', {
        method: 'POST',
        body: JSON.stringify(body),
      });
      checkoutSessionId = response.id;
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
    <Card
      variant="card_payment"
      sx={{
        mt: 4,
      }}
    >
      {showingForm && (
        <Card variant="card_payment_form" as="form" onSubmit={handleCheckout}>
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
              variant="button_emphasis"
              onClick={() => {
                setShowingForm(false);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="button_emphasis"
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
            variant="button_emphasis"
            sx={{ flexGrow: 1 }}
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
export default PaymentBlock;
