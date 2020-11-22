import React, { useState, useEffect, useRef } from 'react';
import { Link, Box, Card, Flex, Text } from 'theme-ui';
import fetchJson from '../lib/fetchJson';
import UserLink from './UserLink';

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
    <Flex sx={{ justifyContent: 'space-between', alignItems: 'flex-end', mb: 5 }}>
      <Box />
      {users.length > 0 && (
        <Card>
          <Text sx={{ textAlign: 'center', pb: 0, fontSize: 25 }}> 🏙</Text>
          <Text sx={{ textAlign: 'center', fontSize: 0, pb: 1 }}>pop. {users.length}</Text>
          {users.map((user: any) => {
            return <UserLink data={user} />;
          })}
        </Card>
      )}
      <Box />
    </Flex>
  );
};
export default UserListBlock;
