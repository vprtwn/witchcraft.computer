import Link from "next/link";
import { Flex, Box, Container, IconButton, Button, Text, Image } from "theme-ui";
import { signIn, signOut, useSession } from "next-auth/client";

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default (props) => {
  const [session, loading] = useSession();
  const signedIn = session && session.user.username;

  return (
    <Container sx={{ mt: 1, border: "2px solid", borderColor: "primary", borderRadius: 4 }}>
      {!signedIn && (
        <Flex>
          <Flex sx={{ flex: "1 1 auto", alignItems: "center" }}>
            <Box sx={{ px: 2, fontFamily: "Inter" }}>{props.username}</Box>
          </Flex>
          <Box sx={{ bg: "outline", borderRadius: 4, py: 2, px: 3 }}>
            <Button onClick={() => signIn("twitter")} variant="small" sx={{}}>
              <Box
                aria-hidden="true"
                sx={{
                  display: "inline-block",
                  width: "1.2em",
                  height: "1.2em",
                  marginRight: "0.4em",
                  verticalAlign: "sub",
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z" />
                </svg>
              </Box>
              Sign in
            </Button>
          </Box>
        </Flex>
      )}
      {signedIn && (
        <Flex>
          <Flex sx={{ flex: "1 1 auto", alignItems: "center" }}>
            <Box sx={{ px: 2, fontFamily: "Inter" }}>{props.username}</Box>
          </Flex>
          <Box sx={{ bg: "outline", borderRadius: 4, py: 2, px: 3 }}>
            <Text sx={{ fontSize: "12px" }}>Signed in as</Text>
            <Text sx={{ fontSize: "12px", textAlign: "center" }}>
              <strong>{session.user.username || session.user.name}</strong>{" "}
              <Button onClick={() => signOut()} variant="tiny">
                sign out
              </Button>
            </Text>
          </Box>
        </Flex>
      )}
    </Container>
  );
};
