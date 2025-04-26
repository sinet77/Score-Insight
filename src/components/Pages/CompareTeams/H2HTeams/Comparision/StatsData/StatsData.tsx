import type React from "react"
import styles from "./StatsData.module.scss"

interface StatItemProps {
  value: string | number
  label: string
}

const StatItem: React.FC<StatItemProps> = ({ value, label }) => (
  <div className={styles["stat-row"]}>
    <div className={styles["stat-value"]}>{value}</div>
    <div className={styles["stat-label"]}>{label}</div>
    <div className={styles["stat-comparison"]}>-</div>
  </div>
)

const StatSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className={styles["stat-section"]}>
    <h3 className={styles["section-title"]}>{title}</h3>
    {children}
  </div>
)

export const StatsData = () => {
  return (
    <div className={styles["stats-container"]}>
      <div className={styles["stats-header"]}>
        <div className={styles["rating-container"]}>
          <div className={styles["rating-box"]}>7.10</div>
          <div className={styles["rating-label"]}>Średnia ocena Score Insight</div>
        </div>
        <div className={styles["comparison-label"]}>-</div>
      </div>

      <StatSection title="Ogólne">
        <StatItem value="33" label="Matches" />
        <StatItem value="75" label="Gole strzelone" />
        <StatItem value="31" label="Wpuszczone bramki" />
        <StatItem value="56" label="Asysty" />
      </StatSection>

      <StatSection title="Atakowanie">
        <StatItem value="2.3" label="Bramek na mecz" />
        <StatItem value="6.3" label="Strzały celne na mecz" />
        <StatItem value="4.1" label="Stworzone dogodne okazje na mecz" />
        <StatItem value="2.5" label="Zmarnowane dogodne okazje na mecz" />
      </StatSection>

      <StatSection title="Podania">
        <StatItem value="58%" label="Posiadanie piłki" />
        <StatItem value="457.0 (86.2%)" label="Podania celne na mecz" />
        <StatItem value="19.5 (51.8%)" label="Celność długich podań na mecz" />
      </StatSection>

      <StatSection title="Obrona">
        <StatItem value="14" label="Czyste konto" />
        <StatItem value="0.9" label="Wpuszczone bramki na mecz" />
        <StatItem value="8.0" label="Przechwyty na mecz" />
        <StatItem value="17.3" label="Wślizgi na mecz" />
        <StatItem value="18.4" label="Interwencje na mecz" />
        <StatItem value="0" label="Przyznane bramki z rzutu karnego" />
        <StatItem value="2.5" label="Obrony na mecz" />
      </StatSection>
    </div>
  )
}

