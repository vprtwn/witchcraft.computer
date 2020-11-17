import React, { useState, useEffect, useRef } from 'react';
import { Link, Box, Card, Flex, Text } from 'theme-ui';
import fetchJson from '../lib/fetchJson';

const UserListBlock = (props) => {
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
    <Flex sx={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
      <Box />
      {users.length > 0 && (
        <Card variant="card_dotted_black">
          <Text sx={{ textAlign: 'center', pb: 2 }}> 🟢</Text>
          {users.map((user: any) => {
            return (
              <Box key={user.Key} sx={{ textAlign: 'center', py: 2 }}>
                <Link variant="link_no_underline" href={`/${user.Key}`}>
                  {user.Key}
                </Link>
              </Box>
            );
          })}
        </Card>
      )}
      <Box />
    </Flex>
  );
};
export default UserListBlock;
