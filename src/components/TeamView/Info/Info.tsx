import type { Player } from "@components/PlayerDetails/player-types";
import { Users, Clock, Globe, Flag } from "lucide-react";
import styles from "./Info.module.scss";

export const Info = ({ players }: { players: Player[] }) => {
  const averageAge =
    players.length > 0
      ? players.reduce((sum, player) => sum + player.player.age, 0) /
        players.length
      : null;

  const leagueCountry =
    players.length > 0
      ? players[0].statistics?.[0]?.league?.country ?? null
      : null;

  const domesticPlayers = players.filter(
    (player) => player.player.nationality === leagueCountry
  ).length;

  const foreignPlayers = players.length - domesticPlayers;

  const allPlayers = players.length;

  const domesticPercentage =  
    allPlayers > 0 ? Math.round((domesticPlayers / allPlayers) * 100) : 0;  
  const foreignPercentage =  
    allPlayers > 0 ? Math.round((foreignPlayers / allPlayers) * 100) : 0;  

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.icon}>
            <Users size={24} color="#888" />
          </div>
          <div className={styles.value}>{allPlayers}</div>
          <div className={styles.label}>Number of players</div>
        </div>

        <div className={styles.card}>
          <div className={styles.icon}>
            <Clock size={24} color="#888" />
          </div>
          <div className={styles.value}>
            {averageAge !== null ? averageAge.toFixed(1) : "-"} yrs
          </div>
          <div className={styles.label}>Average age of player</div>
        </div>

        <div className={styles.card}>
          <div className={styles.progressContainer}>
            <svg className={styles.progressCircle} viewBox="0 0 36 36">
              <path
                className={styles.progressBg}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={styles.progressBar}
                strokeDasharray={`${foreignPercentage}, 100`}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className={styles.progressContent}>
              <div className={styles.value}>{foreignPlayers}</div>
              <Globe size={16} className={styles.infoIcon} />
            </div>
          </div>
          <div className={styles.label}>Foreigners</div>
        </div>

        <div className={styles.card}>
          <div className={styles.progressContainer}>
            <svg className={styles.progressCircle} viewBox="0 0 36 36">
              <path
                className={styles.progressBg}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={styles.progressBar}
                strokeDasharray={`${domesticPercentage}, 100`}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className={styles.progressContent}>
              <div className={styles.value}>{domesticPlayers}</div>
              <Flag size={16} className={styles.infoIcon} />
            </div>
          </div>
          <div className={styles.label}>Domestic players</div>
        </div>
      </div>
    </div>
  );
};
