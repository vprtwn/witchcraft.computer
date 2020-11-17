import { Flex, Box, Container, IconButton, Button, Text, Image, Link } from 'theme-ui';

const InfoFooter = (props) => {
  return (
    <Box sx={{ textAlign: 'center', mt: 4, mb: 4, py: 1, px: 2, color: 'gray' }}>
      <Box sx={{ flex: '1 1 auto' }} />
      <Flex sx={{ alignItems: 'center' }}>
        <Box sx={{ flex: '1 1 auto' }} />
        <Flex sx={{ bg: 'transparent', borderRadius: 4, alignItems: 'center' }}>
          <Link variant="link_footer" href="/policies">
            policies
          </Link>
          |
          <Link variant="link_footer" href="/faq">
            FAQ
          </Link>
          |
          <Link variant="link_footer" href="https://twitter.com/trayclub">
            twitter
          </Link>
        </Flex>
        <Box sx={{ flex: '1 1 auto' }} />
      </Flex>
      <Box sx={{ flex: '1 1 auto' }} />
    </Box>
  );
};
export default InfoFooter;
