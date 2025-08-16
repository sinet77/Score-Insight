// App.tsx
import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import CountriesList from "@components/Pages/MainPage/CountriesAndLeagues/CountriesAndLeagues";
import { LeagueTeams } from "@components/Teams/LeagueTeams";
import { GoToH2H } from "@components/Pages/MainPage/GoToH2H/GoToH2H";
import BannerSlider from "@components/Pages/MainPage/Banner/Banner";
import News from "@components/Pages/MainPage/News/News";
import styles from "./App.module.scss";
import h2hTeams from "./assets/h2hteams.jpeg";
import h2hPlayers from "./assets/h2hplayers.jpg";
import fifa_logo from "./assets/fifa_logo.png";
import { routes } from "./routes";
import { FavouriteTeam } from "@components/FavouriteTeam/FavouriteTeam";
import Modal from "@components/ui/Modal/Modal";

type ContextType = {
  scrollToLeagues: () => void;
  setSelectedLeagueId: (id: number) => void;
  selectedLeagueId: number;
};

function App() {
  const { setSelectedLeagueId, selectedLeagueId } =
    useOutletContext<ContextType>();

  const [selectedSeason, setSelectedSeason] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSeasonSelect = (season: string) => {
    setSelectedSeason(season);
  };

  const navigate = useNavigate();

  return (
    <div className={styles["main-container"]}>
      <FavouriteTeam onClick={() => setIsOpen(true)} />
      {isOpen && (
        <Modal handleClose={() => setIsOpen(false)}>
          <div
            className={styles["modal-countries-container"]}
            id="modal-choose-league"
          >
            <div style={{ height: "600px" }}>
              <CountriesList
                onLeagueSelect={setSelectedLeagueId}
                onSeasonSelect={handleSeasonSelect}
                selectedSeason={selectedSeason}
              />
            </div>
            <div className={styles["modal-teams-container"]}>
              {selectedLeagueId && (
                <LeagueTeams
                  key={`${selectedLeagueId}-${selectedSeason}`}
                  leagueId={selectedLeagueId}
                  season={selectedSeason || "2023"}
                />
              )}
            </div>
          </div>
        </Modal>
      )}
      <BannerSlider />
      <section id="news">
        <News />
      </section>
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
      <section className={styles["go-to-container"]}>
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
      </section>
      <section className={styles["countries-container"]} id="choose-league">
        <div style={{ height: "600px" }}>
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
      </section>
    </div>
  );
}

export default App;
