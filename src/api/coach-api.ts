import { CoachApiResponse } from "@components/TeamView/Coach/coach-types";
import coachLiverpool from "../data/coachLiverpool.json";

const isDevelop = import.meta.env.DEV;

const get = async (teamId: number): Promise<CoachApiResponse> => {
    if (isDevelop) {
        return coachLiverpool as CoachApiResponse;
      }
  try {
    const response = await fetch(
      `https://v3.football.api-sports.io/coachs?team=${teamId}`,
      {
        headers: {
          "x-rapidapi-key": "6266f2d70eed3758d548a5e2451b04cf",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data : CoachApiResponse = await response.json();
    console.log("Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
};

export const coachsApi = {
  get,
};
