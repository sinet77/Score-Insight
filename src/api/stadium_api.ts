import {
  StadiumProps,
  TeamVenueApiResponse,
  VenueApiResponse,
} from "@components/TeamView/Stadium/stadium-types";
import { baseApi, isDevelopApi } from "./baseApi";
import stadiumData from "../data/stadiumAnfield.json";

export const getStadium = async (
  teamId: number
): Promise<StadiumProps | null> => {
  if (isDevelopApi) {
    return stadiumData.response[0] as StadiumProps;
  }

  try {
    const teamData = await baseApi.get<TeamVenueApiResponse>(
      `https://v3.football.api-sports.io/teams?id=${teamId}`
    );

    const venueId = teamData.response?.[0]?.venue?.id;
    if (!venueId) return null;

    const venueData = await baseApi.get<VenueApiResponse>(
      `https://v3.football.api-sports.io/venues?id=${venueId}`
    );

    return venueData.response?.[0] ?? null;
  } catch (err) {
    console.error("Error fetching stadium:", err);
    return null;
  }
};
