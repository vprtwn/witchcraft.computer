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
      await postMetadataUpdate(props.id, value, props.customerId, props.username);
      // TODO: handle errors
      // setText(value);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card variant="block" sx={{ borderColor: 'black', fontSize: '15px' }}>
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
            py: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 4,
            bg: 'text',
            color: 'background',
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
          <ChevronRightIcon />
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
                fontSize: '15px',
                fontFamily: 'monospace',
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
          sx={{ py: 1, px: 2, bg: 'transparent' }}
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
              fontFamily: 'monospace',
              fontSize: '14px',
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
