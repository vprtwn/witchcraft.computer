import React, { useState, useEffect, useRef } from 'react';
import { Card, Box, Text } from 'theme-ui';
import { useDebounce } from 'use-debounce';
import { updatePage, transformPageData } from '../lib/updatePage';
import EditToolbar from './EditToolbar';
import TextareaAutosize from 'react-textarea-autosize';

const DEBOUNCE_MS = 700;

const TextBlock = (props) => {
  const signedIn = props.signedIn;
  let initialText = props.data ? props.data[props.id] : null;
  if (props.signedIn && !initialText) {
    initialText = props.default;
  }
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const [debouncedText] = useDebounce(text, DEBOUNCE_MS);

  useEffect(() => {
    if (debouncedText !== initialText) {
      syncUpdatedText(debouncedText);
    }
  }, [debouncedText]);

  const syncUpdatedText = async function (newText: string) {
    try {
      const pageData = transformPageData(props.data, props.id, newText);
      await updatePage(props.uploadUrl, pageData);
      setText(newText);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card variant="card_block_text">
      <Box
        onClick={() => {
          if (!props.previewing && !editing) {
            setEditing(true);
          }
        }}
      >
        {editing && (
          <TextareaAutosize
            defaultValue={text}
            spellCheck={false}
            style={{
              background: 'transparent',
              width: '100%',
              resize: 'none',
              fontFamily:
                'Recursive ',
              fontSize: '16px',
              border: 'none',
              lineHeight: 1.5,
              paddingLeft: 2,
              paddingRight: 2,
              paddingTop: 8,
              paddingBottom: 8,
              overflow: 'hidden',
              pointerEvents: props.previewing ? 'none' : 'auto',
            }}
            placeholder="Note"
            onChange={(t) => {
              setText(t.target.value);
            }}
          />
        )}
        {!editing && <Text variant="text_block_text">{text.length === 0 ? '' : text}</Text>}
      </Box>
      {signedIn && !props.previewing && (
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
export default TextBlock;
