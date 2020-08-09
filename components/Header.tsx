import { Flex, Box, Container, IconButton, Button, Text, Image, Link } from "theme-ui";
import { signIn, signOut, useSession } from "next-auth/client";

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default (props) => {
  const [session, loading] = useSession();
  const signedIn = session && session.user.username;

  return (
    <Container sx={{ mt: 0, py: 1, fontSize: "14px" }}>
      <Flex sx={{ flex: "1 1 auto" }}>
        {props.username && (
          <Box sx={{ px: 0 }}>
            <Link href={`https://twitter.com/${props.username}`} variant="nav">
              <Text sx={{ fontWeight: "normal" }}>@{props.username}</Text>
            </Link>
          </Box>
        )}
        <Box sx={{ flex: "1 1 auto" }} />
      </Flex>
    </Container>
  );
};
