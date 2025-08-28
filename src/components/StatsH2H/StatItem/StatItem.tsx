import { ReactNode } from "react";
import styles from "./StatItem.module.scss";

type StatValue = string | number | ReactNode;

interface StatItemProps {
  leftValue: StatValue;
  rightValue: StatValue;
  label: string;
  leftClassName?: string;
  rightClassName?: string;
}

export const StatItem = ({
  leftValue,
  rightValue,
  label,
  leftClassName,
  rightClassName,
}: StatItemProps) => {
  const renderValue = (value: StatValue, className?: string) => {
    const isImage = typeof value === "string" && value.startsWith("http");
    if (isImage) {
      return <img src={value} alt="value" className={styles.image} />;
    }
    return <span className={className}>{value}</span>;
  };

  return (
    <div className={styles["stat-row"]}>
      <div className={styles["stat-value-left"]}>
        {renderValue(leftValue, leftClassName)}
      </div>
      <div className={styles["stat-label"]}>{label}</div>
      <div className={styles["stat-value-right"]}>
        {renderValue(rightValue, rightClassName)}
      </div>
    </div>
  );
};
