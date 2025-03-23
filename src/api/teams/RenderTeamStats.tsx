import styles from "./LeagueTeams.module.scss";
import { RenderTeamStatsProps } from "./standings-types";

export const RenderTeamStats = ({ side, team }:RenderTeamStatsProps) => {
    const stats = side === 'home' ? team.home : team.away;

  return (
    <div className={styles['team-stats-section']}>
      <h4>{side.charAt(0).toUpperCase() + side.slice(1)}</h4>
      <div className={styles['team-stats-grid']}>
        {Object.entries(stats).map(([key, value]) => {
          if (key === 'goals') {
            const { for: goalsFor, against: goalsAgainst } = value as { for: number, against: number };
            return (
              <div key={key} className={styles['team-stat-item']}>
                <span className={styles['team-stat-item__stat-label']}>Goals</span>
                <span className={styles['team-stat-item__stat-value']}>
                {goalsFor}:{goalsAgainst}
                </span>
              </div>
            );
          }
          return (
            <div key={key} className={styles['team-stat-item']}>
              <span className={styles['team-stat-item__stat-label']}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </span>
              <span className={styles['team-stat-item__stat-value']}>{value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
