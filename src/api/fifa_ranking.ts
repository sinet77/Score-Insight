import fifaRankingData from "../data/fifaRanking.json"

const isDevelop = import.meta.env.DEV;
const VITE_FIFA_RANKING_KEY = '37dd2f3585mshc686436de66ad7bp1b621fjsne2272199deb7'

export const getFifaRanking = async () => {
    if (isDevelop) {
        return fifaRankingData;
    }
    const url = 'https://world-football-ranking.p.rapidapi.com/current-ranking.php';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '37dd2f3585mshc686436de66ad7bp1b621fjsne2272199deb7',
            'x-rapidapi-host': VITE_FIFA_RANKING_KEY
        }
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

