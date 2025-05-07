import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import allPlayers from "../../data/playersLiverpool2023.json";
import { Player } from "@components/PlayerDetails/player-types";
import styles from "./PlayerProfileView.module.scss";
import LoadingSpinner from "@components/ui/LoadingSpinner/LoadingSpinner";

export const PlayerProfileView = () => {
    const { playerId } = useParams<{ playerId: string }>();
    const [player, setPlayer] = useState<Player | null>(null);
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        if (!playerId) return;

        const found = allPlayers.response.find(
            (p) => p.player.id === Number(playerId)
        );

        setPlayer(found ?? null);
    }, [playerId]);

    if (!player) return <LoadingSpinner />;

    const { name, photo, nationality, age, birth, height, weight } =
        player.player;

    return (
        <div className={styles["player-container"]}>
            <div className={styles["main-info-container"]}>
                <div className={styles["photo-section"]}>
                    <img
                        src={photo}
                        alt={name}
                        className={styles["player-photo"]}
                    />
                    <h1>{name}</h1>
                </div>

                <div className={styles["bio"]}>
                    <p>
                        <strong>Age:</strong> {age}
                    </p>
                    <p>
                        <strong>Nationality:</strong> {nationality}
                    </p>
                    <p>
                        <strong>Place of birth:</strong> {birth.place},{" "}
                        {birth.country}
                    </p>
                    <p>
                        <strong>Height:</strong> {height}
                    </p>
                    <p>
                        <strong>Weight:</strong> {weight}
                    </p>
                </div>
            </div>

            <div className={styles["stats-section"]}>
                <h2>Season statistics</h2>
                {player?.statistics.map((stat) => (
                    <div
                        key={player.player.id}
                        className={styles["league-stats"]}
                    >
                        <h3>
                            {stat.league.name} ({stat.league.season})
                        </h3>
                        <p>Appearances: {stat.games.appearences}</p>
                        <p>Goals: {stat.goals.total}</p>
                        <p>Assists: {stat.goals.assists ?? 0}</p>
                        <p>Minutes played: {stat.games.minutes}</p>
                        <p>Rating: {stat.games.rating ?? "N/A"}</p>
                    </div>
                ))}
            </div>

            <button className={styles["back-button"]} onClick={handleBack}>
                Back to team
            </button>
        </div>
    );
};
