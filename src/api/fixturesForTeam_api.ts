import { baseApi } from "./baseApi";
import fixtureData from "../data/Liverpool2023matches.json"
import { FixturesResponse } from "@components/TeamView/Matches/matches_types";

const isDevelop = import.meta.env.DEV;

export const getFixturesForTeam = async (
    teamId: number,
    leagueId: number,
    season: string
  ) => {
    if (isDevelop) {
      return fixtureData.response; 
    }
    try {
      const response = await baseApi.get<FixturesResponse>(
        `https://v3.football.api-sports.io/fixtures?season=${season}&team=${teamId}&league=${leagueId}`
      );

      return response; 
    } catch (error) {
      console.error("Error fetching fixtures:", error);
      return [];
    }
  };
  