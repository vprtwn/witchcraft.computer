import { Badge, Box, Container, Label, Button, Text, Image, Link } from 'theme-ui';
import { signIn } from 'next-auth/client';

const AboutTray = (props) => {
  return (
    <Box>
      <Text variant="large">
        welcome to <Badge variant="outline">tray</Badge>
      </Text>
      <Text variant="large">a new way to share notes, links, and music.</Text>
      <Text variant="large">"outbox infinity"</Text>
    </Box>
  );
};
export default AboutTray;
