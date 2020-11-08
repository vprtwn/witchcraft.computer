import React, { useState, useEffect, useRef } from 'react';
import { Card, Box, Button, Flex, Label, Input } from 'theme-ui';
import { BlockType } from '../lib/typedefs';
import TextButtonIcon from './TextButtonIcon';
import LinkButtonIcon from './LinkButtonIcon';
import AudioButtonIcon from './AudioButtonIcon';
import PageButtonIcon from './PageButtonIcon';
import TextareaAutosize from 'react-textarea-autosize';

const NewMenu = (props) => {
  const [showingForm, setShowingForm] = useState(false);
  const [text, setText] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (showingForm) {
      inputRef.current.focus();
    }
  }, [showingForm]);

  return (
    <Box sx={{ pt: 2 }}>
      {showingForm && (
        <>
          <Card variant="block" sx={{ border: 'dotted 1px black', borderRadius: 8, fontSize: '15px' }}>
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
                <Input
                  ref={inputRef}
                  variant="linkInput"
                  placeholder="Link text"
                  onChange={(t) => setText(t.target.value)}
                />
              </Box>
            </Flex>
            <Box sx={{ py: 1, px: 2, bg: 'transparent' }}>
              <Input
                variant="linkInput"
                placeholder="Link address"
                type="url"
                sx={{
                  fontSize: '14px',
                  fontFamily: 'mono',
                }}
                onChange={(t) => setUrl(t.target.value)}
              />
            </Box>
            <Flex sx={{ py: 1, px: 2, bg: 'lightGray', borderRadius: '0px 0px 8px 8px' }}>
              <TextareaAutosize
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
                  overflow: 'hidden',
                  pointerEvents: props.hideToolbar ? 'none' : 'auto',
                }}
                placeholder="Comment (optional)"
                onChange={(t) => setComment(t.target.value)}
              />
            </Flex>
          </Card>
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
          {/* <Button
            variant="newMenuButton"
            sx={{ flexGrow: 1, mr: 2 }}
            onClick={() => {
              // props.onClick({ type: BlockType.Text });
            }}
          >
            <AudioButtonIcon />
          </Button>
          <Button
            variant="newMenuButton"
            sx={{ flexGrow: 1 }}
            onClick={() => {
              // props.onClick({ type: BlockType.Text });
            }}
          >
            <PageButtonIcon />
          </Button> */}
        </Flex>
      )}
    </Box>
  );
};
export default NewMenu;
