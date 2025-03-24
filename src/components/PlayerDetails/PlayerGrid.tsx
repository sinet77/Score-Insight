import styles from "./PlayerGrid.module.scss"
import { PlayerDetails } from "../PlayerDetails/PlayerDetails"

export const PlayerGrid = ({ players, title = "Players" }) => {
  const groupedPlayers = players.reduce(
    (groups, player) => {
      const position = player.position
      if (!groups[position]) {
        groups[position] = []
      }
      groups[position].push(player)
      return groups
    },
    {} as Record<string, typeof players>,
  )

  return (
    <div className={styles["player-grid"]}>
      <h2 className={styles["grid-title"]}>{title}</h2>

      {Object.entries(groupedPlayers).map(([position, positionPlayers]) => (
        <div key={position} className={styles["position-section"]}>
          <h3 className={styles["position-title"]}>{position}</h3>
          <div className={styles["players-list"]}>
            {positionPlayers.map((player, index) => (
              <PlayerDetails key={`${player.name}-${index}`} player={player} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
