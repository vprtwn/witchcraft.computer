import React, { useState, useEffect, useRef } from 'react';
import { Card, Input, Flex, Box } from 'theme-ui';
import { useDebounce } from 'use-debounce';
import EditToolbar from './EditToolbar';
import { updatePage } from '../lib/updatePage';
import TextareaAutosize from 'react-textarea-autosize';

const DEBOUNCE_MS = 700;

const PageBlock = (props) => {
  const signedIn = props.signedIn;
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const content = props.data[props.id];
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
      await updatePage(props.uploadUrl, props.data, props.id, value);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card
      variant="block"
      sx={{
        border: 'solid 2px black',
        bg: 'white',
        '&:hover': {
          // bg: 'lightGray',
          cursor: 'pointer',
          background: 'linear-gradient(-45deg, #ebf8ff, #f7fafc, #ebf4ff)',
          backgroundSize: '400% 400%',
          animation: 'gradient 10s ease infinite',
        },
      }}
    >
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
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
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
export default PageBlock;
