import { Flex, Box, Container, IconButton, Button, Text, Image, Link } from 'theme-ui';

export default (props) => {
  return (
    <Box>
      <Text pb={2}>Tray is a simple way to publish text, links, and (soon) audio.</Text>
      <Box pb={2}>
        It's a work in progress – tweet at <Link href="https://twitter.com/trayclub">@trayclub</Link> with feedback.
      </Box>
      <Box>
        <Link href="/">Create your tray</Link>
      </Box>
    </Box>
  );
};
