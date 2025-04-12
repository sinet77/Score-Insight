import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { PlayerGrid } from "@components/PlayerDetails/PlayerGrid";
import { Player } from "@components/PlayerDetails/player-types";
import { StadiumProps } from "./Stadium/stadium-types";
import styles from "./TeamView.module.scss";
import StadiumCard from "./Stadium/StadiumCard";
import { LogoAndName } from "./LogoAndName/LogoAndName";
import { Coach } from "./Coach/Coach";
import LoadingSpinner from "@components/ui/LoadingSpinner/LoadingSpinner";
import { getPlayers } from "@api/players_api";
import { getStadium } from "@api/stadium_api";
import { Info } from "./Info/Info";
import { getFixturesForTeam } from "@api/fixturesForTeam_api";
import { FixturesResponse } from "./Matches/matches_types";
import { FixturesData } from "./Matches/Matches";
import { ClubHistory } from "@components/ClubHistory/ClubHistory";

export const TeamView = () => {
  const { teamId, season, leagueId } = useParams<{ teamId: string; season: string; leagueId: string }>();

  const [players, setPlayers] = useState<Player[]>([]);
  const [stadium, setStadium] = useState<StadiumProps | null>(null);
  const [loading, setLoading] = useState(true);

  const [fixtures, setFixtures] = useState<FixturesResponse | []>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!teamId) return;

      setLoading(true);

      try {
        const [playersRes, stadiumRes] = await Promise.all([
          getPlayers(Number(teamId), season ?? "2023"),
          getStadium(Number(teamId)),
        ]);

        const fixturesRes: FixturesResponse = await getFixturesForTeam(
          Number(teamId),
          Number(leagueId),
          season ?? "2023"
        );

        setPlayers(playersRes);
        setStadium(stadiumRes);
        setFixtures(fixturesRes);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [teamId]);

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className={styles["container"]}>
          <LogoAndName data={players} />
          <div className={styles["grid"]}>
            {teamId && <Coach teamId={Number(teamId)} season={season ?? "2023"} />}
            <div>
              <FixturesData fixtures={fixtures} />
              <Info players={players} />
            </div>
            {players.length > 0 && players[0]?.statistics?.[0]?.team?.name && (
              <ClubHistory clubName={players[0].statistics[0].team.name} />
            )}
            {stadium && <StadiumCard stadium={stadium} />}
          </div>
          <PlayerGrid players={players} />
        </div>
      )}
    </div>
  );
};
