import type { StandingsResponse } from "@components/Teams/standings-types";
import premierLeagueData from "../data/premierLeagueTeams2023.json";
import { baseApi, isDevelopApi } from "./baseApi";

const get = async (
  leagueId: number,
  season: string
): Promise<StandingsResponse> => {
  if (isDevelopApi) {
    return premierLeagueData as unknown as StandingsResponse;
  }
  try {
    const response = await baseApi.get<StandingsResponse>(
      `https://v3.football.api-sports.io/standings?league=${leagueId}&season=${season}`
    );

    return response;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
};

export const leagueTeamsApi = {
  get,
};
