import { useState } from "react";
import "./App.css";
import CountriesList from "./api/countries and leagues/CountriesAndLeagues";
import LeagueTeams from "./api/teams/LeagueTeams";

function App() {
  const [selectedLeagueId, setSelectedLeagueId] = useState<number | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<string>("");

  return (
    <div style={{ display: "flex", gap: "50px" }}>
      <CountriesList
        onLeagueSelect={setSelectedLeagueId}
        onSeasonSelect={setSelectedSeason}
      />
      {selectedLeagueId && (
        <LeagueTeams
          key={selectedLeagueId}
          leagueId={selectedLeagueId}
          season={selectedSeason}
        />
      )}
    </div>
  );
}

export default App;
