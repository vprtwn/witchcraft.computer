import { Flex, Box, Container, IconButton, Button, Text, Image, Link } from 'theme-ui';

export default (props) => {
  return (
    <Box sx={{ textAlign: 'center', my: 2, py: 1, px: 2 }}>
      <Box sx={{ flex: '1 1 auto' }} />
      <Flex sx={{ alignItems: 'center' }}>
        <Box sx={{ flex: '1 1 auto' }} />
        <Flex sx={{ bg: 'transparent', borderRadius: 4, alignItems: 'center' }}>
          <Link
            href="/policies"
            variant="nav"
            sx={{ mx: 2, py: 1, fontSize: '11px', color: 'black', fontWeight: 'normal' }}
          >
            terms of service, privacy, etc
          </Link>
        </Flex>
        <Box sx={{ flex: '1 1 auto' }} />
      </Flex>
      <Box sx={{ flex: '1 1 auto' }} />
    </Box>
  );
};
