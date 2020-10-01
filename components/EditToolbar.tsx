import React from 'react';
import { Box, IconButton, Flex } from 'theme-ui';
import EditGrayButtonIcon from './EditGrayButtonIcon';
import ViewGrayButtonIcon from './ViewGrayButtonIcon';
import DeleteButtonIcon from './DeleteButtonIcon';
import DownButtonIcon from './DownButtonIcon';
import UpButtonIcon from './UpButtonIcon';

export default (props) => {
  return (
    <Flex sx={{ bg: 'offWhite', borderRadius: 4, py: 2, px: 2 }}>
      <Box
        sx={{ flexGrow: 1, visibility: props.editing ? 'visible' : 'hidden' }}
        hidden={!props.editing && !props.hideDown && !props.hideUp}
      >
        <IconButton
          sx={{ left: 0 }}
          onClick={() => {
            props.onDelete();
          }}
        >
          <DeleteButtonIcon />
        </IconButton>
      </Box>
      <Box sx={{ flexGrow: 1 }} hidden={props.editing || props.hideDown}>
        <IconButton onClick={props.onDown}>
          <DownButtonIcon />
        </IconButton>
      </Box>
      <Box sx={{ flexGrow: 1 }} hidden={props.editing || props.hideUp}>
        <IconButton onClick={props.onUp}>
          <UpButtonIcon />
        </IconButton>
      </Box>
      <Box>
        <IconButton
          variant={props.editing ? 'iconselected' : 'icon'}
          onClick={() => {
            props.onSwitchEditing();
          }}
        >
          {props.editing ? <ViewGrayButtonIcon /> : <EditGrayButtonIcon />}
        </IconButton>
      </Box>
    </Flex>
  );
};
