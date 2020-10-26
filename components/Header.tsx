import { Flex, Box, Container, IconButton, Button, Text, Image, Link } from 'theme-ui';
import { signIn, signOut, useSession } from 'next-auth/client';

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default (props) => {
  const [session, loading] = useSession();
  const signedIn = session && session.user.username;
  const twitterProfileUrl = `https://twitter.com/${props.username}`;

  return (
    <Container sx={{ mt: 2, mb: 3 }}>
      <Flex sx={{ justifyContent: 'center', pt: 3 }}>
        {props.profileImage && (
          // <Link href={twitterProfileUrl}>
          <Image variant="profile" src={props.profileImage}></Image>
          // </Link>
        )}
      </Flex>
      <Flex sx={{ justifyContent: 'center' }}>
        {props.name && <Text sx={{ fontWeight: 'bold', fontSize: '16px', fontFamily: 'Inter' }}>{props.name}</Text>}
      </Flex>
      <Flex sx={{ justifyContent: 'center' }}>
        {props.username && (
          <Box sx={{ px: 0 }}>
            <Link href={twitterProfileUrl} variant="nav">
              <Text sx={{ fontWeight: 'normal', fontSize: '13px' }}>@{props.username}</Text>
            </Link>
          </Box>
        )}
      </Flex>
    </Container>
  );
};
