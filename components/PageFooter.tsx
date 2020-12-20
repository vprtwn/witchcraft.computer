import { Flex, Box, Text, Link } from 'theme-ui';

const PageFooter = (props) => {
  return (
    <Box sx={{ textAlign: 'center', mt: 4, mb: 5, py: 1, px: 2 }}>
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
          <Link variant="link_footer" href="/">
            <Flex sx={{ alignItems: 'center' }}>
              <Text sx={{ fontFamily: 'mono', color: 'gray', mx: 2 }}>
                tarot <strong>express</strong>
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
