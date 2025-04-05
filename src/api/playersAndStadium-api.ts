import { Player } from "@components/PlayerDetails/player-types";
import playersData from "../data/playersAndStadiumLiverpool2023.json";
import { StadiumProps } from "@components/TeamView/Stadium/stadium-types";
import { baseApi } from "./baseApi";

const isDevelop = import.meta.env.DEV;

type ApiResponse = {
  response: Player[];
  stadium: StadiumProps | null;
};

//DRY, KISS, SOLID

const get = async (teamId: number, season: string): Promise<ApiResponse> => {
  if (isDevelop) {
    return { response: playersData.response, stadium: playersData.stadium };
  }

  try {
    let stadium: StadiumProps | null = null;
    const totalPages = 1;

    const teamResponse = await fetch(
      `https://v3.football.api-sports.io/teams?id=${teamId}`,
      {
        headers: {
          "x-apisports-key": "0d4630fcf45a93d228008cd6fa8610f3",
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
            "x-apisports-key": "0d4630fcf45a93d228008cd6fa8610f3",
          },
        }
      );

      if (venueResponse.ok) {
        const venueData = await venueResponse.json();
        stadium = venueData.response?.[0] || {};
      }
    }

    const allPagesPromises = Array.from({ length: totalPages }).map(
      (_, index) =>
        baseApi.get(
          `https://v3.football.api-sports.io/players?team=${teamId}&season=${season}&page=${
            index + 1
          }`
        )
    );

    const allResponses = await Promise.all(allPagesPromises);
    const allPlayers: Player[] = allResponses.flatMap(response => response.response);
    return { response: allPlayers, stadium };
  } catch (error) {
    console.error(`Error fetching players for team ${teamId}:`, error);
    return { response: [], stadium: null };
  }
};

export const playersAndStadiumApi = {
  get,
};
