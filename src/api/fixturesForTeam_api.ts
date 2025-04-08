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
      return fixtureData.response as FixturesResponse; 
    }
    try {
      const response = await baseApi.get(
        `https://v3.football.api-sports.io/fixtures?season=${season}&team=${teamId}&league=${leagueId}`
      );
      console.log("Fixtures for team:", response.response)

      return response.response; 
    } catch (error) {
      console.error("Error fetching fixtures:", error);
      return [];
    }
  };
  