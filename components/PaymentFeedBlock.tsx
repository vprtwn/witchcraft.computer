import React, { useState, useEffect, useRef } from 'react';
import { Card, Box, Flex, IconButton, Input, Text } from 'theme-ui';
import fetchJson from '../lib/fetchJson';
import NumberFormat from 'react-number-format';

export default (props) => {
  const [payments, setPayments] = useState<Array<object>>([]);

  const fetchPayments = async () => {
    try {
      const response = await fetchJson('/api/list_payments', {
        method: 'GET',
      });
      setPayments(response.payments);
    } catch (e) {
      // TODO: handle errors (in this entire function)
      console.error(e);
      return;
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
                <Text
                  sx={{
                    py: 2,
                    color: 'black',
                    fontSize: 12,
                  }}
                >
                  {p.message}
                </Text>
                <Card
                  sx={{
                    py: 0,
                    px: 2,
                    my: 2,
                    fontSize: 10,
                    borderRadius: 8,
                    color: 'black',
                    bg: 'white',
                  }}
                >
                  $5
                </Card>
              </Flex>
            );
          })}
        </>
      )}
    </Box>
  );
};
