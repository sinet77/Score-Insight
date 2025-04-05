const get = async (endpoint: string, headers?: HeadersInit) => {
    try {
      const response = await fetch(endpoint, {
        headers: {
          "x-apisports-key": "6266f2d70eed3758d548a5e2451b04cf",
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