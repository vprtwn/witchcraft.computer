import React, { useState, useEffect, useRef } from 'react';
import { Card, Box } from 'theme-ui';
import { useDebounce } from 'use-debounce';
import { readString, postMetadataUpdate } from '../lib/metadataUtils';
import Stripe from 'stripe';
import Editor from 'rich-markdown-editor';
import EditToolbar from './EditToolbar';
import RichMarkdownEditor from 'rich-markdown-editor';

const DEBOUNCE_MS = 700;

export default (props) => {
  const signedIn = props.signedIn;
  // widgets read from all metadata, which is meh but ok
  let initialMd = readString(props.metadata, props.id, props.signedIn ? props.default : null);
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(initialMd);
  const [debouncedText] = useDebounce(text, DEBOUNCE_MS);
  const editorRef = useRef<RichMarkdownEditor | null>(null);

  useEffect(() => {
    syncUpdatedText(debouncedText);
  }, [debouncedText]);

  useEffect(() => {
    if (editing) {
      editorRef.current.focusAtEnd();
    }
  }, [editing]);

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
    <Card variant="widget">
      <Box p={2}>
        <Editor
          ref={editorRef}
          defaultValue={text}
          placeholder=""
          readOnly={!editing}
          onChange={(v) => {
            setText(v());
          }}
        />
      </Box>
      {signedIn && !props.hideToolbar && (
        <EditToolbar
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
