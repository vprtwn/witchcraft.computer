import { Container, Box } from "theme-ui";
import Footer from "./Footer";

const Layout = ({ children }) => (
  <Container sx={{ maxWidth: 400 }}>
    <Box sx={{ mx: 1 }}>
      <main>{children}</main>
    </Box>
    <Footer />
  </Container>
);

export default Layout;
