import styles from "./FavouriteTeam.module.scss";
import { Star } from "lucide-react";
import placeholder from "../../assets/favourite-team-placeholder.png";
import { useFavouriteTeam } from "../../hooks/useFavouriteTeam";

type FavouriteTeamProps = { onClick?: () => void };

export const FavouriteTeam = ({ onClick }: FavouriteTeamProps) => {
  const { fav } = useFavouriteTeam();

  return (
    <button
      className={`${styles.main} ${fav ? styles.active : styles.empty}`}
      onClick={onClick}
    >
      <img
        src={fav?.logo || placeholder}
        alt={fav?.name || "Favourite Team"}
        className={styles.teamImage}
      />
      <p className={styles.teamName}>
        {fav?.name || "Choose your favourite team"}
      </p>
      <Star className={`${styles.starIcon} ${fav ? styles.starActive : ""}`} />
    </button>
  );
};
