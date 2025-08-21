import { TeamSelection } from "./H2HTeams/H2HTeams";
import styles from "./CompareTeams.module.scss";
import { GitCompareArrows } from "lucide-react";

export const CompareTeams = () => {
  return (
    <div className={styles["container"]}>
      <div className={styles["header"]}>
        <h1>Compare Teams</h1>
        <GitCompareArrows size={50} />
      </div>
      <TeamSelection />
    </div>
  );
};
