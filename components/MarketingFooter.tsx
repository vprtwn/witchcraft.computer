import { Flex, Box, Container, IconButton, Button, Text, Image, Link } from 'theme-ui';

const MarketingFooter = (props) => {
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
            policies
          </Link>
          |
          <Link
            href="https://twitter.com/trayclub"
            variant="nav"
            sx={{ mx: 2, py: 1, fontSize: '11px', color: 'black', fontWeight: 'normal' }}
          >
            twitter
          </Link>
        </Flex>
        <Box sx={{ flex: '1 1 auto' }} />
      </Flex>
      <Box sx={{ flex: '1 1 auto' }} />
    </Box>
  );
};
export default MarketingFooter;
