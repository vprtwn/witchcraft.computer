import React, { useState, useEffect, useRef } from 'react';
import { Card, Text, Flex, Box } from 'theme-ui';
import PageBlockEditToolbar from './PageBlockEditToolbar';

const DEBOUNCE_MS = 700;

const PageBlock = (props) => {
  const signedIn = props.signedIn;
  const content = props.data ? props.data[props.id] : null;
  if (content) {
    const id = content['id'];
    // todo: fetch
  }
  const [editing, setEditing] = useState(false);
  const initialText = 'New page';

  useEffect(() => {}, []);

  return (
    <Card
      variant="block"
      sx={{
        border: 'solid 2px black',
        bg: 'white',
        '&:hover': {
          // bg: 'lightGray',
          cursor: 'pointer',
          background: 'linear-gradient(-45deg, #ebf8ff, #f7fafc, #ebf4ff)',
          backgroundSize: '400% 400%',
          animation: 'gradient 10s ease infinite',
        },
      }}
    >
      <Flex
        sx={{ py: 3, px: 3, bg: 'transparent' }}
        onClick={() => {
          window.location.assign(`${props.username}/${content.id}` as string);
        }}
      >
        <Text
          sx={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
            fontSize: '16px',
            border: 'none',
          }}
        >
          {initialText}
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
