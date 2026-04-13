import PropTypes from "prop-types";
import NavBar from "./ui/NavBar";
import Footer from "./ui/Footer";

export default function App({ children }) {
  return (
    <div className="app-shell">
      <NavBar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node,
};
