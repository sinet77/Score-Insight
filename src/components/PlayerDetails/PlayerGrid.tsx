import styles from "./PlayerGrid.module.scss";
import { PlayerDetails } from "../PlayerDetails/PlayerDetails";
import { Player } from "./player-types";

export const PlayerGrid = ({ players }: { players: Player[] }) => {
  const positionOrder = ["Attacker", "Midfielder", "Defender", "Goalkeeper"];

  const groupedPlayers = players.reduce((groups, player) => {
    const position = player.statistics?.[0]?.games?.position || "Unknown";
    if (!groups[position]) {
      groups[position] = [];
    }
    groups[position].push(player);
    return groups;
  }, {} as Record<string, Player[]>);

  return (
    <div className={styles["player-grid"]}>
      {positionOrder
        .filter((position) => groupedPlayers[position])
        .map((position) => (
          <div key={position} className={styles["position-section"]}>
            <h3 className={`${styles["position-title"]} ${styles[position.toLowerCase()]}`}>{position}</h3>
            <div className={styles["players-list"]}>
              {groupedPlayers[position].map((player, index) => (
                <PlayerDetails
                  key={`${player.player.name}-${index}`}
                  player={player}
                  position={position}
                />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};
