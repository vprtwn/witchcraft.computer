import Link from "next/link";
import { Flex, Box, Container, Button, Text, Image } from "theme-ui";
import { signIn, signOut, useSession } from "next-auth/client";

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default () => {
  const [session, loading] = useSession();
  const signedIn = session && session.user.username;

  return (
    <Box m={2}>
      <Container sx={{ maxWidth: 500, py: 2 }}>
        {!signedIn && (
          <Flex>
            <Box sx={{ flex: "1 1 auto" }}>
              <Button onClick={() => signIn("twitter")} variant="small">
                Sign in with Twitter
              </Button>
            </Box>
          </Flex>
        )}
        {signedIn && (
          <Flex>
            <Box sx={{ flex: "1 1 auto" }}>
              <Text>
                Signed in as <strong>{session.user.username || session.user.name}</strong>
              </Text>
            </Box>
            <Button onClick={() => signOut()} variant="small">
              Sign out
            </Button>
          </Flex>
        )}
      </Container>
    </Box>
  );
};
