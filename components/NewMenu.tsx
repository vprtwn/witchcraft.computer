import React, { useState, useEffect, useRef } from 'react';
import { Card, Box, Button, Flex, Label, Input } from 'theme-ui';
import { BlockType } from '../lib/typedefs';
import TextButtonIcon from '../components/TextButtonIcon';
import LinkButtonIcon from '../components/LinkButtonIcon';
import LinkBlock from '../components/LinkBlock';
import CollectionButtonIcon from '../components/CollectionButtonIcon';

export default (props) => {
  const [showingForm, setShowingForm] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (showingForm) {
      inputRef.current.focus();
    }
  }, [showingForm]);

  return (
    <Box sx={{ py: 2 }}>
      {showingForm && (
        <>
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
            <Box sx={{ flexGrow: 1 }}>
              <Input ref={inputRef} variant="linkInput" defaultValue={'Link text'}></Input>
            </Box>
            <Flex>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="24" width="24">
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.29289 18.7071C8.90237 18.3166 8.90237 17.6834 9.29289 17.2929L14.5858 12L9.29289 6.70711C8.90237 6.31658 8.90237 5.68342 9.29289 5.29289C9.68342 4.90237 10.3166 4.90237 10.7071 5.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L10.7071 18.7071C10.3166 19.0976 9.68342 19.0976 9.29289 18.7071Z"
                  fill="white"
                ></path>
              </svg>
            </Flex>
          </Flex>
          <Box>
            <Input variant="linkInput" placeholder="Link url" sx={{ bg: 'lightGray' }}></Input>
          </Box>
          <Flex sx={{ justifyContent: 'right', pt: 1 }}>
            <Button variant="shadowButton">Add link</Button>
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
              props.onClick({ type: BlockType.Text });
            }}
          >
            <CollectionButtonIcon />
          </Button>
        </Flex>
      )}
    </Box>
  );
};
