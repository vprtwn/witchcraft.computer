import React, { useState, useEffect, useRef } from 'react';
import { useDebounce } from 'use-debounce';
import { Card, Box, Button, Flex, Label, Input } from 'theme-ui';
import { BlockType } from '../lib/typedefs';
import TextButtonIcon from './TextButtonIcon';
import LinkButtonIcon from './LinkButtonIcon';
import AudioButtonIcon from './AudioButtonIcon';
import PageButtonIcon from './PageButtonIcon';
import TextareaAutosize from 'react-textarea-autosize';
import isUrl from 'is-url';
import fetchJson from '../lib/fetchJson';

const DEBOUNCE_MS = 700;

const NewMenu = (props) => {
  const [showingForm, setShowingForm] = useState(false);
  const [text, setText] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [debouncedUrl] = useDebounce(url, DEBOUNCE_MS);
  const [comment, setComment] = useState<string>('');

  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (showingForm) {
      inputRef.current.focus();
    }
  }, [showingForm]);
  useEffect(() => {
    if (isUrl(debouncedUrl)) {
      processNewUrl(debouncedUrl);
    }
  }, [debouncedUrl]);

  const processNewUrl = async (url: string) => {
    // remove query string
    const trimmedUrl = url.split('?')[0];
    const btoa = require('abab/lib/btoa');
    const b64url = btoa(trimmedUrl);
    const response = await fetchJson(`/api/metadata/${b64url}`, {
      method: 'GET',
    });
    console.dir('response', response);
  };

  return (
    <Box sx={{ pt: 2 }}>
      {showingForm && (
        <>
          <Box sx={{ fontSize: '15px' }}>
            <Card variant="block" sx={{ py: 1, px: 2, bg: 'black', borderRadius: 8, mb: 1 }}>
              <Input
                variant="linkInput"
                placeholder="Link address"
                type="url"
                ref={inputRef}
                sx={{
                  fontSize: '14px',
                  fontFamily: 'mono',
                  color: 'white',
                }}
                onChange={(t) => setUrl(t.target.value)}
                onBlur={(e) => {
                  const val = e.target.value;
                  if (isUrl(val)) {
                    processNewUrl(val);
                  }
                }}
              />
            </Card>
            <Card variant="block" sx={{ border: 'dotted 1px black', borderRadius: 8 }}>
              <Flex
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
                  <Input variant="linkInput" placeholder="Link text" onChange={(t) => setText(t.target.value)} />
                </Box>
              </Flex>

              <Flex sx={{ py: 1, px: 2, bg: 'lightGray', borderRadius: '0px 0px 8px 8px' }}>
                <TextareaAutosize
                  spellCheck={false}
                  style={{
                    background: 'none',
                    width: '100%',
                    resize: 'none',
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                    fontSize: '13px',
                    border: 'none',
                    paddingLeft: 8,
                    paddingTop: 4,
                    paddingBottom: 4,
                    textAlign: 'right',
                    overflow: 'hidden',
                    pointerEvents: props.hideToolbar ? 'none' : 'auto',
                  }}
                  placeholder="Comment (optional)"
                  onChange={(t) => setComment(t.target.value)}
                />
              </Flex>
            </Card>
          </Box>
          <Flex sx={{ justifyContent: 'right', pt: 1 }}>
            <Button
              variant="newMenuButton"
              onClick={() => {
                console.log('text', text);
                console.log('url', url);
                console.log('comment', comment);
                props.onClick({ type: 'link', text: text, url: url, comment: comment });
              }}
            >
              Add link
            </Button>
          </Flex>
        </>
      )}
      {!showingForm && (
        <Flex sx={{ justifyContent: 'space-between', mt: 3, mb: 2 }}>
          <Button
            variant="newMenuButton"
            sx={{ flexGrow: 1, mr: 2 }}
            onClick={() => {
              setShowingForm(!showingForm);
            }}
          >
            <LinkButtonIcon />
          </Button>
          <Button
            variant="newMenuButton"
            sx={{ flexGrow: 1, mr: 2 }}
            onClick={() => {
              props.onClick({ type: BlockType.Text });
            }}
          >
            <TextButtonIcon />
          </Button>
          {!props.pageId && (
            <Button
              variant="newMenuButton"
              sx={{ flexGrow: 1 }}
              onClick={() => {
                props.onClick({ type: BlockType.Page });
              }}
            >
              <PageButtonIcon />
            </Button>
          )}
          {/* <Button
            variant="newMenuButton"
            sx={{ flexGrow: 1, mr: 2 }}
            onClick={() => {
              // props.onClick({ type: BlockType.Text });
            }}
          >
            <AudioButtonIcon />
          </Button>*/}
        </Flex>
      )}
    </Box>
  );
};
export default NewMenu;
