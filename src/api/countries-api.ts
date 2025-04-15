import leaguesData from "../data/leaguesData.json";
import type { CountriesResponse } from "@components/CountriesAndLeagues/countries-types";
import { baseApi } from "./baseApi";

const isDevelop = import.meta.env.DEV;

const get = async (): Promise<CountriesResponse> => {
  if (isDevelop) {
    return leaguesData as CountriesResponse;
  }

  try {
    const response = await baseApi.get<CountriesResponse>(
      "https://v3.football.api-sports.io/leagues"
    );
    return response;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
};

export const countriesApi = {
  get,
};
