import type { StandingsResponse } from "@components/Teams/standings-types";
import premierLeagueData from "../data/premierLeagueTeams2023.json"

const isDevelop = import.meta.env.DEV;

const get = async (leagueId: number, season:string): Promise<StandingsResponse> => {
  if(isDevelop){
    return premierLeagueData as unknown as StandingsResponse;}
  try {
    const response = await fetch(
      `https://v3.football.api-sports.io/standings?league=${leagueId}&season=${season}`,
      {
        headers: {
          "x-rapidapi-key": "6266f2d70eed3758d548a5e2451b04cf",
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
