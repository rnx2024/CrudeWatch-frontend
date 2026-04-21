import NavBar from "./ui/NavBar";
import Footer from "./ui/Footer";
import { Analytics } from "@vercel/analytics/react";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="app-shell">
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}
