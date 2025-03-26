import { Player } from "./player-types";
import styles from "./PlayerDetails.module.scss";

export const PlayerDetails = ({ player }: { player: Player }) => {
  const { name, firstname, lastname, age, nationality, height, weight, injured, photo, birth } = player.player;
  const position = player.statistics?.[0]?.games?.position || "Unknown"; 
  return (
    <div className={styles["player-details"]}>
      <div className={styles["player-header"]}>
        <img src={photo || "/placeholder.png"} alt={name} className={styles["player-photo"]} />
        <div className={styles["player-info"]}>
          <h4>{name}</h4>
          <p>First Name: {firstname}</p>
          <p>Last Name: {lastname}</p>
          <p>Age: {age}</p>
          <p>Nationality: {nationality}</p>
          <p>Position: {position}</p>
          <p>Birth Date: {birth.date}</p>
          <p>Birth Place: {birth.place}</p>
          <p>Birth Country: {birth.country}</p>
          <p>Injured: {injured ? "Yes" : "No"}</p>
        </div>
      </div>
      <div className={styles["player-physical"]}>
        <p>Height: {height || "N/A"}</p>
        <p>Weight: {weight || "N/A"}</p>
      </div>
    </div>
  );
};
