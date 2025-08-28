import { useState } from "react";
import { useH2HSelection } from "../../../../hooks/useH2hSelection";
import { PlayersStatsData } from "../PlayersStatsData/PlayersStatsData";
import { PlayerCard } from "./PlayerCard";

export function PlayerSelection() {
  const [selectedPlayer1, setSelectedPlayer1] = useState<string | undefined>();
  const [selectedPlayer2, setSelectedPlayer2] = useState<string | undefined>();

  const {
    leftSide,
    rightSide,
    setLeftSide,
    setRightSide,
    countryOptions,
    seasonOptions,
    leagueOptions1,
    leagueOptions2,
    teamOptions1,
    teamOptions2,
    resetTeamSelection,
    handleSeasonChange,
    players1,
    players2,
  } = useH2HSelection();

  const playerOptions1 = players1.map((p) => ({
    label: p.player.name,
    value: p.player.id,
  }));
  const playerOptions2 = players2.map((p) => ({
    label: p.player.name,
    value: p.player.id,
  }));

  return (
    <div className="wrapper">
      <div className="team-selection-container">
        <PlayerCard
          title="Choose first player"
          side="left"
          state={leftSide}
          setState={setLeftSide}
          countryOptions={countryOptions}
          leagueOptions={leagueOptions1}
          teamOptions={teamOptions1}
          seasonOptions={seasonOptions}
          playerOptions={playerOptions1}
          selectedPlayerLabel={selectedPlayer1}
          onSelectPlayer={setSelectedPlayer1}
          onReset={resetTeamSelection}
          handleSeasonChange={handleSeasonChange}
        />

        <PlayerCard
          title="Choose second player"
          side="right"
          state={rightSide}
          setState={setRightSide}
          countryOptions={countryOptions}
          leagueOptions={leagueOptions2}
          teamOptions={teamOptions2}
          seasonOptions={seasonOptions}
          playerOptions={playerOptions2}
          selectedPlayerLabel={selectedPlayer2}
          onSelectPlayer={setSelectedPlayer2}
          onReset={resetTeamSelection}
          handleSeasonChange={handleSeasonChange}
        />
      </div>

      <PlayersStatsData
        playerOne={
          players1.find((p) => p.player.name === selectedPlayer1) ?? null
        }
        playerTwo={
          players2.find((p) => p.player.name === selectedPlayer2) ?? null
        }
      />
    </div>
  );
}
