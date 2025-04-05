import { StadiumProps } from "@components/TeamView/Stadium/stadium-types";
import { baseApi } from "./baseApi";
import stadiumData from "../data/stadiumAnfield.json";

const isDevelop = import.meta.env.DEV;

export const getStadium = async (
  teamId: number
): Promise<StadiumProps | null> => {
  if (isDevelop) {
    return stadiumData.response[0] as StadiumProps;
  }
  try {
    const teamData = await baseApi.get(
      `https://v3.football.api-sports.io/teams?id=${teamId}`
    );
    const venueId = teamData.response?.[0]?.venue?.id;

    if (!venueId) return null;

    const venueData = await baseApi.get(
      `https://v3.football.api-sports.io/venues?id=${venueId}`
    );
    return venueData.response?.[0] || null;
  } catch (err) {
    console.error("Error fetching stadium:", err);
    return null;
  }
};
