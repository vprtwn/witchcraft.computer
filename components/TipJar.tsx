import { Flex, Box, Input, Badge, Button, Text } from "theme-ui";
import { signIn, signOut, useSession } from "next-auth/client";
import { CardMeta } from "../lib/typedefs";

export default (props) => {
  const data = props.data as CardMeta;
  const tipText = data.tj_t || "Leave a tip";
  return (
    <Flex sx={{ bg: "primary", alignItems: "center", py: 1 }}>
      <Box sx={{ ml: 3 }}>
        {!props.editing && <Text variant="tipText">{tipText}</Text>}
        {props.editing && (
          <Input variant="tipText" onChange={props.onTipTextChange} defaultValue={tipText} />
        )}
      </Box>
      <Box sx={{ flex: "1 1 auto", px: 1 }}></Box>
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
