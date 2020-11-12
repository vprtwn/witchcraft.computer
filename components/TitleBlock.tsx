import React, { useState, useEffect, useRef } from 'react';
import { Box, Text } from 'theme-ui';
import { useDebounce } from 'use-debounce';
import { updatePage, transformPageData } from '../lib/updatePage';
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
      const pageData = transformPageData(props.data, 'title', newText);
      await updatePage(props.uploadUrl, pageData);
      if (props.parentUploadUrl && props.parentData) {
        const key = generatePageBlockId(props.pageId);
        const newVal = props.parentData[key];
        newVal['title'] = newText;
        console.log('updating parent page', newVal);
        const parentData = transformPageData(props.parentData, key, newVal);
        await updatePage(props.parentUploadUrl, parentData);
      }
      setTitle(newText);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box sx={{ mt: 3, px: 0, pb: 2, cursor: 'text' }}>
      {!props.previewing && (
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
            fontSize: '28px',
            border: 'none',
            lineHeight: 1.5,
            paddingLeft: 0,
            paddingTop: 4,
            paddingBottom: 4,
            overflow: 'hidden',
          }}
          placeholder="Comment (optional)"
          onChange={(t) => {
            setTitle(t.target.value);
          }}
        />
      )}
      {props.previewing && (
        <Text
          sx={{
            fontWeight: 'bold',
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
            fontSize: '28px',
            whiteSpace: 'pre-wrap',
            py: 1,
          }}
        >
          {title}
        </Text>
      )}
    </Box>
  );
};
export default TitleBlock;
