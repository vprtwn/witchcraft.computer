import Link from "next/link";
import { Flex, Box, Container, Button, Image } from "theme-ui";
import { signIn, signOut, useSession } from "next-auth/client";

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default () => {
  const [session, loading] = useSession();

  return (
    <header>
      <div>
        <p>
          {!session && (
            <>
              <span>You are not signed in</span>
              <a
                href={`/api/auth/signin/twitter`}
                onClick={(e) => {
                  e.preventDefault();
                  signIn();
                }}
              >
                Sign in
              </a>
            </>
          )}
          {session && (
            <>
              <Image src={session.user.image} variant="avatar" />
              <span>
                <small>Signed in as</small>
                <br />
                <strong>{session.user.username || session.user.name}</strong>
              </span>
              <a
                href={`/api/auth/signout`}
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                Sign out
              </a>
              <pre>{JSON.stringify(session, null, 2)}</pre>
            </>
          )}
        </p>
      </div>
    </header>
  );
};
