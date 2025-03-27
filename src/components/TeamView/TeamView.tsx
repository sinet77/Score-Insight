import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { playersApi } from "../../api/players-api";
import { PlayerGrid } from "@components/PlayerDetails/PlayerGrid";
import { Player } from "@components/PlayerDetails/player-types";

export const TeamView = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const season = "2023"; 

  useEffect(() => {
    const fetchTeamPlayers = async () => {
      if (!teamId) return;

      try {
        setLoading(true);
        const response = await playersApi.get(Number(teamId), season);

        if ("response" in response) {
          setPlayers(response.response);
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (error) {
        console.error("Error fetching players:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamPlayers();
  }, [teamId]);

  return (
    <div>
      <h1>Team Roster</h1>
      {loading ? <p>Loading players...</p> : <PlayerGrid players={players} />}
    </div>
  );
};
