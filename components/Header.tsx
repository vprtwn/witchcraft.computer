import { Flex, Box, Container, Text, Link } from 'theme-ui';

const Header = (props) => {
  const twitterProfileUrl = `https://twitter.com/${props.username}`;

  return (
    <Container sx={{ mt: 1, mb: 3 }}>
      <Flex sx={{ justifyContent: 'left' }}>
        {props.username && (
          <Box sx={{ px: 0 }}>
            <Link href={twitterProfileUrl} variant="nav">
              <Text sx={{ fontWeight: 'bold', fontSize: '13px', fontFamily: 'sans' }}>{props.username}</Text>
            </Link>
          </Box>
        )}
      </Flex>
    </Container>
  );
};
export default Header;
