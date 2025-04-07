import { baseApi } from "./baseApi";

export const getFixturesForTeam = async (
    teamId: number,
    leagueId: number,
    season: string
  ) => {
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
  