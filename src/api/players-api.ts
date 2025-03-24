const get = async (teamId: number, season: string) => {
    try {
      const response = await fetch(
        `https://v3.football.api-sports.io/players?team=${teamId}&season=${season}`,
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
      return data.response;
    } catch (error) {
      console.error(`Error fetching players for team ${teamId}:`, error);
      return [];
    }
  };
  
  export const playersApi = {
    get,
  };
  