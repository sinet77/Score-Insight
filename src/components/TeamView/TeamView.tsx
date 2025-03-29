import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { playersAndStadiumApi } from "../../api/playersAndStadium-api";
import { PlayerGrid } from "@components/PlayerDetails/PlayerGrid";
import { Player } from "@components/PlayerDetails/player-types";
import { Stadium } from "./stadium-types";

export const TeamView = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const [players, setPlayers] = useState<Player[]>([]);
  const [stadium, setStadium] = useState<Stadium | null>(null);
  const [loading, setLoading] = useState(true);
  const season = "2023"; 

  useEffect(() => {
    const fetchTeamPlayers = async () => {
      if (!teamId) return;

      try {
        setLoading(true);
        const response = await playersAndStadiumApi.get(Number(teamId), season);
        console.log("API Response:", response); 

        if ("response" in response) {
          setPlayers(response.response);
          setStadium(response.stadium);
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
      {loading ? (
        <p>Loading players...</p>
      ) : (
        <div>
          {stadium && (
            <div>
              <h2>{stadium.name}</h2>
              <p>{stadium.address}, {stadium.city}, {stadium.country}</p>
              <p>Capacity: {stadium.capacity}</p>
              <img src={stadium.image} alt={stadium.name} />
            </div>
          )}
          <PlayerGrid players={players} />
        </div>
      )}
    </div>
  );
};
