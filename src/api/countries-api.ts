import leaguesData from "./leagues/leaguesData.json"
import type { CountriesResponse } from "./countries-types";

const isDevelop = import.meta.env.DEV;

const get = async (): Promise<CountriesResponse> => {
  if (isDevelop) {
    return leaguesData as CountriesResponse;
  }

  try {
    const response = await fetch(
      "https://v3.football.api-sports.io/leagues",
      {
        headers: {
          "x-rapidapi-key": "b9ac7d19dbd4a2c43f42264d1e9f1626",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data as CountriesResponse;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
};

export const countriesApi = {
  get,
};
