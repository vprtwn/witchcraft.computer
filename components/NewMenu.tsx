import React, { useState, useEffect, useRef } from 'react';
import { Card, Box, Button, Flex, Label, Input } from 'theme-ui';
import { BlockType } from '../lib/typedefs';

export default (props) => {
  const [showingForm, setShowingForm] = useState(false);
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (showingForm) {
      firstInputRef.current.focus();
    }
  }, [showingForm]);

  return (
    <Box sx={{ py: 2 }}>
      {showingForm && (
        <Card
          as="form"
          onSubmit={(e) => {
            e.preventDefault();
            const text = e.currentTarget.text.value;
            const url = e.currentTarget.url.value;
            props.onClick({ type: BlockType.Link, text: text, url: url });
          }}
          sx={{ bg: 'offWhite', p: 2, border: '1px solid', borderColor: 'text', borderRadius: 4 }}
        >
          <Label htmlFor="url" variant="formLabel">
            Link URL
          </Label>
          <Input name="url" id="url" type="url" variant="standardInput" mb={3} ref={firstInputRef} required />
          <Label htmlFor="text" variant="formLabel">
            Link Text
          </Label>
          <Input name="text" id="text" mb={3} variant="standardInput" required />
          <Flex sx={{ justifyContent: 'right' }}>
            <Button>Add link</Button>
          </Flex>
        </Card>
      )}
      {!showingForm && (
        <Flex sx={{ justifyContent: 'space-between', mt: 3, mb: 2 }}>
          <Button
            variant="shadowButton"
            sx={{ flexGrow: 1 }}
            onClick={() => {
              setShowingForm(!showingForm);
            }}
          >
            + Link
          </Button>
          <Box px={1} />
          <Button
            variant="shadowButton"
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
