import { CoachApiResponse } from "@components/TeamView/Coach/coach-types";
import coachLiverpool from "../data/coachLiverpool.json";
import { baseApi, isDevelopApi } from "./baseApi";

const get = async (teamId: number): Promise<CoachApiResponse> => {
  if (isDevelopApi) {
    return coachLiverpool as CoachApiResponse;
  }
  try {
    const response = await baseApi.get<CoachApiResponse>(
      `https://v3.football.api-sports.io/coachs?team=${teamId}`
    );

    return response;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
};

export const coachsApi = {
  get,
};
