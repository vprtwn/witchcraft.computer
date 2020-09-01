import { Label, Box, Flex } from 'theme-ui';

export default () => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box>
        <svg display="block" height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg">
          <g
            fill="none"
            fill-rule="evenodd"
            stroke="#2a2e3b"
            stroke-linecap="round"
            stroke-linejoin="round"
            transform="translate(2 4)"
          >
            <path d="m.5 8.5 8 4 8.017-4" />
            <path d="m.5 4.657 8.008 3.843 8.009-3.843-8.009-4.157z" />
          </g>
        </svg>
      </Box>
      <Box>
        <Label>Settings</Label>
      </Box>
    </Flex>
  );
};