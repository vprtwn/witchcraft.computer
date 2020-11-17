import React, { useState, useEffect, useRef } from 'react';
import { Card, Input, Flex, Box, Link, Text } from 'theme-ui';
import { useDebounce } from 'use-debounce';
import EditToolbar from './EditToolbar';
import { updatePage, transformPageData } from '../lib/updatePage';
import { colorFromUrl } from '../lib/utils';
import isUrl from 'is-url';
import TextareaAutosize from 'react-textarea-autosize';

const DEBOUNCE_MS = 700;

const LinkBlock = (props) => {
  const signedIn = props.signedIn;
  const [editing, setEditing] = useState(false);
  const content = props.data ? props.data[props.id] : null;
  const initialText = content ? (content.text as string) : '';
  const initialUrl = content ? (content.url as string) : '';
  const initialComment = content ? (content.comment as string) : '';
  const [text, setText] = useState<string>(initialText);
  const [url, setUrl] = useState<string>(initialUrl);
  const [comment, setComment] = useState<string>(initialComment);
  const [debouncedText] = useDebounce(text, DEBOUNCE_MS);
  const [debouncedUrl] = useDebounce(url, DEBOUNCE_MS);
  const [debouncedComment] = useDebounce(comment, DEBOUNCE_MS);

  const borderColor = colorFromUrl(url);

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
      const pageData = transformPageData(props.data, props.id, value);
      await updatePage(props.uploadUrl, pageData);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card variant="card_block_link" sx={{ borderColor: borderColor }}>
      <>
        <Flex
          onClick={() => {
            if (content && props.previewing) {
              window.location.assign(content.url as string);
            } else {
              setEditing(true);
            }
          }}
          sx={{
            py: 0,
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 8,
            color: 'black',
            cursor: 'pointer',
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            {editing && (
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
                  lineHeight: 1.5,
                  paddingLeft: 16,
                  paddingRight: 16,
                  paddingTop: 6,
                  paddingBottom: 6,
                  overflow: 'hidden',
                }}
                placeholder="Link text"
                onChange={(t) => {
                  setText(t.target.value);
                }}
              />
            )}
            {!editing && (
              <Box sx={{ py: 2, px: 3 }}>
                <Link variant="link_block" href={url}>
                  {text}
                </Link>
              </Box>
            )}
          </Box>
        </Flex>
      </>
      {((!props.previewing && (editing || (!editing && comment && comment.length > 0))) ||
        (props.previewing && comment && comment.length > 0)) && (
        <Flex
          sx={{ bg: 'lightGray', borderRadius: '0px 0px 8px 8px' }}
          onClick={() => {
            if (!props.previewing) {
              setEditing(true);
            }
          }}
        >
          {editing && (
            <TextareaAutosize
              defaultValue={comment}
              spellCheck={false}
              style={{
                // textAlign: 'right',
                background: 'transparent',
                width: '100%',
                resize: 'none',
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                fontSize: '13px',
                border: 'none',
                lineHeight: 1.5,
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 6,
                paddingBottom: 6,
                overflow: 'hidden',
              }}
              placeholder="Comment (optional)"
              onChange={(t) => {
                setComment(t.target.value);
              }}
            />
          )}
          {!editing && <Text variant="text_block_link_comment">{comment}</Text>}
        </Flex>
      )}
      {editing && !props.previewing && (
        <Box
          sx={{
            mt: 1,
            background: 'linear-gradient(-45deg, #e6fffa, #faf5ff, #ebf8ff)',
            backgroundSize: '400% 400%',
            animation: 'gradient 10s ease infinite',
          }}
        >
          <Input
            variant="input_link"
            type="url"
            defaultValue={url}
            placeholder="Link address"
            onChange={(e) => {
              const val = e.target.value;
              if (isUrl(val)) {
                setUrl(val);
              }
            }}
          ></Input>
        </Box>
      )}
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
export default LinkBlock;
