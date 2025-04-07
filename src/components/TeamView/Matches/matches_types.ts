type FixtureStatus = {
    long: string;
    short: string;
    elapsed: number;
    extra: string | null;
  };
  
  type Venue = {
    id: number;
    name: string;
    city: string;
  };
  
  type Score = {
    halftime: {
      home: number;
      away: number;
    };
    fulltime: {
      home: number;
      away: number;
    };
    extratime: {
      home: number | null;
      away: number | null;
    };
    penalty: {
      home: number | null;
      away: number | null;
    };
  };
  
  type Team = {
    id: number;
    name: string;
    logo: string;
    winner: boolean | null;
  };
  
  type League = {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
    round: string;
    standings: boolean;
  };
  
  type Fixture = {
    fixture: {
      id: number;
      referee: string;
      timezone: string;
      date: string;
      timestamp: number;
      periods: {
        first: number;
        second: number;
      };
      venue: Venue;
      status: FixtureStatus;
    };
    league: League;
    teams: {
      home: Team;
      away: Team;
    };
    goals: {
      home: number;
      away: number;
    };
    score: Score;
  };
  
  export type FixturesResponse = Fixture[];
  