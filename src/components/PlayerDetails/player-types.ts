export type Player = {
    player: {
        id: number;
        name: string;
        firstname: string;
        lastname: string;
        age: number;
        birth: {
            date: string;
            place: string | null;
            country: string;
        };
        nationality: string;
        height: string | null;
        weight: string | null;
        injured: boolean;
        photo: string;
    };
    statistics: {
        team: {
            id: number;
            name: string;
            logo: string;
        };
        league: {
            id: number;
            name: string;
            country: string;
            logo: string;
            flag: string | null;
            season: number;
        };
        games: {
            appearences: number | null;
            lineups: number | null;
            minutes: number | null;
            number: number | null;
            position: string;
            rating: string | null;
            captain: boolean;
        };
        substitutes: {
            in: number | null;
            out: number | null;
            bench: number | null;
        };
        shots: {
            total: number | null;
            on: number | null;
        };
        goals: {
            total: number | null;
            conceded: number | null;
            assists: number | null;
            saves: number | null;
        };
        passes: {
            total: number | null;
            key: number | null;
            accuracy: number | null;
        };
        tackles: {
            total: number | null;
            blocks: number | null;
            interceptions: number | null;
        };
        duels: {
            total: number | null;
            won: number | null;
        };
        dribbles: {
            attempts: number | null;
            success: number | null;
            past: number | null;
        };
        fouls: {
            drawn: number | null;
            committed: number | null;
        };
        cards: {
            yellow: number | null;
            yellowred: number | null;
            red: number | null;
        };
        penalty: {
            won: number | null;
            commited: number | null;
            scored: number | null;
            missed: number | null;
            saved: number | null;
        };
    }[];
};
