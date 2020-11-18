import React, { useState, useEffect, useRef } from 'react';
import { Box, Text } from 'theme-ui';
import { useDebounce } from 'use-debounce';
import { updatePage, transformPageData } from '../lib/updatePage';
import { generatePageBlockId } from '../lib/utils';
import BlockTextarea from './BlockTextarea';

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
        <BlockTextarea
          defaultValue={title}
          fontSize={'28px'}
          fontWeight={'bold'}
          px={0}
          py={4}
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
            fontFamily: 'sans',
            fontSize: 5,
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
