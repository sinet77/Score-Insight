import { Player } from "@components/PlayerDetails/player-types";
import { baseApi, isDevelopApi } from "./baseApi";
import playersData from "../data/playersLiverpool2023.json";

export const getPlayers = async (
  teamId: number,
  season: string
): Promise<Player[]> => {
  if (isDevelopApi) {
    return playersData.response as Player[];
  }

  try {
    const firstPage = await baseApi.get<{ response: Player[]; paging?: { total: number } }>(
      `https://v3.football.api-sports.io/players?team=${teamId}&season=${season}&page=1`
    );

    const totalPages = firstPage.paging?.total ?? 1;

    const allPages = Array.from({ length: totalPages }).map((_, i) =>
      i === 0
        ? Promise.resolve(firstPage)
        : baseApi.get<{ response: Player[] }>(
            `https://v3.football.api-sports.io/players?team=${teamId}&season=${season}&page=${
              i + 1
            }`
          )
    );

    const allResponses = await Promise.all(allPages);

    return allResponses.flatMap((res) => (res as { response: Player[] }).response);
  } catch (err) {
    console.error("Error fetching players:", err);
    return [];
  }
};
