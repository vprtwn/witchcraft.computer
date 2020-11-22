import { Flex, Box, Container, Text, Link } from 'theme-ui';

const Header = (props) => {
  const twitterProfileUrl = `https://twitter.com/${props.username}`;

  return (
    <Container sx={{ mt: 1, mb: props.pageId ? 1 : 3 }}>
      <Flex sx={{}}>
        {props.username && (
          <Box sx={{ px: 0 }}>
            <Link variant="link_no_underline" href={props.pageId ? `/@${props.username}` : twitterProfileUrl}>
              <Text>
                {props.pageId && '←'} {props.username}
              </Text>
            </Link>
          </Box>
        )}
      </Flex>
    </Container>
  );
};
export default Header;
