export interface Country {
  name: string;
  code: string | null;
  flag: string | null;
}
export interface League {
  id: number;
  name: string;
  type: string;
  logo: string;
}

export interface CountryWithLeagues extends Country {
  leagues: League[];
}
export interface CountriesResponse {
  get: string;
  parameters: unknown[];
  errors: string[];
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: {
    country: Country;
    league?: League;
  }[];
}

export interface LeagueSelect {
  onLeagueSelect: (leagueId: number) => void;
  onSeasonSelect: (season: string) => void;
  selectedSeason: string;
}
