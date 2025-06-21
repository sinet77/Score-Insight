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
import { Fixture } from "./Matches/matches_types";
import { MatchData } from "./Matches/Matches";
import {TeamSelection} from "@components/Pages/CompareTeams/H2HTeams/H2HTeams";
import { getAllStatsForTeam } from "@api/teamAllStats_api";

export const TeamView = () => {
  const { teamId, season, leagueId } = useParams<{
    teamId: string;
    season: string;
    leagueId: string;
  }>();

  const [players, setPlayers] = useState<Player[]>([]);
  const [stadium, setStadium] = useState<StadiumProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [fixtures, setFixtures] = useState<Fixture[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      if (!teamId) return;
      const response = await getAllStatsForTeam(
        Number(teamId), 2023, leagueId ?? "");

      console.log("All stats for team:", response);
    };

    fetchStats();
  },[])

  useEffect(() => {
    const fetchData = async () => {
      if (!teamId) return;

      setLoading(true);

      try {
        const [playersRes, stadiumRes] = await Promise.all([
          getPlayers(Number(teamId), season ?? "2023"),
          getStadium(Number(teamId)),
        ]);

        const fixturesRes = await getFixturesForTeam(
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
  }, [teamId, season, leagueId]);

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className={styles["container"]}>
          <LogoAndName data={players} />
          <div className={styles["grid"]}>
            <div className={styles["left"]}>
              {teamId && (
                <Coach teamId={Number(teamId)} season={season ?? "2023"} />
              )}
              <Info players={players} />
            </div>
            <div className={styles["right"]}>
              {fixtures.length > 0 && <MatchData fixtures={fixtures} />}

              {stadium && <StadiumCard stadium={stadium} />}
            </div>
          </div>

          <PlayerGrid players={players} />
          <TeamSelection />
        </div>
      )}
    </div>
  );
};
