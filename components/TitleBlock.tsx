import React, { useState, useEffect, useRef } from 'react';
import { Card, Box } from 'theme-ui';
import { useDebounce } from 'use-debounce';
import { updatePage } from '../lib/updatePage';
import { generatePageBlockId } from '../lib/utils';
import TextareaAutosize from 'react-textarea-autosize';

const DEBOUNCE_MS = 700;

const TitleBlock = (props) => {
  let initialTitle = props.data ? props.data['title'] : null;
  if (props.signedIn && !initialTitle) {
    initialTitle = 'New page';
  }
  const [title, setTitle] = useState(initialTitle);
  const [debouncedTitle] = useDebounce(title, DEBOUNCE_MS);

  useEffect(() => {
    if (debouncedTitle !== initialTitle) {
      syncUpdatedText(debouncedTitle);
    }
  }, [debouncedTitle]);

  const syncUpdatedText = async function (newText: string) {
    try {
      await updatePage(props.uploadUrl, props.data, 'title', newText);
      if (props.parentUploadUrl && props.parentData) {
        const key = generatePageBlockId(props.pageId);
        const newVal = props.parentData[key];
        newVal['title'] = newText;
        console.log('updating parent page', newVal);
        await updatePage(props.parentUploadUrl, props.parentData, key, newVal);
      }
      setTitle(newText);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box sx={{ px: 0, pb: 2, cursor: 'text', fontSize: '15px' }}>
      <TextareaAutosize
        defaultValue={title}
        spellCheck={false}
        style={{
          background: 'transparent',
          width: '100%',
          resize: 'none',
          fontWeight: 'bold',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
          fontSize: '20px',
          border: 'none',
          paddingLeft: 0,
          paddingTop: 4,
          paddingBottom: 4,
          overflow: 'hidden',
          pointerEvents: props.previewing ? 'none' : 'auto',
        }}
        placeholder="Comment (optional)"
        onChange={(t) => {
          setTitle(t.target.value);
        }}
      />
    </Box>
  );
};
export default TitleBlock;
