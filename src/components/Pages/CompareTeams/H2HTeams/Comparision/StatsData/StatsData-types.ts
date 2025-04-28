import { TeamStanding } from "@components/Teams/standings-types";

export interface StatItemProps {
    leftValue: string | number;
    rightValue: string | number;
    label: string;
  }
  
  export interface StatsDataProps {
    teamOneStanding: TeamStanding | null;
    teamTwoStanding: TeamStanding | null;
  }