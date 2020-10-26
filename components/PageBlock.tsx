import React, { useState, useEffect, useRef } from 'react';
import { Card, Input, Flex, Box } from 'theme-ui';
import { useDebounce } from 'use-debounce';
import EditToolbar from './EditToolbar';
import ChevronRightIcon from './ChevronRightIcon';
import { postMetadataUpdate } from '../lib/metadataUtils';
import { readDict } from '../lib/metadataUtils';
import isUrl from 'is-url';
import TextareaAutosize from 'react-textarea-autosize';

const DEBOUNCE_MS = 700;

export default (props) => {
  const signedIn = props.signedIn;
  // blocks read from all metadata, which is meh but ok
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const content = readDict(props.metadata, props.id);
  console.log('content', JSON.stringify(content, null, 2));
  const initialText = content ? (content.text as string) : '';
  const [text, setText] = useState<string>(initialText);
  const [debouncedText] = useDebounce(text, DEBOUNCE_MS);

  useEffect(() => {
    const value = {
      text: debouncedText,
    };
    syncUpdates(value);
  }, [debouncedText]);

  const syncUpdates = async function (value) {
    try {
      await postMetadataUpdate(props.id, value, props.customerId, props.username);
      // TODO: handle errors
      // setText(value);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card variant="block" sx={{ borderColor: 'black', bg: 'white', '&:hover': { bg: 'lightGray', cursor: 'pointer' } }}>
      <Flex
        sx={{ py: 2, px: 2, bg: 'transparent' }}
        onClick={() => {
          if (!props.hideToolbar) {
            setEditing(true);
          }
        }}
      >
        <TextareaAutosize
          defaultValue={text}
          style={{
            background: 'transparent',
            width: '100%',
            resize: 'none',
            fontFamily: 'Inter',
            fontSize: '17px',
            border: 'none',
            paddingLeft: 8,
            paddingTop: 4,
            paddingBottom: 4,
            overflow: 'hidden',
            pointerEvents: props.hideToolbar ? 'none' : 'auto',
          }}
          placeholder=""
          onChange={(t) => {
            setText(t.target.value);
          }}
        />
      </Flex>
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
            if (inputRef.current) {
              if (!editing) {
                inputRef.current.focus();
              } else {
                inputRef.current.blur();
              }
            }
          }}
        />
      )}
    </Card>
  );
};
