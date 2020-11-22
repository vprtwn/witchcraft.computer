import React, { useState, useEffect, useRef } from 'react';
import { Card, Flex, Link } from 'theme-ui';
import PageBlockEditToolbar from './PageBlockEditToolbar';

const PageBlock = (props) => {
  const signedIn = props.signedIn;
  const content = props.data ? props.data[props.id] : null;
  const [editing, setEditing] = useState(false);
  let title = content ? content['title'] : null;
  if (!title) {
    title = 'New page ➜';
  }
  const url = `/@${props.username}/${content.id}`;

  if (!signedIn && title.startsWith('New page')) {
    return <></>;
  }

  return (
    <Card
      variant="card_block_link"
      sx={{
        background: title === 'New page' ? 'linear-gradient(-45deg, #e6fffa, #faf5ff, #ebf8ff)' : 'white',
        backgroundSize: '400% 400%',
        animation: title === 'New page' ? 'gradient 10s ease infinite' : 'none',
      }}
    >
      <Flex
        sx={{ py: 3, px: 3, bg: 'transparent' }}
        onClick={() => {
          window.location.assign(url);
        }}
      >
        <Link variant="link_page_block" href={url}>
          {title}
        </Link>
      </Flex>
      {signedIn && !props.previewing && (
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
