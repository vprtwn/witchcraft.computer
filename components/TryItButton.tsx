import { Flex, Box, Badge, Container, Label, Button, Text, Image, Link } from 'theme-ui';
import { signIn } from 'next-auth/client';

const SignInButton = (props) => {
  return (
    <Box sx={{ pt: 4, pb: 3 }}>
      <Flex sx={{ justifyContent: 'center' }}>
        <Button variant="button_large_rainbow" onClick={() => window.location.assign('/')}>
          Claim your <Badge variant="badge_tray">tray</Badge>
        </Button>
      </Flex>
    </Box>
  );
};
export default SignInButton;
