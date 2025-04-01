export interface Coach {
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  age: number;
    birth: {
        date: string;
        place: string;
        country: string;
    };
  nationality: string;
  height: string;
  weight: string;
  photo: string;
  team: {
    id: number;
    name: string;
    logo: string;
  };
  career: {
    team: { id: number; name: string; logo: string };
    start: string;
    end: string | null;
  }[];
}

export interface CoachApiResponse {
  response: Coach[];
}
