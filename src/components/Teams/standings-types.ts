export interface StandingsResponse {
  get: string;
  parameters: {
    league: string;
    season: string;
  };
  errors: string[];
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: LeagueStanding[];
}

export interface LeagueStanding {
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
    standings: TeamStanding[][];
  };
}

export interface TeamStanding {
  rank: number;
  team: {
    id: number;
    name: string;
    logo: string;
  };
  points: number;
  goalsDiff: number;
  group: string;
  form: string;
  status: string;
  description?: string;
  all: MatchStats;
  home: MatchStats;
  away: MatchStats;
  update: string;
}

export interface MatchStats {
  played: number;
  win: number;
  draw: number;
  lose: number;
  goals: {
    for: number;
    against: number;
  };
  home: TeamStats; 
  away: TeamStats;
}

export interface TeamStats {
  [key: string]: string; 
}
export type Side = 'home' | 'away';

export interface RenderTeamStatsProps {
  side: Side;
  team: TeamStanding;
}
