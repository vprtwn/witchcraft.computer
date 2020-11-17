import { Badge, Box, Container, Label, Button, Text, Image, Link } from 'theme-ui';
import { signIn } from 'next-auth/client';

const AboutTray = (props) => {
  return (
    <Box>
      <Text variant="text_md_sans">
        welcome to <Badge variant="badge_outline">tray</Badge>
      </Text>
      <Text variant="text_md_sans">a new way to share notes, links, and music.</Text>
      <Text variant="text_md_sans" sx={{ textAlign: 'right', pt: 2 }}>
        <i> "outbox infinity" </i>
      </Text>
    </Box>
  );
};
export default AboutTray;
