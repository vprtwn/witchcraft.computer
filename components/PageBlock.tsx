import React, { useState, useEffect, useRef } from 'react';
import { Card, Text, Flex, Box } from 'theme-ui';
import PageBlockEditToolbar from './PageBlockEditToolbar';
import fetchJson from '../lib/fetchJson';

const PageBlock = (props) => {
  const signedIn = props.signedIn;
  const content = props.data ? props.data[props.id] : null;
  const [editing, setEditing] = useState(false);
  const title = content ? content['title'] : 'New page ➜';

  return (
    <Card
      variant="block"
      sx={{
        border: 'solid 2px black',
        bg: 'white',
        '&:hover': {
          cursor: 'pointer',
        },
      }}
    >
      <Flex
        sx={{ py: 3, px: 3, bg: 'transparent' }}
        onClick={() => {
          window.location.assign(`/@${props.username}/${content.id}` as string);
        }}
      >
        <Text
          sx={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
            fontSize: '16px',
            fontWeight: 'bold',
            border: 'none',
          }}
        >
          {title}
        </Text>
      </Flex>
      {signedIn && !props.hideToolbar && (
        <PageBlockEditToolbar
          editing={editing}
          onDelete={props.onDelete}
          hideDown={props.hideDown}
          hideUp={props.hideUp}
          onUp={props.onUp}
          onDown={props.onDown}
          onSwitchEditing={() => {
            setEditing(!editing);
          }}
        />
      )}
    </Card>
  );
};
export default PageBlock;
