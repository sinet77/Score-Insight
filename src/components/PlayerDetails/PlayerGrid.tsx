import styles from "./PlayerGrid.module.scss";
import { PlayerDetails } from "../PlayerDetails/PlayerDetails";
import { Player } from "./player-types";

export const PlayerGrid = ({ players, title = "Players" }: { players: Player[]; title?: string }) => {
  console.log("Rendering PlayerGrid with players:", players);
  const groupedPlayers = players.reduce(
    (groups, player) => {
      const position = player.statistics?.[0]?.games?.position || "Unknown";
      if (!groups[position]) {
        groups[position] = [];
      }
      // Przekazywanie pełnych danych o graczu
      groups[position].push(player);
      return groups;
    },
    {} as Record<string, Player[]>
  );

  return (
    <div className={styles["player-grid"]}>
      <h2 className={styles["grid-title"]}>{title}</h2>

      {Object.entries(groupedPlayers).map(([position, positionPlayers]) => (
        <div key={position} className={styles["position-section"]}>
          <h3 className={styles["position-title"]}>{position}</h3>
          <div className={styles["players-list"]}>
            {positionPlayers.map((player, index) => (
              <PlayerDetails key={`${player.player.name}-${index}`} player={player} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
