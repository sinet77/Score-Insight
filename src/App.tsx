import { useState } from "react";
import CountriesList from "@components/CountriesAndLeagues/CountriesAndLeagues";
import { LeagueTeams } from "@components/Teams/LeagueTeams";

function App() {
  const [selectedLeagueId, setSelectedLeagueId] = useState<number | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<string>("");

  const handleSeasonSelect = (selectedSeason: string) => {
    setSelectedSeason(selectedSeason);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "50px",
        width: "100%",
      }}
    >
      <div style={{ height: "600px"}}>
        <CountriesList
          onLeagueSelect={setSelectedLeagueId}
          onSeasonSelect={handleSeasonSelect}
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
  );
}

export default App;
