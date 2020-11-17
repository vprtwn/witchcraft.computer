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
import { colorFromUrl } from '../lib/utils';
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

  const borderColor = colorFromUrl(url);

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
    setText(response['title'] || '');
  };

  return (
    <Box sx={{ pt: 2 }}>
      {showingForm && (
        <>
          <Box>
            <Card variant="card_rainbow_link">
              <Input
                variant="input_link"
                placeholder="Link address"
                type="url"
                ref={inputRef}
                onChange={(t) => setUrl(t.target.value)}
                onBlur={(e) => {
                  const val = e.target.value;
                  if (isUrl(val)) {
                    processNewUrl(val);
                  }
                }}
              />
            </Card>
            <Card variant="card_block_link" sx={{ borderColor: borderColor }}>
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
              variant="button_emphasis_large"
              sx={{ py: 3, px: 4 }}
              onClick={() => {
                props.onClick({ type: 'link', text: text, url: url, comment: comment });
                setShowingForm(false);
                setText('');
                setComment('');
                setUrl('');
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
            variant="button_emphasis_large"
            sx={{ flexGrow: 1, mr: 2 }}
            ref={buttonRef}
            onClick={() => {
              setShowingForm(!showingForm);
            }}
          >
            <LinkButtonIcon />
          </Button>
          <Button
            variant="button_emphasis_large"
            sx={{ flexGrow: 1, mr: 2 }}
            onClick={() => {
              props.onClick({ type: BlockType.Text });
            }}
          >
            <TextButtonIcon />
          </Button>
          {!props.pageId && (
            <Button
              variant="button_emphasis_large"
              sx={{ flexGrow: 1 }}
              onClick={() => {
                props.onClick({ type: BlockType.Page });
              }}
            >
              <PageButtonIcon />
            </Button>
          )}
        </Flex>
      )}
    </Box>
  );
};
export default NewMenu;
