import React, { useState, useEffect, useRef } from 'react';
import { Card, Box, Button, Flex, IconButton, Input } from 'theme-ui';
import { readDict } from '../lib/metadataUtils';
import NumberFormat from 'react-number-format';
import MinusButtonIcon from './MinusButtonIcon';
import PlusButtonIcon from './PlusButtonIcon';

export default (props) => {
  // blocks read from all metadata, which is meh but ok
  console.dir(props.metadata);
  let content = readDict(props.metadata, 'b.payment');
  // TODO: initialize amount field with content.defaultAmount

  const [showingForm, setShowingForm] = useState(false);
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (showingForm) {
      firstInputRef.current.focus();
    }
  }, [showingForm]);

  return (
    <>
      {showingForm && (
        <Card
          variant="shadowBlock"
          as="form"
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: convert to number
            const amount = e.currentTarget.amount.value;
            const message = e.currentTarget.message.value;
            props.onClick({ amount: amount, message: message });
          }}
          sx={{}}
        >
          <Flex sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <IconButton
              type="button"
              sx={{ p: 4 }}
              onClick={() => {
                //todo
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
                value={content ? content.amount : 5}
                displayType={'input'}
                thousandSeparator={true}
                prefix={'$'}
                customInput={Input}
                renderText={(value) => <Input value={value}></Input>}
              />
            </Box>
            <IconButton
              type="button"
              sx={{ p: 4 }}
              onClick={() => {
                //todo
              }}
            >
              <PlusButtonIcon />
            </IconButton>
          </Flex>
          <Input
            name="message"
            id="message"
            placeholder="Leave a message"
            my={3}
            sx={{ fontSize: 16 }}
            ref={firstInputRef}
            required
          />
          <Flex sx={{ justifyContent: 'space-between' }}>
            <Button
              type="button"
              variant="paymentCancel"
              onClick={() => {
                setShowingForm(false);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="paymentContinue"
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
        <Flex sx={{ justifyContent: 'space-between' }}>
          <Button
            variant="payment"
            sx={{ flexGrow: 1 }}
            onClick={() => {
              setShowingForm(true);
            }}
          >
            {content ? content.text : 'Pay me'}
          </Button>
        </Flex>
      )}
    </>
  );
};
