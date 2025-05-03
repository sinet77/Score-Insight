import styles from "./StatsData.module.scss";
import { TeamStanding } from "@components/Teams/standings-types";
import { StatItem } from "../StatItem/StatItem";
import { StatSection } from "../StatSection/StatSection";

type StatsDataProps = {
  teamOneStanding: TeamStanding | null;
  teamTwoStanding: TeamStanding | null;
};

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
  score += (goalDiff / played) * 2;
  score += (wins / played) * 3;
  //penalties
  score -= (losses / played) * 1;
  score -= (draws / played) * 0.5;

  const finalScore = Math.min(Math.max(score, 1), 10);

  return finalScore.toFixed(2);
};

const goalsStatPerMatch = (
  team: TeamStanding | null,
  type: "for" | "against"
) => {
  if (!team) return "N/A";

  const played = team.all.played;
  const goals = team.all.goals[type];

  if (played === 0 || goals === 0) return "0.00";

  return (goals / played).toFixed(2);
};

const resultAndPercent = (
  team: TeamStanding | null,
  result: "win" | "draw" | "lose",
  where: "all" | "home" | "away"
) => {
  if (!team) return "N/A";
  const played = team[where].played;
  const score = team[where][result];

  if (played === 0) return "0.00";

  const outcome = ((score / played) * 100).toFixed(1) + "%";
  return `${score} / ${outcome}`;
};

const getScoreClass = (score: number) => {
  if (score >= 7) return styles.green;
  if (score >= 4) return styles.orange;
  return styles.red;
};

export const StatsData = ({
  teamOneStanding,
  teamTwoStanding,
}: StatsDataProps) => {
  return (
    <div className={styles["stats-container"]}>
      <div className={styles["stats-header"]}>
        <div
          className={`${styles["rating-box"]} ${
            teamOneStanding
              ? getScoreClass(Number(calculateAverageScore(teamOneStanding)))
              : ""
          }`}
        >
          {teamOneStanding ? calculateAverageScore(teamOneStanding) : "N/A"}
        </div>
        <div className={styles["rating-label"]}>
          Average Score Insight Rating
        </div>

        <div
          className={`${styles["rating-box"]} ${
            teamTwoStanding
              ? getScoreClass(Number(calculateAverageScore(teamTwoStanding)))
              : ""
          }`}
        >
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
          leftValue={teamOneStanding?.points ?? "N/A"}
          rightValue={teamTwoStanding?.points ?? "N/A"}
          label="Points"
        />
        <StatItem
          leftValue={resultAndPercent(teamOneStanding, "win", "all")}
          rightValue={resultAndPercent(teamTwoStanding, "win", "all")}
          label="Wins / % of matches won"
        />
        <StatItem
          leftValue={resultAndPercent(teamOneStanding, "draw", "all")}
          rightValue={resultAndPercent(teamTwoStanding, "draw", "all")}
          label="Draws / % of matches drawn"
        />

        <StatItem
          leftValue={resultAndPercent(teamOneStanding, "lose", "all")}
          rightValue={resultAndPercent(teamTwoStanding, "lose", "all")}
          label="Losses / % of matches lost"
        />
      </StatSection>

      <StatSection title="Home">
        <StatItem
          leftValue={teamOneStanding?.home?.played ?? "N/A"}
          rightValue={teamTwoStanding?.home?.played ?? "N/A"}
          label="Matches at home"
        />
        <StatItem
          leftValue={resultAndPercent(teamOneStanding, "win", "home")}
          rightValue={resultAndPercent(teamTwoStanding, "win", "home")}
          label="Wins / % of home matches won"
        />
        <StatItem
          leftValue={resultAndPercent(teamOneStanding, "draw", "home")}
          rightValue={resultAndPercent(teamTwoStanding, "draw", "home")}
          label="Draws / % of home matches drawn"
        />
        <StatItem
          leftValue={resultAndPercent(teamOneStanding, "lose", "home")}
          rightValue={resultAndPercent(teamTwoStanding, "lose", "home")}
          label="Losses / % of home matches lost"
        />
      </StatSection>

      <StatSection title="Away">
        <StatItem
          leftValue={teamOneStanding?.away?.played ?? "N/A"}
          rightValue={teamTwoStanding?.away?.played ?? "N/A"}
          label="Matches away"
        />
        <StatItem
          leftValue={resultAndPercent(teamOneStanding, "win", "away")}
          rightValue={resultAndPercent(teamTwoStanding, "win", "away")}
          label="Wins / % of away matches won"
        />
        <StatItem
          leftValue={resultAndPercent(teamOneStanding, "draw", "away")}
          rightValue={resultAndPercent(teamTwoStanding, "draw", "away")}
          label="Draws / % of away matches drawn"
        />
        <StatItem
          leftValue={resultAndPercent(teamOneStanding, "lose", "away")}
          rightValue={resultAndPercent(teamTwoStanding, "lose", "away")}
          label="Losses / % of away matches lost"
        />
      </StatSection>

      <StatSection title="Attacking">
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
        <StatItem
          leftValue={teamOneStanding?.goalsDiff ?? "N/A"}
          rightValue={teamTwoStanding?.goalsDiff ?? "N/A"}
          label="Goals difference"
        />
        <StatItem
          leftValue={goalsStatPerMatch(teamOneStanding, "for")}
          rightValue={goalsStatPerMatch(teamTwoStanding, "for")}
          label="Goals per match"
        />
        <StatItem
          leftValue={goalsStatPerMatch(teamOneStanding, "against")}
          rightValue={goalsStatPerMatch(teamTwoStanding, "against")}
          label="Goals conceded per match"
        />
      </StatSection>
    </div>
  );
};
