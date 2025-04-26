import { useEffect, useState } from "react";
import { leagueTeamsApi } from "@api/leagueTeams-api";
import styles from "./Comparision.module.scss";
import { Stats } from "fs";
import {StatsData} from "./StatsData/StatsData";
import LoadingSpinner from "@components/ui/LoadingSpinner/LoadingSpinner";

export const Comparision = () => {
  const [loading, setLoading] = useState(true);
  const [standings, setStandings] = useState<TeamStanding[]>([]);

  const [teamOneName, setTeamOneName] = useState("Manchester City");
  const [teamTwoName, setTeamTwoName] = useState("Arsenal");

  const [teamOneStanding, setTeamOneStanding] = useState<TeamStanding | null>(
    null
  );
  const [teamTwoStanding, setTeamTwoStanding] = useState<TeamStanding | null>(
    null
  );

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        setLoading(true);
        const data = await leagueTeamsApi.get(39, "2023");

        if (data && data.response.length > 0) {
          const leagueStanding: LeagueStanding = data.response[0];
          setStandings(leagueStanding.league.standings[0]);
        }
      } catch (error) {
        console.error("Error fetching standings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, []);

  useEffect(() => {
    if (standings.length > 0) {
      const foundTeam = standings.find(
        (team) => team.team.name === teamOneName
      );
      setTeamOneStanding(foundTeam ?? null);
    }
  }, [teamOneName, standings]);

  useEffect(() => {
    if (standings.length > 0) {
      const foundTeam = standings.find(
        (team) => team.team.name === teamTwoName
      );
      setTeamTwoStanding(foundTeam ?? null);
    }
  }, [teamTwoName, standings]);

  return (
<>
    <div className={styles.comparision}>
      {loading && <LoadingSpinner />}
      {!loading && (
          <div>
          <div>
            <h2>Team 1: {teamOneStanding?.team.name}</h2>
            <p>Points: {teamOneStanding?.points}</p>
          </div>
          <div>
            <h2>Team 2: {teamTwoStanding?.team.name}</h2>
            <p>Points: {teamTwoStanding?.points}</p>
          </div>
        </div>
      )}
    </div>
    <StatsData />
      </>
  );
};
