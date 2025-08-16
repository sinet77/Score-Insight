import styles from "./FavouriteTeam.module.scss";
import { Star } from "lucide-react";
import placeholder from "../../assets/favourite-team-placeholder.png";
import { useFavouriteTeam } from "../../hooks/useFavouriteTeam";

type FavouriteTeamProps = { onClick: () => void };

export const FavouriteTeam = ({ onClick }: FavouriteTeamProps) => {
  const { fav } = useFavouriteTeam();

  return (
    <div className={styles["main"]} onClick={onClick}>
      <img
        src={fav?.logo || placeholder}
        alt={fav?.name || "Favourite Team"}
        className={styles["team-image"]}
      />
      <Star
        className={`${styles["star-icon"]} ${fav ? styles["star-active"] : ""}`}
      />
      {fav?.name && <p className={styles["team-name"]}>{fav.name}</p>}
    </div>
  );
};
