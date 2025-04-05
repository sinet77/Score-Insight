const apiKey = import.meta.env.VITE_API_FOOTBALL_KEY;

const get = async (endpoint: string, headers?: HeadersInit) => {
    try {
      const response = await fetch(endpoint, {
        headers: {
          "x-apisports-key": apiKey,
          ...headers,
        },
      });
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };
  
  export const baseApi = {
    get,
  };