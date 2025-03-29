export type PlayerMainResponse = {
  get: string;
  parameters: {
    team: string;
    season: string;
    page: number;
  };
  errors: never[];
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: Player[]; 
  
};

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
    games: {
      position: string;
    };
  }[];
};
