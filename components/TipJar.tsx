import { Flex, Box, Input, Badge, Button, Text } from "theme-ui";
import { signIn, signOut, useSession } from "next-auth/client";

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default (props) => {
  const data = props.data;
  return (
    <Flex sx={{ bg: "primary", alignItems: "center", py: 1 }}>
      <Box sx={{ ml: 3, whiteSpace: "nowrap" }}>
        {!props.editing && <Text sx={{ color: "bg", fontSize: "13px", py: 1 }}>Leave a tip</Text>}
        {props.editing && (
          <Input
            variant="tipText"
            onChange={props.onTipMessageChange}
            sx={{ color: "bg", fontSize: "13px" }}
            defaultValue={data.t || "Leave a tip"}
          />
        )}
      </Box>
      <Box sx={{ flex: "1 1 auto", mx: 3, px: 2 }}></Box>
      <Box sx={{ mr: 2, textAlign: "right", alignItems: "center", justifyContent: "flex-end" }}>
        <Badge sx={{ px: 2, py: 1 }} variant="invisible">
          <Button
            variant="tip"
            sx={{ left: 0 }}
            onClick={() => {
              console.log("tip 1");
            }}
          >
            $1
          </Button>
        </Badge>
        <Badge sx={{ px: 2, py: 1 }} variant="invisible">
          <Button
            variant="tip"
            sx={{ left: 0 }}
            onClick={() => {
              console.log("tip 2");
            }}
          >
            $2
          </Button>
        </Badge>
        <Badge sx={{ px: 2, py: 1 }} variant="invisible">
          <Button
            variant="tip"
            sx={{ left: 0 }}
            onClick={() => {
              console.log("tip 2");
            }}
          >
            Custom
          </Button>
        </Badge>
      </Box>
    </Flex>
  );
};
