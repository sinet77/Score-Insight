import styles from "./StatItem.module.scss";

interface StatItemProps {
  leftValue: string | number;
  rightValue: string | number;
  label: string;
}

export const StatItem = ({ leftValue, rightValue, label }: StatItemProps) => {
  const renderValue = (value: string | number) => {
    const isImage = typeof value === "string" && value.startsWith("http");
    return isImage ? (
      <img src={value} alt="value" className={styles["image"]} />
    ) : (
      value
    );
  };

  return (
    <div className={styles["stat-row"]}>
      <div className={styles["stat-value-left"]}>{renderValue(leftValue)}</div>
      <div className={styles["stat-label"]}>{label}</div>
      <div className={styles["stat-value-right"]}>{renderValue(rightValue)}</div>
    </div>
  );
};
