import type React from "react";
import styles from "./StatsData.module.scss";
import { StatItemProps, StatsDataProps } from "./StatsData-types";
import { TeamStanding } from "@components/Teams/standings-types";

const StatItem = ({ leftValue, rightValue, label }: StatItemProps) => (
  <div className={styles["stat-row"]}>
    <div className={styles["stat-value"]}>{leftValue}</div>
    <div className={styles["stat-label"]}>{label}</div>
    <div className={styles["stat-value"]}>{rightValue}</div>
  </div>
);

const StatSection: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className={styles["stat-section"]}>
    <h3 className={styles["section-title"]}>{title}</h3>
    {children}
  </div>
);

const calculateAverageScore = (team: TeamStanding) => {
  const played = team.all.played;
  const wins = team.all.win;
  const draws = team.all.draw;
  const losses = team.all.lose;
  const goalsFor = team.all.goals.for;
  const goalsAgainst = team.all.goals.against;
  const points = team.points;

  if (played === 0) return 1;

  const pointsPerMatch = points / (played * 3); // 3 points for a win
  let score = pointsPerMatch * 7; // 7 to scale score for 1 to 10 range, for example points / (played * 3) = 1, so 1*7=7

  const goalDiff = goalsFor - goalsAgainst;
  score += (goalDiff / played) * 1.2;
  score += (wins / played) * 1;
  //penalties
  score -= (losses / played) * 1;
  score -= (draws / played) * 0.5;

  const finalScore = Math.min(Math.max(score, 1), 10);

  return finalScore.toFixed(2);
};

export const StatsData = ({
  teamOneStanding,
  teamTwoStanding,
}: StatsDataProps) => {
  return (
    <div className={styles["stats-container"]}>
      <div className={styles["stats-header"]}>
        <div className={styles["rating-box"]}>
          {teamOneStanding ? calculateAverageScore(teamOneStanding) : "N/A"}
        </div>
        <div className={styles["rating-label"]}>
          Average Score Insight Rating
        </div>

        <div className={styles["rating-box"]}>
          {teamTwoStanding ? calculateAverageScore(teamTwoStanding) : "N/A"}
        </div>
      </div>

      <StatSection title="General">
        <StatItem
          leftValue={teamOneStanding ? teamOneStanding.all.played : "N/A"}
          rightValue={teamTwoStanding?.all.played ?? "N/A"}
          label="Matches"
        />
        <StatItem
          leftValue={teamOneStanding?.all?.goals?.for ?? "N/A"}
          rightValue={teamTwoStanding?.all?.goals?.for ?? "N/A"}
          label="Goals scored"
        />
        <StatItem
          leftValue={teamOneStanding?.all?.goals?.against ?? "N/A"}
          rightValue={teamTwoStanding?.all?.goals?.against ?? "N/A"}
          label="Goals conceded"
        />
        <StatItem leftValue="-" rightValue="-" label="Assists" />
      </StatSection>

      <StatSection title="Attacking">
        <StatItem
          leftValue={
            teamOneStanding
              ? (
                  teamOneStanding.all.goals.for / teamOneStanding.all.played
                ).toFixed(2)
              : "N/A"
          }
          rightValue={
            teamTwoStanding
              ? (
                  teamTwoStanding.all.goals.for / teamTwoStanding.all.played
                ).toFixed(2)
              : "N/A"
          }
          label="Goals per match"
        />
        <StatItem
          leftValue="-"
          rightValue="-"
          label="Shots on target per match"
        />
        <StatItem
          leftValue="-"
          rightValue="-"
          label="Big chances created per match"
        />
        <StatItem
          leftValue="-"
          rightValue="-"
          label="Big chances missed per match"
        />
      </StatSection>

      <StatSection title="Passing">
        <StatItem leftValue="-" rightValue="-" label="Possession" />
        <StatItem
          leftValue="-"
          rightValue="-"
          label="Accurate passes per match"
        />
        <StatItem
          leftValue="-"
          rightValue="-"
          label="Accurate long balls per match"
        />
      </StatSection>

      <StatSection title="Defending">
        <StatItem leftValue="-" rightValue="-" label="Clean sheets" />
        <StatItem
          leftValue={
            teamOneStanding
              ? (
                  teamOneStanding.all.goals.against / teamOneStanding.all.played
                ).toFixed(2)
              : "N/A"
          }
          rightValue={
            teamTwoStanding
              ? (
                  teamTwoStanding.all.goals.against / teamTwoStanding.all.played
                ).toFixed(2)
              : "N/A"
          }
          label="Goals conceded per match"
        />
        <StatItem
          leftValue="-"
          rightValue="-"
          label="Interceptions per match"
        />
        <StatItem leftValue="-" rightValue="-" label="Tackles per match" />
        <StatItem leftValue="-" rightValue="-" label="Clearances per match" />
        <StatItem leftValue="-" rightValue="-" label="Penalties conceded" />
        <StatItem leftValue="-" rightValue="-" label="Saves per match" />
      </StatSection>
    </div>
  );
};
