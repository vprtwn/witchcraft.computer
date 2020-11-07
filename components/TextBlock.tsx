import React, { useState, useEffect, useRef } from 'react';
import { Card, Box } from 'theme-ui';
import { useDebounce } from 'use-debounce';
import { readString, updatePage } from '../lib/metadataUtils';
import Editor from 'rich-markdown-editor';
import EditToolbar from './EditToolbar';
import RichMarkdownEditor from 'rich-markdown-editor';

const DEBOUNCE_MS = 700;

const TextBlock = (props) => {
  const signedIn = props.signedIn;
  // blocks read from all metadata, which is meh but ok
  let initialText = readString(props.metadata, props.id, props.signedIn ? props.default : null);
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
      await updatePage(props.uploadUrl, props.metadata, props.id, value);
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
