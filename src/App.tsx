import { useState } from "react";
import CountriesList from "@components/Pages/MainPage/CountriesAndLeagues/CountriesAndLeagues";
import { LeagueTeams } from "@components/Teams/LeagueTeams";
import { GoToH2H } from "@components/Pages/MainPage/GoToH2H/GoToH2H";
import h2hTeams from "./assets/h2hteams.jpeg";
import h2hPlayers from "./assets/h2hplayers.jpg";
import styles from "./App.module.scss";
import { useNavigate } from "react-router-dom";
import { routes } from "./routes";
import BannerSlider from "@components/Pages/MainPage/Banner/Banner";
import News from "@components/Pages/MainPage/News/News";
import fifa_logo from "./assets/fifa_logo.png";

function App() {
  const [selectedLeagueId, setSelectedLeagueId] = useState<number | null>(39);
  const [selectedSeason, setSelectedSeason] = useState<string>("");

  const handleSeasonSelect = (selectedSeason: string) => {
    setSelectedSeason(selectedSeason);
  };

  const navigate = useNavigate();

  return (
    <>
      <BannerSlider />
      <div className={styles["main-container"]}>
        <News />
        <button
          className={styles["fifa-ranking-button"]}
          onClick={() => navigate(routes.ranking)}
        >
          <span className={styles["button-first-text-part"]}>Check newest</span>
          <img
            src={fifa_logo}
            alt={"fifa logo"}
            className={styles["fifa_logo"]}
          />
          <span className={styles["button-text"]}>FIFA Ranking</span>
        </button>
        <div className={styles["go-to-container"]}>
          <GoToH2H
            image={h2hTeams}
            title="Go to Head to Head for Teams"
            where={() => navigate(routes.compareTeams)}
          />
          <GoToH2H
            image={h2hPlayers}
            title="Go to Head to Head for Players"
            where={() => navigate(routes.comparePlayers)}
          />
        </div>
        <div className={styles["countries-container"]}>
          <div>
            <CountriesList
              onLeagueSelect={setSelectedLeagueId}
              onSeasonSelect={handleSeasonSelect}
              selectedSeason={selectedSeason}
            />
          </div>
          {selectedLeagueId && (
            <LeagueTeams
              key={`${selectedLeagueId}-${selectedSeason}`}
              leagueId={selectedLeagueId}
              season={selectedSeason || "2023"}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
