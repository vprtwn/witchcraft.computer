import React, { useState, useEffect, useRef } from 'react';
import { Card, Box, Button, Flex, IconButton, Input } from 'theme-ui';
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
    <>
      <pre>{JSON.stringify(payments, null, 2)}</pre>
    </>
  );
};
