import styles from "./ComparePlayers.module.scss";
import PlayerIcon from "../../../assets/football-player_h2h.svg?react";

export const ComparePlayers = () => {
  return (
    <div className={styles["container"]}>
      <div className={styles["header"]}>
        <h1>Compare Players</h1>
        <PlayerIcon className={styles.icon} />
      </div>
    </div>
  );
};
