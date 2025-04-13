import { baseApi } from "./baseApi";
import fixtureData from "../data/matchStatsLiverpool2023.json"


const isDevelop = import.meta.env.DEV;

export const getFixtureStats  = async (
    fixtureId: number,

  ) => {
    if (isDevelop) {
      return fixtureData.response; 
    }
    try {
      const response = await baseApi.get(
        `https://v3.football.api-sports.io/fixtures/statistics?fixture=${fixtureId}`
      );
      console.log("Fixtures for team:", response.response)

      return response.response; 
    } catch (error) {
      console.error("Error fetching fixture statistics:", error);
      return null;
    }
  };
  