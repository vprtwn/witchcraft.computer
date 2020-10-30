import { Badge, Box, Container, Label, Button, Text, Image, Link } from 'theme-ui';
import { signIn } from 'next-auth/client';

const AboutTray = (props) => {
  return (
    <Box>
      <Text>
        Welcome to <Badge variant="outline">tray</Badge>
        <strong>:</strong> a minimal space to publish notes and links. This is{' '}
        <Link href="http://paulgraham.com/early.html" variant="primary">
          early work
        </Link>
        . On the roadmap: nested pages, audio, analytics, subscriptions, and subscriber-only content.
      </Text>
      <Text variant="tiny" sx={{ pt: 3, pb: 2, color: 'gray' }}>
        <Badge variant="outline" sx={{ fontSize: 10, color: 'gray' }}>
          tray
        </Badge>{' '}
        is free software, made by{' '}
        <Link variant="primary" href="https://tray.club/@bgdotjpg">
          @bgdotjpg
        </Link>
      </Text>
    </Box>
  );
};
export default AboutTray;
