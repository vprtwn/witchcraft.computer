import React from 'react';
import { Box, IconButton, Flex } from 'theme-ui';
import DeleteButtonIcon from './DeleteButtonIcon';
import DownButtonIcon from './DownButtonIcon';
import UpButtonIcon from './UpButtonIcon';

const PageBlockEditToolbar = (props) => {
  return (
    <Flex sx={{ bg: 'offWhite', borderRadius: 8, py: 1, px: 2 }}>
      <Box sx={{ flexGrow: 1 }}>
        <IconButton
          sx={{ left: 0 }}
          onClick={() => {
            props.onDelete();
          }}
        >
          <DeleteButtonIcon />
        </IconButton>
      </Box>
      <Box sx={{ flexGrow: 1 }} hidden={props.hideDown}>
        <IconButton onClick={props.onDown}>
          <DownButtonIcon />
        </IconButton>
      </Box>
      <Box sx={{ flexGrow: 1 }} hidden={props.hideUp}>
        <IconButton onClick={props.onUp}>
          <UpButtonIcon />
        </IconButton>
      </Box>
    </Flex>
  );
};
export default PageBlockEditToolbar;
