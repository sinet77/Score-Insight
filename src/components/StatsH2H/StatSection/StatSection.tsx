import styles from "./StatSection.module.scss";

export const StatSection: React.FC<{ title: string; children: React.ReactNode }> = ({
    title,
    children,
  }) => (
    <div className={styles["stat-section"]}>
      <h3 className={styles["section-title"]}>{title}</h3>
      {children}
    </div>
  );