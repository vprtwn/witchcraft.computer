import React, { useState, useEffect } from 'react';
import { Card, Box, IconButton, Button, Flex, Label } from 'theme-ui';
import { useDebounce } from 'use-debounce';
import { readString, postMetadataUpdate } from '../lib/metadataUtils';
import Stripe from 'stripe';
import Editor from 'rich-markdown-editor';
import EditButtonIcon from './EditButtonIcon';
import ViewButtonIcon from './ViewButtonIcon';
import DeleteButtonIcon from './DeleteButtonIcon';
import DownButtonIcon from './DownButtonIcon';
import UpButtonIcon from './UpButtonIcon';

const DEBOUNCE_MS = 700;

export default (props) => {
  const [editing, setEditing] = useState(false);

  return (
    <Flex sx={{ bg: 'outline', borderRadius: 4, py: 2 }}>
      <Box sx={{ ml: 2, flexGrow: 1, visibility: editing ? 'visible' : 'hidden' }}>
        <IconButton
          variant="icon"
          sx={{ left: 0 }}
          onClick={() => {
            props.onDelete();
          }}
        >
          <DeleteButtonIcon />
        </IconButton>
      </Box>
      <Box sx={{ flexGrow: 1 }} hidden={editing}>
        <IconButton sx={{ left: 0, visibility: props.hideDown ? 'hidden' : 'visible' }} onClick={props.onDown}>
          <DownButtonIcon />
        </IconButton>
      </Box>
      <Box sx={{ visibility: props.hideUp ? 'hidden' : 'visible' }} hidden={editing}>
        <IconButton sx={{ right: 0, mr: 2 }} onClick={props.onUp}>
          <UpButtonIcon />
        </IconButton>
      </Box>
      <Box>
        <IconButton
          sx={{ mr: 3 }}
          onClick={() => {
            setEditing(!editing);
          }}
        >
          {editing ? <ViewButtonIcon /> : <EditButtonIcon />}
        </IconButton>
      </Box>
    </Flex>
  );
};
