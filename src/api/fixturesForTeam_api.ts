import { baseApi, isDevelopApi } from "./baseApi";
import fixtureData from "../data/Liverpool2023matches.json";
import {
  Fixture,
  FixturesResponse,
} from "@components/TeamView/Matches/matches_types";

export const getFixturesForTeam = async (
  teamId: number,
  leagueId: number,
  season: string
): Promise<Fixture[]> => {
  if (isDevelopApi) {
    return fixtureData.response;
  }
  try {
    const response = await baseApi.get<FixturesResponse>(
      `https://v3.football.api-sports.io/fixtures?season=${season}&team=${teamId}&league=${leagueId}`
    );
    return response.response;
  } catch (error) {
    console.error("Error fetching fixtures:", error);
    return [];
  }
};
