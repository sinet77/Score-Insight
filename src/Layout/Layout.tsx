import { useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar/Navbar";
import { Footer } from "@components/Footer/Footer";
import styles from "./Layout.module.scss";

export default function Layout() {
  const [selectedLeagueId, setSelectedLeagueId] = useState<number>(39);
  const leaguesRef = useRef<HTMLDivElement>(null);

  const scrollToLeagues = () => {
    leaguesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles["main"]}>
      <Navbar />
      <div className={styles["content"]}>
        <Outlet
          context={{
            scrollToLeagues,
            setSelectedLeagueId,
            leaguesRef,
            selectedLeagueId,
          }}
        />
      </div>
      <Footer scrollToLeagues={scrollToLeagues} setSelectedLeagueId={setSelectedLeagueId} />
    </div>
  );
}
