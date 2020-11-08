import React, { useState, useEffect, useRef } from 'react';
import { Card, Box } from 'theme-ui';
import { useDebounce } from 'use-debounce';
import { updatePage } from '../lib/updatePage';
import Editor from 'rich-markdown-editor';
import EditToolbar from './EditToolbar';
import RichMarkdownEditor from 'rich-markdown-editor';

const DEBOUNCE_MS = 700;

const TextBlock = (props) => {
  const signedIn = props.signedIn;
  let initialText = props.data[props.id];
  if (props.signedIn && !initialText) {
    initialText = props.default;
  }
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const [debouncedText] = useDebounce(text, DEBOUNCE_MS);
  const editorRef = useRef<RichMarkdownEditor | null>(null);

  useEffect(() => {
    if (debouncedText !== initialText) {
      syncUpdatedText(debouncedText);
    }
  }, [debouncedText]);

  useEffect(() => {
    if (editing) {
      editorRef.current.focusAtEnd();
    }
  }, [editing]);

  const syncUpdatedText = async function (value) {
    try {
      await updatePage(props.uploadUrl, props.data, props.id, value);
      setText(value);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card variant="textBlock" sx={{ fontSize: '15px' }}>
      <Box
        sx={{ px: 0, py: 2, cursor: 'text' }}
        onClick={() => {
          if (!props.previewing && !editing) {
            setEditing(true);
            editorRef.current.focusAtEnd();
          }
        }}
      >
        <Editor
          ref={editorRef}
          defaultValue={text}
          placeholder=""
          readOnly={props.previewing || !editing}
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
export default TextBlock;
