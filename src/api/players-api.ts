import { Player, PlayerMainResponse } from "@components/PlayerDetails/player-types";
import playersData from "../data/playersLiverpool2023.json"

const isDevelop = import.meta.env.DEV;

const get = async (teamId: number, season: string) => {
  if(isDevelop){
    return playersData as PlayerMainResponse;
  }
  try {
    let allPlayers: Player[] = [];
    let totalPages = 1;

    for (let page = 1; page <= totalPages; page++) {
      const response = await fetch(
        `https://v3.football.api-sports.io/players?team=${teamId}&season=${season}&page=${page}`,
        {
          headers: {
            "x-apisports-key": "6266f2d70eed3758d548a5e2451b04cf",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      allPlayers = [...allPlayers, ...data.response];

      if (page === 1) {
        totalPages = data.paging?.total || 1;
      }
    }

    return allPlayers;
  } catch (error) {
    console.error(`Error fetching players for team ${teamId}:`, error);
    return [];
  }
};

  
  export const playersApi = {
    get,
  };
  