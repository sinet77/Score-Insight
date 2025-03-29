import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar/Navbar";
import "./Layout.scss";

export default function Layout() {
  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: "1500px", margin: "0 auto" }}>
        <Outlet />
      </div>
      {/* <Footer /> */}
    </div>
  );
}
