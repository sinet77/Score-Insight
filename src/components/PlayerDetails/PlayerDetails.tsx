import { Player } from "./player-types";
import styles from "./PlayerDetails.module.scss";

export const PlayerDetails = ({ player }: { player: Player }) => {
    const { name, age, nationality, position, height, weight, photo } = player;
  
    return (
      <div className={styles["player-details"]}>
        <div className={styles["player-header"]}>
          <img src={photo || "/placeholder.png"} alt={name} className={styles["player-photo"]} />
          <div className={styles["player-info"]}>
            <h3>{name}</h3>
            <p>Age: {age}</p>
            <p>Nationality: {nationality}</p>
            <p>Position: {position}</p>
          </div>
        </div>
        <div className={styles["player-physical"]}>
          <p>Height: {height}</p>
          <p>Weight: {weight}</p>
        </div>
      </div>
    );
  };
  