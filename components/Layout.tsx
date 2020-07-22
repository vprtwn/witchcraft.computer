import Header from "./Header";

export default ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
  </>
);
