import React, { useState, useEffect, useRef } from 'react';
import { Card, Box } from 'theme-ui';
import { useDebounce } from 'use-debounce';
import { updatePage } from '../lib/updatePage';
import { light } from '../lib/editorThemes';
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
      await updatePage(props.uploadUrl, props.data, props.id, newText);
      setText(newText);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card variant="textBlock" sx={{ fontSize: '15px', bg: 'transparent' }}>
      <Box
        sx={{ px: 0, py: 2, cursor: 'text' }}
        onClick={() => {
          if (!props.previewing && !editing) {
            setEditing(true);
          }
        }}
      >
        <TextareaAutosize
          defaultValue={text}
          spellCheck={false}
          style={{
            background: 'transparent',
            width: '100%',
            resize: 'none',
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
            fontSize: '16px',
            border: 'none',
            paddingTop: 4,
            paddingBottom: 4,
            overflow: 'hidden',
            pointerEvents: props.previewing ? 'none' : 'auto',
          }}
          placeholder="Comment (optional)"
          onChange={(t) => {
            setText(t.target.value);
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
export default TextBlock;
