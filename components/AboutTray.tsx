import { Flex, Box, Container, IconButton, Button, Text, Image, Link } from 'theme-ui';

export default (props) => {
  return (
    <Box>
      <Text pb={2}>
        <strong>tray</strong> is a simple way to publish text, links, and (soon) audio.
      </Text>
      <Text pb={2}>
        tray is <strong>free</strong> to use. if you accept tips, there is a small{' '}
        <Link href="https://stripe.com/pricing#pricing-details">fee charged by Stripe</Link>, our payments provider.
      </Text>
      <Box pb={2}>
        feedback? tell us on <Link href="https://twitter.com/trayclub">twitter</Link>
      </Box>
      <Box>
        ➔ <Link href="/">Create your tray</Link>
      </Box>
    </Box>
  );
};
