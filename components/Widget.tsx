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
  const defaultMd = '_edit me_';
  const signedIn = props.signedIn;
  let initialMd = readString(props.metadata, props.id, props.signedIn ? defaultMd : null);
  let showEditor = signedIn;
  let hidden = false;
  if (!signedIn && !initialMd) {
    hidden = true;
  }
  const [editing, setEditing] = useState(false);
  const [cardVal, setCardVal] = useState(initialMd);
  const [debouncedCardVal] = useDebounce(cardVal, DEBOUNCE_MS);

  useEffect(() => {
    if (props.onChangeEditing) {
      props.onChangeEditing(editing);
    }
  }, [editing]);

  useEffect(() => {
    updateCardValue(debouncedCardVal);
  }, [debouncedCardVal]);

  const updateCardValue = async function (value) {
    try {
      const newVal = (await postMetadataUpdate(props.id, value, props.customerId, props.username)) as Stripe.Metadata;
      if (newVal && typeof newVal === 'string') {
        setCardVal(newVal);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card
      sx={{
        py: 0,
        px: 0,
        my: 4,
        border: editing ? '2px solid' : '1px solid',
        borderColor: 'text',
        borderRadius: 4,
        bg: 'white',
      }}
      hidden={hidden}
    >
      <Box p={2}>
        <Editor
          defaultValue={cardVal}
          readOnly={!editing}
          onChange={(v) => {
            setCardVal(v());
          }}
        />
      </Box>
      {showEditor && !props.hideToolbar && (
        <Flex sx={{ bg: 'outline', borderRadius: 4, py: 2 }}>
          <Box sx={{ ml: 2, flexGrow: 1 }}>
            <IconButton
              variant="icon"
              sx={{ left: 0 }}
              onClick={() => {
                setEditing(!editing);
              }}
            >
              {editing ? <ViewButtonIcon /> : <EditButtonIcon />}
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
          <Box hidden={!editing}>
            <IconButton
              sx={{ mr: 3 }}
              onClick={() => {
                props.onDelete();
              }}
            >
              <DeleteButtonIcon />
            </IconButton>
          </Box>
        </Flex>
      )}
    </Card>
  );
};
