import React, { useState, useEffect, useRef } from 'react';
import { Card, Box, Flex, IconButton, Input, Text } from 'theme-ui';
import fetchJson from '../lib/fetchJson';
import NumberFormat from 'react-number-format';

const PaymentFeedBlock = (props) => {
  const [payments, setPayments] = useState<Array<object>>([]);

  const fetchPayments = async () => {
    try {
      const response = await fetchJson('/api/list_payments', {
        method: 'GET',
      });
      setPayments(response.payments);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <Box>
      {payments.length > 0 && (
        <>
          {payments.map((p: any) => {
            return (
              <Flex id={p.id} sx={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Text variant="text_sm">{p.message}</Text>
              </Flex>
            );
          })}
        </>
      )}
    </Box>
  );
};
export default PaymentFeedBlock;
