import { Container, Box } from "theme-ui";

const Layout = ({ children }) => (
  <Container sx={{ maxWidth: 400 }}>
    <Box sx={{ m: 1 }}>
      <main>{children}</main>
    </Box>
  </Container>
);

export default Layout;
