import { Flex, Box, Container, IconButton, Button, Text, Image, Link } from "theme-ui";

export default (props) => {
  return (
    <Box sx={{ textAlign: "center", my: 4, py: 1, px: 2 }}>
      <Box sx={{ flex: "1 1 auto" }} />
      <Flex sx={{ alignItems: "center" }}>
        <Box sx={{ flex: "1 1 auto" }} />
        <Flex
          sx={{ bg: "transparent", borderRadius: 4, border: "1px solid", alignItems: "center" }}
        >
          <Box sx={{ pl: 2, pr: 0, fontWeight: "bold", fontSize: "12px" }}>
            <Link href="/" variant="nav">
              <i>flexjar</i>
            </Link>
          </Box>
          <Text sx={{ fontSize: "10px", ml: 2 }}>by</Text>
          <Box sx={{ flex: "1 1 auto", fontSize: "9px", ml: 2, mr: 2 }}>
            <Link href="https://mysterious.technology" variant="nav" sx={{ fontWeight: "normal" }}>
              <Text>mysterious</Text>
              <Text>.technology</Text>
            </Link>
          </Box>
          <Link href="/policies" variant="nav" sx={{ mx: 2, py: 1, fontSize: "10px" }}>
            Policies
          </Link>
        </Flex>
        <Box sx={{ flex: "1 1 auto" }} />
      </Flex>
      <Box sx={{ flex: "1 1 auto" }} />
    </Box>
  );
};
