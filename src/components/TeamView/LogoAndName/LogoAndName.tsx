import type { Player } from "@components/PlayerDetails/player-types";
import { usePalette } from "color-thief-react";
import styles from "./LogoAndName.module.scss";

export const LogoAndName = ({ data }: { data: Player[] }) => {
  const team = data[0]?.statistics?.[0]?.team;
  const league = data[0]?.statistics?.[0]?.league;

  const { data: colors } = usePalette(team?.logo ?? "/placeholder.svg", 3, "rgbArray", {
    crossOrigin: "anonymous",
  });

  //always add white to the end of the gradient
  const gradientColors = colors ? [...colors, [255, 255, 255]] : [[255, 255, 255]];

  const gradient = `linear-gradient(to right, ${gradientColors.map(
    (color) => `rgb(${color[0]}, ${color[1]}, ${color[2]})`
  ).join(", ")})`;

  if (!team) {
    return <p>No data about the team</p>;
  }

  return (
    <div className={styles["team-card"]} style={{ background: gradient }}>
      <div className={styles["team-logo-container"]}>
        <img
          src={team.logo || "/placeholder.svg"}
          alt={`${team.name} Logo`}
          className={styles["team-logo"]}
          crossOrigin="anonymous"
        />
      </div>
      <div className={styles["team-info"]}>
        <h1 className={styles["team-name"]}>{team.name}</h1>
        <div className={styles["country-info"]}>
          {league?.flag && (
            <img
              src={league.flag || "/placeholder.svg"}
              alt={`${league.country} Flag`}
              className={styles["country-flag"]}
            />
          )}
          <h2 className={styles["country-name"]}>{league?.country}</h2>
        </div>
      </div>
    </div>
  );
};
