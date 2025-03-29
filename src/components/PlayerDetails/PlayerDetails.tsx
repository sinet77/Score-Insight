import type { Player } from "./player-types"
import styles from "./PlayerDetails.module.scss"

export const PlayerDetails = ({ player, position }: { player: Player, position: string }) => {
  const { name, nationality, photo } = player.player
  const positionLetter = position.charAt(0).toUpperCase()

  return (
    <div className={styles["player-card"]}>
        <img src={photo || "/placeholder.png"} alt={name} className={styles["player-image"]} />
        <h3 className={styles["player-name"]}>{name}</h3>
        <div className={styles["player-details"]}>
        <span className={`${styles["position-letter"]} ${styles[position.toLowerCase()]}`}>{positionLetter}</span>
          <div className={styles["country-info"]}>
            <span className={styles["country-flag"]}></span>
            <span className={styles["country-code"]}>{nationality}</span>
          </div>
        </div>
    </div>
  )
}
