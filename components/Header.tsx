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
        {!props.profileImage && (
          <svg width="30" height="26" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.23913 0H25.2228L30 17.55H0L4.23913 0Z" fill="black" />
            <path d="M6.34449 1.94995H23.2227L27.0652 17.55H2.93475L6.34449 1.94995Z" fill="white" />
            <path d="M0 17.55H30V22C30 24.2092 28.2091 26 26 26H4C1.79086 26 0 24.2092 0 22V17.55Z" fill="black" />
            <circle cx="15" cy="15" r="5" fill="white" />
          </svg>
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
