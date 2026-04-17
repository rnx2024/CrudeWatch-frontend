import PropTypes from "prop-types";
import NavBar from "./ui/NavBar";
import Footer from "./ui/Footer";
import { Analytics } from "@vercel/analytics/react";

export default function App({ children }) {
  return (
    <div className="app-shell">
      <NavBar />
      <main>{children}</main>
      <Footer />
      <Analytics />
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node,
};
