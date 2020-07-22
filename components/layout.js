import Header from "../components/Header";

export default ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
  </>
);
