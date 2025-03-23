import type { StandingsResponse } from "../components/Teams/standings-types";

const get = async (leagueId: number, season:string): Promise<StandingsResponse> => {
  try {
    const response = await fetch(
      `https://v3.football.api-sports.io/standings?league=${leagueId}&season=${season}`,
      {
        headers: {
          "x-rapidapi-key": "b9ac7d19dbd4a2c43f42264d1e9f1626",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data as StandingsResponse;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
};

export const leagueTeamsApi = {
  get,
};
