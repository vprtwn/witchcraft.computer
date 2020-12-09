import React, { useState, useEffect, useRef } from 'react';
import { Card, Input, Flex, Box, Link, Text } from 'theme-ui';
import { useDebounce } from 'use-debounce';
import EditToolbar from './EditToolbar';
import { updatePage, transformPageData } from '../lib/updatePage';
import { linkStyleForUrl, sanitizeUrl } from '../lib/utils';
import { FONT_MONO } from '../lib/const';
import isUrl from 'is-url';
import BlockTextarea from './BlockTextarea';
import LinkBlockLogo from './LinkBlockLogo';

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

  const linkStyle = linkStyleForUrl(url, 32);

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

  if (!signedIn && url === '') {
    return <></>;
  }

  return (
    <Card variant="card_block_link" sx={{ borderColor: linkStyle.borderColor, position: 'relative' }}>
      <>
        <Flex
          onClick={() => {
            if (content && props.previewing) {
              window.location.assign(sanitizeUrl(content.url));
            } else {
              setEditing(true);
            }
          }}
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            {!props.previewing && editing && (
              <BlockTextarea
                id={props.id}
                px={16}
                py={10}
                defaultValue={text}
                placeholder="Link text"
                onChange={(t) => {
                  setText(t.target.value);
                }}
              />
            )}
            {(!editing || props.previewing) && (
              <Box sx={{ py: 2, px: 3 }}>
                <Link variant="link_block" href={sanitizeUrl(url)}>
                  {text && text.length > 0 ? text : url}
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
            <BlockTextarea
              id={props.id}
              px={16}
              py={10}
              defaultValue={comment}
              fontFamily={FONT_MONO}
              fontSize={'13px'}
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
        <Card variant="card_rainbow_link" sx={{ mt: 1 }}>
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
            onBlur={(e) => {
              const val = e.target.value;
              const sanitizedUrl = sanitizeUrl(val);
              if (sanitizedUrl !== val) {
                setUrl(sanitizedUrl);
              }
            }}
          ></Input>
        </Card>
      )}
      {props.previewing && (
        <Box sx={{ position: 'absolute', right: 1, bottom: 1, pointerEvents: 'none' }}>
          <LinkBlockLogo url={url} />
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
