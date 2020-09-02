import React from 'react';
import { Box, IconButton, Flex } from 'theme-ui';
import EditButtonIcon from './EditButtonIcon';
import ViewButtonIcon from './ViewButtonIcon';
import DeleteButtonIcon from './DeleteButtonIcon';
import DownButtonIcon from './DownButtonIcon';
import UpButtonIcon from './UpButtonIcon';

export default (props) => {
  return (
    <Flex sx={{ bg: 'outline', borderRadius: 4, py: 2 }}>
      <Box sx={{ ml: 2, flexGrow: 1 }} hidden={!props.editing}>
        <IconButton
          variant="icon"
          sx={{ left: 0 }}
          onClick={() => {
            props.onDelete();
          }}
        >
          <DeleteButtonIcon />
        </IconButton>
      </Box>
      <Box sx={{ flexGrow: 1 }} hidden={props.editing}>
        <IconButton onClick={props.onDown} hidden={props.editing || props.hideDown}>
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
          sx={{ mr: 2 }}
          onClick={() => {
            props.onSwitchEditing();
          }}
        >
          {props.editing ? <ViewButtonIcon /> : <EditButtonIcon />}
        </IconButton>
      </Box>
    </Flex>
  );
};
