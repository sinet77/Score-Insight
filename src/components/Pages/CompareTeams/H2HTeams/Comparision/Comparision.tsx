import { useEffect, useState } from "react";
import { leagueTeamsApi } from "@api/leagueTeams-api";
import { StatsData } from "./StatsData/StatsData";
import LoadingSpinner from "@components/ui/LoadingSpinner/LoadingSpinner";
import {
  LeagueStanding,
  TeamStanding,
} from "@components/Teams/standings-types";

export const Comparision = ({ teamOneName, teamTwoName, leagueOneId, leagueTwoId, seasonOne, seasonTwo }) => {
  const [loading, setLoading] = useState(true);
  const [standings, setStandings] = useState<TeamStanding[]>([]);

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
    console.log(standings);
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

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>

        <StatsData
          teamOneStanding={teamOneStanding}
          teamTwoStanding={teamTwoStanding}
        />
    
    </>
  );
};
