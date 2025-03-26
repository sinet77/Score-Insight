import leaguesData from "../data/leaguesData.json"
import type { CountriesResponse } from "@components/CountriesAndLeagues/countries-types";

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
          "x-rapidapi-key": "6266f2d70eed3758d548a5e2451b04cf",
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
