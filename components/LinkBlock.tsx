import React, { useState, useEffect, useRef } from 'react';
import { Card, Input, Flex, Box } from 'theme-ui';
import { useDebounce } from 'use-debounce';
import EditToolbar from './EditToolbar';
import { updatePage } from '../lib/updatePage';
import isUrl from 'is-url';
import TextareaAutosize from 'react-textarea-autosize';

const DEBOUNCE_MS = 700;

const LinkBlock = (props) => {
  const signedIn = props.signedIn;
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const content = props.data[props.id];
  const initialText = content ? (content.text as string) : '';
  const initialUrl = content ? (content.url as string) : '';
  const initialComment = content ? (content.comment as string) : '';
  const [text, setText] = useState<string>(initialText);
  const [url, setUrl] = useState<string>(initialUrl);
  const [comment, setComment] = useState<string>(initialComment);
  const [debouncedText] = useDebounce(text, DEBOUNCE_MS);
  const [debouncedUrl] = useDebounce(url, DEBOUNCE_MS);
  const [debouncedComment] = useDebounce(comment, DEBOUNCE_MS);

  useEffect(() => {
    if (isUrl(debouncedUrl) && text.length > 0) {
      const value = {
        url: debouncedUrl,
        text: debouncedText,
        comment: debouncedComment,
      };
      syncUpdates(value);
    }
  }, [debouncedText, debouncedUrl, debouncedComment]);

  const syncUpdates = async function (value) {
    try {
      await updatePage(props.uploadUrl, props.data, props.id, value);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card variant="block" sx={{ border: 'solid 1px black', fontSize: '15px' }}>
      <>
        <Flex
          onClick={() => {
            if (content && props.hideToolbar) {
              window.location.assign(content.url as string);
            } else {
              setEditing(true);
            }
          }}
          sx={{
            pl: 2,
            pr: 1,
            py: 0,
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 8,
            bg: 'white',
            color: 'black',
            cursor: 'pointer',
          }}
        >
          <Box sx={{ flexGrow: 1, py: 1 }}>
            <Input
              ref={inputRef}
              variant="linkInput"
              sx={{ pointerEvents: props.hideToolbar ? 'none' : 'auto' }}
              defaultValue={text}
              placeholder="Link text"
              onChange={(t) => {
                setText(t.target.value);
              }}
            />
          </Box>
        </Flex>
        {editing && !props.hideToolbar && (
          <Box sx={{ py: 1, px: 2, bg: 'transparent' }}>
            <Input
              ref={inputRef}
              type="url"
              variant="linkInput"
              defaultValue={url}
              placeholder="Link address"
              sx={{
                fontSize: '14px',
                fontFamily: 'mono',
              }}
              onChange={(e) => {
                const val = e.target.value;
                if (isUrl(val)) {
                  setUrl(val);
                }
              }}
            ></Input>
          </Box>
        )}
      </>
      {((!props.hideToolbar && (editing || (!editing && comment && comment.length > 0))) ||
        (props.hideToolbar && comment && comment.length > 0)) && (
        <Flex
          sx={{ py: 1, px: 2, bg: 'lightGray', borderRadius: '0px 0px 8px 8px' }}
          onClick={() => {
            if (!props.hideToolbar) {
              setEditing(true);
            }
          }}
        >
          <TextareaAutosize
            defaultValue={comment}
            style={{
              background: 'transparent',
              width: '100%',
              resize: 'none',
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
              fontSize: '13px',
              border: 'none',
              paddingLeft: 8,
              paddingTop: 4,
              paddingBottom: 4,
              overflow: 'hidden',
              pointerEvents: props.hideToolbar ? 'none' : 'auto',
            }}
            placeholder="Comment (optional)"
            onChange={(t) => {
              setComment(t.target.value);
            }}
          />
        </Flex>
      )}
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
export default LinkBlock;
