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
      <Text variant="tiny" sx={{ pt: 3, pb: 2 }}>
        <Badge variant="outline" sx={{ fontSize: 11 }}>
          tray
        </Badge>{' '}
        is free to use. We may add a paid plan in the future. If you accept tips, there is a credit card{' '}
        <Link variant="primary" href="https://stripe.com/pricing#pricing-details">
          fee charged by Stripe
        </Link>
        , our payments provider.
      </Text>
    </Box>
  );
};
export default AboutTray;
