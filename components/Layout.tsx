import Header from "./Header";
import { Container, Box } from "theme-ui";

const Layout = ({ children }) => (
  <Container sx={{ maxWidth: 500 }}>
    <Header />
    <main>{children}</main>
  </Container>
);

export default Layout;
