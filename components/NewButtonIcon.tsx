import { Label, Box, Flex } from 'theme-ui';

export default () => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <svg height="17" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fill-rule="evenodd" stroke="#2a2e3b" stroke-linecap="round" stroke-linejoin="round">
          <path d="m5.029 10.429h10" />
          <path d="m10.029 15.429v-10.001" />
        </g>
      </svg>
      <Box>
        <Label variant="buttonlabel">New</Label>
      </Box>
    </Flex>
  );
};
