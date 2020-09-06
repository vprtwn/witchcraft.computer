import React, { useState, useEffect, useRef } from 'react';
import { Card, Box, Button, Flex, Label, Input } from 'theme-ui';
import { BlockType } from '../lib/typedefs';

const DEBOUNCE_MS = 700;

export default (props) => {
  const [showingLinkInput, setShowingLinkInput] = useState(false);
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (showingLinkInput) {
      firstInputRef.current.focus();
    }
  }, [showingLinkInput]);

  return (
    <Box sx={{ py: 2 }}>
      {showingLinkInput && (
        <Card
          as="form"
          onSubmit={(e) => {
            e.preventDefault();
            const text = e.currentTarget.text.value;
            const url = e.currentTarget.url.value;
            props.onClick({ type: BlockType.Link, text: text, url: url });
          }}
          sx={{ bg: 'background', p: 2, border: '1px solid', borderColor: 'text', borderRadius: 4 }}
        >
          <Label htmlFor="url" variant="formlabel">
            Link URL
          </Label>
          <Input name="url" id="url" type="url" mb={3} ref={firstInputRef} required />
          <Label htmlFor="text" variant="formlabel">
            Link Text
          </Label>
          <Input name="text" id="text" mb={3} required />
          <Flex sx={{ justifyContent: 'right' }}>
            <Button>Add link</Button>
          </Flex>
        </Card>
      )}
      {!showingLinkInput && (
        <Flex sx={{ justifyContent: 'space-between', mt: 3, mb: 2 }}>
          <Button
            variant="newblock"
            sx={{ flexGrow: 1 }}
            onClick={() => {
              setShowingLinkInput(!showingLinkInput);
            }}
          >
            + Link
          </Button>
          <Box px={1} />
          <Button
            variant="newblock"
            sx={{ flexGrow: 1 }}
            onClick={() => {
              props.onClick({ type: BlockType.Text });
            }}
          >
            + Text
          </Button>
        </Flex>
      )}
    </Box>
  );
};
