import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { playersAndStadiumApi } from "../../api/playersAndStadium-api";
import { PlayerGrid } from "@components/PlayerDetails/PlayerGrid";
import { Player } from "@components/PlayerDetails/player-types";
import { StadiumProps } from "./Stadium/stadium-types";
import styles from "./TeamView.module.scss";
import StadiumCard from "./Stadium/StadiumCard";
import { LogoAndName } from "./LogoAndName/LogoAndName";

export const TeamView = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const [players, setPlayers] = useState<Player[]>([]);
  const [stadium, setStadium] = useState<StadiumProps | null>(null);
  const [loading, setLoading] = useState(true);
  const season = "2023";

  useEffect(() => {
    const fetchTeamPlayers = async () => {
      if (!teamId) return;

      try {
        setLoading(true);
        const response = await playersAndStadiumApi.get(Number(teamId), season);

        setPlayers(response.response);
        setStadium(response.stadium);
      } catch (error) {
        console.error("Error fetching players:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamPlayers();
  }, [teamId]);

  console.log("Players:", players);

  return (
    <div>
      
      {loading ? (
        <p>Loading players...</p>
      ) : (
        <div>
          <LogoAndName data={players}/>
          {stadium && <StadiumCard stadium={stadium} />}
          <h1>Team Roster</h1>
          <PlayerGrid players={players} />
        </div>
      )}
    </div>
  );
};
