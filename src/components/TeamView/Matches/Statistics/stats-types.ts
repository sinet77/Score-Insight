export interface Fixture {
  fixture: {
    id: number;
  };
}

export interface Statistic {
  type: string;
  value: string;
}

export interface TeamStatistics {
  statistics: Statistic[];
}

export type StatisticsBarProps = {
    label: string;
    team1Value: number
    team2Value: number
  };