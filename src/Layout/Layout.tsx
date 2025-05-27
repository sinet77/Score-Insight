import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar/Navbar";
import { Footer } from "@components/Footer/Footer";
import styles from "./Layout.module.scss"

export default function Layout() {
  return (
    <div className={styles["main"]}>
      <Navbar />
      <div className={styles["content"]}>
        <Outlet />
      </div>
      <Footer /> 
    </div>
  );
}
