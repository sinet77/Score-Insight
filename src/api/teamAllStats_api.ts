import { baseApi } from "./baseApi";
import fixtureData from "../data/Liverpool2023matches.json";
import { Fixture, FixturesResponse } from "@components/TeamView/Matches/matches_types";

const isDevelop = import.meta.env.DEV;

export const getAllStatsForTeam = async (
  teamId: number,
  leagueId: number,
  season: string
) => {
    //   if (isDevelop) {
    //   return fixtureData.response; 
    // }
  try {
    const response = await baseApi.get(
      `https://v3.football.api-sports.io/teams/statistics?season=${season}&team=${teamId}&league=${leagueId}`
    );
    return response; 
  } catch (error) {
    console.error("Error fetching fixtures:", error);
    return []; 
  }
};
