import { useState } from "react";
import "./App.css";
import CountriesList from "./api/countries and leagues/CountriesAndLeagues";
import LeagueTeams from "./api/teams/LeagueTeams";

function App() {
  const [selectedLeagueId, setSelectedLeagueId] = useState<number | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<string>("");

  const handleSeasonSelect = (selectedSeason: string) => {
    setSelectedSeason(selectedSeason);
  };

  return (
    <div style={{ display: "flex", gap: "50px" }}>
      <CountriesList
        onLeagueSelect={setSelectedLeagueId}
        onSeasonSelect={handleSeasonSelect}
      />
      {selectedLeagueId && (
        <LeagueTeams
          key={`${selectedLeagueId}-${selectedSeason}`}
          leagueId={selectedLeagueId}
          season={selectedSeason}
        />
      )}
    </div>
  );
}

export default App;
