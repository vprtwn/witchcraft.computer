import { Container, Box } from 'theme-ui';

const Layout = ({ children }) => (
  <Container sx={{ maxWidth: 400 }}>
    <Box sx={{ mx: 2, fontSize: '13px' }}>
      <main>{children}</main>
    </Box>
  </Container>
);
export default Layout;
