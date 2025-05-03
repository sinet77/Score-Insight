import styles from "./StatItem.module.scss";

interface StatItemProps {
  leftValue: string | number;
  rightValue: string | number;
  label: string;
}

export const StatItem = ({ leftValue, rightValue, label }: StatItemProps) => (
  <div className={styles["stat-row"]}>
    <div className={styles["stat-value"]}>{leftValue}</div>
    <div className={styles["stat-label"]}>{label}</div>
    <div className={styles["stat-value"]}>{rightValue}</div>
  </div>
);
