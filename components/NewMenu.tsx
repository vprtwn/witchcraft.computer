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
import PlusButtonIcon from './PlusButtonIcon';

const DEBOUNCE_MS = 700;

const NewMenu = (props) => {
  const [showingForm, setShowingForm] = useState(false);
  const [text, setText] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [debouncedUrl] = useDebounce(url, DEBOUNCE_MS);
  const [comment, setComment] = useState<string>('');

  const inputRef = useRef<HTMLInputElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (showingForm) {
      inputRef.current.focus();
      inputRef.current.scrollIntoView(true);
    } else {
      buttonRef.current.scrollIntoView(true);
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
            <Card
              variant="block"
              sx={{
                bg: 'black',
                borderRadius: 8,
                px: 0,
                py: 0,
                mb: 1,
                background: 'linear-gradient(-45deg, #e6fffa, #faf5ff, #ebf8ff)',
                backgroundSize: '400% 400%',
                animation: 'gradient 10s ease infinite',
              }}
            >
              <Input
                variant="linkInput"
                placeholder="Link address"
                type="url"
                ref={inputRef}
                sx={{
                  px: 3,
                  py: 2,
                  fontSize: '14px',
                  fontFamily: 'mono',
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
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderRadius: 8,
                  bg: 'white',
                  color: 'black',
                  cursor: 'pointer',
                }}
              >
                <Box sx={{ flexGrow: 1 }}>
                  <Input
                    variant="linkInput"
                    sx={{ py: 2, px: 3 }}
                    placeholder="Link text"
                    onChange={(t) => setText(t.target.value)}
                  />
                </Box>
              </Flex>

              <Flex sx={{ bg: 'lightGray', borderRadius: '0px 0px 8px 8px' }}>
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
                    paddingRight: 8,
                    paddingTop: 8,
                    paddingBottom: 8,
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
          <Flex sx={{ pt: 2, justifyContent: 'space-between' }}>
            <Box />
            <Button
              variant="newMenuButton"
              sx={{ py: 3, px: 4 }}
              onClick={() => {
                console.log('text', text);
                console.log('url', url);
                console.log('comment', comment);
                props.onClick({ type: 'link', text: text, url: url, comment: comment });
              }}
            >
              <PlusButtonIcon />
            </Button>
            <Box />
          </Flex>
        </>
      )}
      {!showingForm && (
        <Flex sx={{ justifyContent: 'space-between', mt: 4, mb: 2 }}>
          <Button
            variant="newMenuButton"
            sx={{ flexGrow: 1, mr: 2 }}
            ref={buttonRef}
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
