import React, { useState, useEffect, useRef } from 'react';
import { Link, Box, Flex, Text } from 'theme-ui';
import fetchJson from '../lib/fetchJson';

const PaymentFeedBlock = (props) => {
  const [users, setUsers] = useState<Array<object>>([]);

  const fetchUsers = async () => {
    try {
      const response = await fetchJson('/api/list_users', {
        method: 'GET',
      });
      setUsers(response.users);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Box>
      <Text sx={{ textAlign: 'center', pb: 2 }}> 🟢</Text>
      {users.length > 0 && (
        <>
          {users.map((user: any) => {
            return (
              <Flex id={'bar'} sx={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Box />
                <Link
                  variant="link_footer"
                  sx={{
                    py: 2,
                  }}
                  href={`/${user.Key}`}
                >
                  {user.Key}
                </Link>
                <Box />
              </Flex>
            );
          })}
        </>
      )}
    </Box>
  );
};
export default PaymentFeedBlock;
