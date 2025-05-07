import type { Player } from "./player-types";
import styles from "./PlayerDetails.module.scss";
import countries from "../../data/countriesData.json";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";

export const PlayerDetails = ({
    player,
    position,
}: {
    player: Player;
    position: string;
}) => {
    const { name, nationality, photo } = player.player;
    const positionLetter = position.charAt(0).toUpperCase();

    const normalize = (str: string) =>
        str
            .toLowerCase()
            .replace(/[-\s']/g, "")
            .slice(0, 5);

    const normalized = normalize(nationality);

    const country = countries.response.find(
        (c) => normalize(c.name) === normalized
    );

    const flag = country?.flag ?? "/placeholder.png";

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(
            routes.player
                .replace(":playerName", encodeURIComponent(name))
                .replace(":playerId", String(player.player.id))
        );
    };

    return (
        <div className={styles["player-card"]} onClick={handleClick}>
            <img
                src={photo || "/placeholder.png"}
                alt={name}
                className={styles["player-image"]}
            />
            <h3 className={styles["player-name"]}>{name}</h3>
            <div className={styles["player-details"]}>
                <span
                    className={`${styles["position-letter"]} ${
                        styles[position.toLowerCase()]
                    }`}
                >
                    {positionLetter}
                </span>
                <div className={styles["country-info"]}>
                    {flag && (
                        <img
                            src={flag}
                            alt={`Flag of ${nationality}`}
                            className={styles["country-flag"]}
                        />
                    )}
                    <span className={styles["country-code"]}>
                        {nationality.substring(0, 3).toUpperCase()}
                    </span>
                </div>
            </div>
        </div>
    );
};
