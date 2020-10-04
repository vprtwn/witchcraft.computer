import React, { useState, useEffect, useRef } from 'react';
import { Card, Box, Button, Flex, Label, Input } from 'theme-ui';
import { BlockType } from '../lib/typedefs';
import TextButtonIcon from '../components/TextButtonIcon';
import LinkButtonIcon from '../components/LinkButtonIcon';
import ChevronRightIcon from '../components/ChevronRightIcon';
import CollectionButtonIcon from '../components/CollectionButtonIcon';
import TextareaAutosize from 'react-textarea-autosize';

export default (props) => {
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
          <Card variant="block">
            <Flex
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
                  placeholder="Link text"
                  onChange={(t) => setText(t.target.value)}
                />
              </Box>
              <ChevronRightIcon />
            </Flex>
            <Box sx={{ py: 1, px: 2, bg: 'lightGray' }}>
              <Input
                variant="linkInput"
                placeholder="Link address"
                autocomplete="on"
                type="url"
                onChange={(t) => setUrl(t.target.value)}
              />
            </Box>
            <Flex sx={{ py: 1, px: 2, bg: 'offWhite' }}>
              <TextareaAutosize
                style={{
                  background: 'none',
                  width: '100%',
                  resize: 'none',
                  fontFamily: 'Inter',
                  fontSize: '15px',
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
              variant="shadowButton"
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
            variant="shadowButton"
            sx={{ flexGrow: 1, mr: 1 }}
            onClick={() => {
              setShowingForm(!showingForm);
            }}
          >
            <LinkButtonIcon />
          </Button>
          <Button
            variant="shadowButton"
            sx={{ flexGrow: 1, mr: 1 }}
            onClick={() => {
              props.onClick({ type: BlockType.Text });
            }}
          >
            <TextButtonIcon />
          </Button>
          <Button
            variant="shadowButton"
            sx={{ flexGrow: 1 }}
            onClick={() => {
              // props.onClick({ type: BlockType.Text });
            }}
          >
            <CollectionButtonIcon />
          </Button>
        </Flex>
      )}
    </Box>
  );
};
