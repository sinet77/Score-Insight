import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { PlayerGrid } from "@components/PlayerDetails/PlayerGrid";
import { Player } from "@components/PlayerDetails/player-types";
import { StadiumProps } from "./Stadium/stadium-types";
import styles from "./TeamView.module.scss";
import StadiumCard from "./Stadium/StadiumCard";
import { LogoAndName } from "./LogoAndName/LogoAndName";
import { Coach } from "./Coach/Coach";
import LoadingSpinner from "@components/ui/LoadingSpinner/LoadingSpinner";
import { getPlayers } from "@api/players_api";
import { getStadium } from "@api/stadium_api";

export const TeamView = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const [players, setPlayers] = useState<Player[]>([]);
  const [stadium, setStadium] = useState<StadiumProps | null>(null);
  const [loading, setLoading] = useState(true);
  const season = "2023";

  useEffect(() => {
    const fetchData = async () => {
      if (!teamId) return;
  
      setLoading(true);
  
      try {
        const [playersRes, stadiumRes] = await Promise.all([
          getPlayers(Number(teamId), season),
          getStadium(Number(teamId)),
        ]);
  
        setPlayers(playersRes);
        setStadium(stadiumRes);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [teamId]);
  

  const averageAge =
    players.length > 0
      ? players.reduce((sum, player) => sum + player.player.age, 0) /
        players.length
      : null;

  const leagueCountry =
    players.length > 0
      ? players[0].statistics?.[0]?.league?.country ?? null
      : null;

  const domesticPlayers = players.filter(
    (player) => player.player.nationality === leagueCountry
  ).length;

  const foreignPlayers = players.length - domesticPlayers;

  const allPlayers = players.length;

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <LogoAndName data={players} />
          <div className={styles["wrapper"]}>
            {teamId && <Coach teamId={Number(teamId)} season={season} />}
            {stadium && <StadiumCard stadium={stadium} />}
          </div>
          <p>Number of players: {allPlayers}</p>
          <p>Domestic players: {domesticPlayers}</p>
          <p>Foreign players: {foreignPlayers}</p>
          {averageAge !== null && <p>Average Age: {averageAge.toFixed(1)}</p>}
          <h1>Team Roster</h1>
          <PlayerGrid players={players} />
        </div>
      )}
    </div>
  );
};
