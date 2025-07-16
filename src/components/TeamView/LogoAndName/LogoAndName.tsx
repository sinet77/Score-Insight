import type { Player } from "@components/PlayerDetails/player-types";
import { usePalette } from "color-thief-react";
import styles from "./LogoAndName.module.scss";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";

export const LogoAndName = ({ data }: { data: Player[] }) => {
  const [isFavourite, setIsFavourite] = useState(false);

  const team = data[0]?.statistics?.[0]?.team;
  const league = data[0]?.statistics?.[0]?.league;

  const { data: colors } = usePalette(
    team?.logo ?? "/placeholder.svg",
    3,
    "rgbArray",
    {
      crossOrigin: "anonymous",
    }
  );

  //always add white to the end of the gradient
  const gradientColors = colors
    ? [...colors, [255, 255, 255]]
    : [[255, 255, 255]];

  const gradient = `linear-gradient(to right, ${gradientColors
    .map((color) => `rgb(${color[0]}, ${color[1]}, ${color[2]})`)
    .join(", ")})`;

  useEffect(() => {
    if (team?.name) {
      const storedTeam = localStorage.getItem("favouriteTeam");
      if (storedTeam) {
        const parsed = JSON.parse(storedTeam);
        setIsFavourite(parsed.name === team.name);
      }
    }
  }, [team?.name]);

  useEffect(() => {
    if (team?.logo && team?.name) {
      const teamData = {
        logo: team.logo,
        name: team.name,
      };
      localStorage.setItem("selectedTeam", JSON.stringify(teamData));
    }
  }, [team?.logo, team?.name]);

  if (!team) {
    return <p>No data about the team</p>;
  }

  const toggleFavourite = () => {
    if (!team) return;
    const teamData = {
      logo: team.logo,
      name: team.name,
    };

    if (isFavourite) {
      localStorage.removeItem("favouriteTeam");
      setIsFavourite(false);
    } else {
      localStorage.setItem("favouriteTeam", JSON.stringify(teamData));
      setIsFavourite(true);
    }
  };

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
      <button
        className={`${styles["favourite-btn"]} ${
          isFavourite
            ? styles["favourite-btn--active"]
            : styles["favourite-btn--inactive"]
        }`}
        onClick={toggleFavourite}
      >
        <div className={styles["favourite-btn__text"]}>
          <Star /> {isFavourite ? "Favourite" : "Add to Favourite"}
        </div>
      </button>
    </div>
  );
};
