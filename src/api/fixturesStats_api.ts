import { baseApi, isDevelopApi } from "./baseApi";
import fixtureData from "../data/matchStatsLiverpool2023.json";
import {
  FixtureStatisticsApiResponse,
  TeamStatistics,
} from "@components/TeamView/Matches/Statistics/stats-types";

export const getFixtureStats = async (
  fixtureId: number
): Promise<TeamStatistics[]> => {
  if (isDevelopApi) {
    return fixtureData.response;
  }
  try {
    const response = await baseApi.get<FixtureStatisticsApiResponse>(
      `https://v3.football.api-sports.io/fixtures/statistics?fixture=${fixtureId}`
    );

    return response.response;
  } catch (error) {
    console.error("Error fetching fixture statistics:", error);
    return [];
  }
};
