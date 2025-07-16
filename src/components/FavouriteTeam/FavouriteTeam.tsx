import styles from "./FavouriteTeam.module.scss";
import { Star } from "lucide-react";
import placeholder from "../../assets/favourite-team-placeholder.png";
import { useEffect, useState } from "react";

export const FavouriteTeam = () => {
  const [logo, setLogo] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const storedTeam = localStorage.getItem("favouriteTeam");
    if (storedTeam) {
      try {
        const parsed = JSON.parse(storedTeam);
        setLogo(parsed.logo);
        setName(parsed.name);
      } catch (error) {
        console.error("Error with getting favouriteTeam from localStorage:", error);
      }
    }
  }, []);

  return (
    <div className={styles["main"]}>
      <img
        src={logo || placeholder}
        alt={name || "Favourite Team"}
        className={styles["team-image"]}
      />
      <Star   className={`${styles["star-icon"]} ${logo ? styles["star-active"] : ""}`} />
      {name && <p className={styles["team-name"]}>{name}</p>}
    </div>
  );
};
