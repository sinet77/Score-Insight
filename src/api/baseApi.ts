const get = async (endpoint: string, headers?: HeadersInit) => {
  try {
    const response = await fetch(endpoint, {
      headers: {
        "x-apisports-key": "0d4630fcf45a93d228008cd6fa8610f3",
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
