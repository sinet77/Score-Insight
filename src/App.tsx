import { useState } from "react";
import { Test } from "./Test";
import "./App.css";
import CountriesList from "./api/countries and leagues/CountriesAndLeagues";
import LeagueTeams from "./api/teams/LeagueTeams";

function App() {
  const [selectedLeagueId, setSelectedLeagueId] = useState<number | null>(null);

  return (
    <div style={{ display: "flex", gap: "50px" }}>
      <Test />
      <CountriesList onLeagueSelect={setSelectedLeagueId} />
      {selectedLeagueId && <LeagueTeams key={selectedLeagueId} leagueId={selectedLeagueId} season="2023" />}

    </div>
  );
}

export default App;

