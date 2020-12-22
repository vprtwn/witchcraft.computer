import { Container, Box } from 'theme-ui';

const Layout = ({ children }) => (
  <Container sx={{ maxWidth: 600 }}>
    <Box sx={{ mx: 2 }}>
      <main>{children}</main>
    </Box>
  </Container>
);
export default Layout;
