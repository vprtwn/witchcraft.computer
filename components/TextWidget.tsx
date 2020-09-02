import React, { useState, useEffect } from 'react';
import { Card, Box } from 'theme-ui';
import { useDebounce } from 'use-debounce';
import { readString, postMetadataUpdate } from '../lib/metadataUtils';
import Stripe from 'stripe';
import Editor from 'rich-markdown-editor';
import WidgetToolbar from './WidgetToolbar';

const DEBOUNCE_MS = 700;

export default (props) => {
  const defaultMd = '_edit me_';
  const signedIn = props.signedIn;
  // currently, widget reads its own value from all the metadata. seems ~fine
  let initialMd = readString(props.metadata, props.id, props.signedIn ? defaultMd : null);
  let showEditor = signedIn;
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(initialMd);
  const [debouncedText] = useDebounce(text, DEBOUNCE_MS);

  useEffect(() => {
    if (props.onChangeEditing) {
      props.onChangeEditing(editing);
    }
  }, [editing]);

  useEffect(() => {
    syncUpdatedText(debouncedText);
  }, [debouncedText]);

  const syncUpdatedText = async function (value) {
    try {
      const newVal = (await postMetadataUpdate(props.id, value, props.customerId, props.username)) as Stripe.Metadata;
      if (newVal && typeof newVal === 'string') {
        setText(newVal);
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
    >
      <Box p={2}>
        <Editor
          defaultValue={text}
          readOnly={!editing}
          onChange={(v) => {
            setText(v());
          }}
        />
      </Box>
      {showEditor && !props.hideToolbar && (
        <WidgetToolbar
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