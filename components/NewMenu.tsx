import React, { useState, useEffect, useRef } from 'react';
import { Card, Box, Button, Flex, Label, Input } from 'theme-ui';
import { WidgetType } from '../lib/typedefs';

const DEBOUNCE_MS = 700;

export default (props) => {
  const [showingLinkInput, setShowingLinkInput] = useState(false);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (showingLinkInput) {
      nameInputRef.current.focus();
    }
  }, [showingLinkInput]);

  return (
    <Box sx={{ py: 2 }}>
      {showingLinkInput && (
        <Card
          as="form"
          onSubmit={(e) => {
            e.preventDefault();
            console.log('submit');
          }}
          sx={{ bg: 'background', p: 2, border: '1px solid', borderColor: 'text', borderRadius: 4 }}
        >
          <Label htmlFor="text" variant="formlabel">
            Link Text
          </Label>
          <Input name="text" id="text" mb={3} ref={nameInputRef} required />
          <Label htmlFor="url" variant="formlabel">
            Link URL
          </Label>
          <Input name="url" id="url" type="url" mb={3} required />
          <Flex sx={{ justifyContent: 'right' }}>
            <Button>Add link</Button>
          </Flex>
        </Card>
      )}
      {!showingLinkInput && (
        <Flex sx={{ justifyContent: 'space-between' }}>
          <Button
            sx={{ flexGrow: 1, bg: 'white' }}
            onClick={() => {
              props.onClick({ type: WidgetType.Text });
            }}
          >
            + Text
          </Button>
          <Box px={1} />
          <Button
            sx={{ flexGrow: 1, bg: 'white' }}
            onClick={() => {
              setShowingLinkInput(!showingLinkInput);
            }}
          >
            + Link
          </Button>
        </Flex>
      )}
    </Box>
  );
};
