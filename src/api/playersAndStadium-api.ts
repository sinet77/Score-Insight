import {
  Player,
} from "@components/PlayerDetails/player-types";
import playersData from "../data/playersAndStadiumLiverpool2023.json";
import { StadiumProps } from "@components/TeamView/Stadium/stadium-types";

const isDevelop = import.meta.env.DEV;

type ApiResponse = {
  response: Player[];
  stadium: StadiumProps | null;
};

const get = async (teamId: number, season: string): Promise<ApiResponse> => {
  if (isDevelop) {
    return { response: playersData.response, stadium: playersData.stadium } 
  }

  try {
    let stadium: StadiumProps | null = null;
    let allPlayers: Player[] = [];
    let totalPages = 1;


    const teamResponse = await fetch(
      `https://v3.football.api-sports.io/teams?id=${teamId}`,
      {
        headers: {
          "x-apisports-key": "6266f2d70eed3758d548a5e2451b04cf",
        },
      }
    );

    if (!teamResponse.ok) {
      throw new Error(`Failed to fetch team data: ${teamResponse.status}`);
    }

    const teamData = await teamResponse.json();
    const venueId = teamData.response?.[0]?.venue.id || null;
  
    if (venueId) {
      const venueResponse = await fetch(
        `https://v3.football.api-sports.io/venues?id=${venueId}`,
        {
          headers: {
            "x-apisports-key": "6266f2d70eed3758d548a5e2451b04cf",
          },
        }
      );

      if (venueResponse.ok) {
        const venueData = await venueResponse.json();
        stadium = venueData.response?.[0] || {};
      }
    }

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

    return { response: allPlayers, stadium};
  } catch (error) {
    console.error(`Error fetching players for team ${teamId}:`, error);
    return { response: [], stadium: null };
  }
};

export const playersAndStadiumApi = {
  get,
};
