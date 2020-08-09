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
          <Flex sx={{ alignItems: "top" }}>
            <Text sx={{ fontSize: "9px", ml: 2, mr: 1 }}>made with</Text>
            <Box sx={{ pl: 0, pr: 4, fontWeight: "bold", fontSize: "12px" }}>
              <Link href="/" variant="nav">
                <i>flexjar</i>
              </Link>
            </Box>
          </Flex>
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
