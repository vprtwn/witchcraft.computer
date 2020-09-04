import React, { useState, useEffect, useRef } from 'react';
import { Card, Text } from 'theme-ui';
import DeleteToolbar from './DeleteToolbar';
import { readDict } from '../lib/metadataUtils';

export default (props) => {
  const signedIn = props.signedIn;
  // widgets read from all metadata, which is meh but ok
  let content = readDict(props.metadata, props.id, null);

  return (
    <Card variant="widget">
      <Text
        sx={{ p: 2, bg: 'text', color: 'background', fontFamily: 'inter', cursor: 'pointer' }}
        onClick={() => {
          window.location.assign(content.url);
        }}
      >
        {content.text}
      </Text>
      {signedIn && !props.hideToolbar && (
        <DeleteToolbar
          onDelete={props.onDelete}
          hideDown={props.hideDown}
          hideUp={props.hideUp}
          onUp={props.onUp}
          onDown={props.onDown}
        />
      )}
    </Card>
  );
};
