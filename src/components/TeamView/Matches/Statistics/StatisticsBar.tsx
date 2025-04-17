import styles from "./Statistics.module.scss";
import { StatisticsBarProps } from "./stats-types";

const StatisticsBar = ({ label, team1Value, team2Value }: StatisticsBarProps) => {
  const total = team1Value + team2Value;
  const team1Percent = total === 0 ? 0 : (team1Value / total) * 100;
  const team2Percent = total === 0 ? 0 : (team2Value / total) * 100;

  const formatLabel = (label: string) => {
    if (label === "expected_goals") return "Expected goals";
    if (label === "Passes %") return "Passes";
    return label;
  };

  const formatValue = (label: string, value: number) => {
    if (label === "Passes %") return `${value}%`;
    if (label === "Ball Possession") return `${value}%`;
    return value;
  };

  const isBallPossession = label === "Ball Possession";

  return (
    <div className={styles["stat-row"]}>
      <div className={styles["stat-row__values"]}>
        <span className={`${styles["stat-row__value"]} ${isBallPossession ? styles["stat-row__values--big"] : ""}`}>
          {formatValue(label, team1Value)}
        </span>
        <span className={styles["stat-row__label"]}>{formatLabel(label)}</span>
        <span className={`${styles["stat-row__value"]} ${isBallPossession ? styles["stat-row__values--big"] : ""}`}>
          {formatValue(label, team2Value)}
        </span>
      </div>
      <div
        className={`${styles["stat-row__bar-container"]} ${isBallPossession ? styles["stat-row__bar-container--thick"] : ""}`}
      >
        <div
          className={`${styles["stat-row__bar"]} ${styles["stat-row__bar--team1"]}`}
          style={{ width: `${team1Percent}%` }}
        />
        <div
          className={`${styles["stat-row__bar"]} ${styles["stat-row__bar--team2"]}`}
          style={{ width: `${team2Percent}%` }}
        />
      </div>
    </div>
  );
};

export default StatisticsBar;
