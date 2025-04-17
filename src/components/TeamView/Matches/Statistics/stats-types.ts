export interface Fixture {
  fixture: {
    id: number;
  };
}

export interface Statistic {
  type: string;
  value: string | number | null;
}

export interface TeamStatistics {
  statistics: Statistic[];
}

export interface FixtureStatisticsApiResponse {
  response: TeamStatistics[];
}

export type StatisticsBarProps = {
    label: string;
    team1Value: number
    team2Value: number
  };