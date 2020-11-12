import { Flex, Box, Container, IconButton, Button, Text, Image, Link } from 'theme-ui';

const PageFooter = (props) => {
  return (
    <Box sx={{ textAlign: 'center', mt: 3, mb: 5, py: 1, px: 2 }}>
      <Box sx={{ flex: '1 1 auto' }} />
      <Flex sx={{ alignItems: 'center' }}>
        <Box sx={{ flex: '1 1 auto' }} />
        <Flex
          sx={{
            bg: 'white',
            borderRadius: 4,
            alignItems: 'center',
            boxShadow: '0 0 8px rgba(0, 0, 0, 0.125)',
          }}
        >
          <Link href="/about" variant="nav">
            <Flex sx={{ alignItems: 'center', color: 'gray' }}>
              <Text sx={{ fontWeight: 'normal', fontSize: '10px', fontFamily: 'mono', mx: 2 }}>
                made with <strong>tray</strong>
              </Text>
            </Flex>
          </Link>
        </Flex>
        <Box sx={{ flex: '1 1 auto' }} />
      </Flex>
      <Box sx={{ flex: '1 1 auto' }} />
    </Box>
  );
};
export default PageFooter;
