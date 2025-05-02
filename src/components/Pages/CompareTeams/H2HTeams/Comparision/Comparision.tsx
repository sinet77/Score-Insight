import { useEffect, useState } from "react";
import { leagueTeamsApi } from "@api/leagueTeams-api";
import { StatsData } from "./StatsData/StatsData";
import LoadingSpinner from "@components/ui/LoadingSpinner/LoadingSpinner";
import {
  LeagueStanding,
  TeamStanding,
} from "@components/Teams/standings-types";

type Props = {
  teamOneName: string;
  teamTwoName: string;
  leagueOneId: number;
  leagueTwoId: number;
  seasonOne: string;
  seasonTwo: string;
};

export const Comparision = ({
  teamOneName,
  teamTwoName,
  leagueOneId,
  leagueTwoId,
  seasonOne,
  seasonTwo,
}: Props) => {
  const [loading, setLoading] = useState(true);

  const [standingsOne, setStandingsOne] = useState<TeamStanding[]>([]);
  const [standingsTwo, setStandingsTwo] = useState<TeamStanding[]>([]);

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

        const [dataOne, dataTwo] = await Promise.all([
          leagueTeamsApi.get(leagueOneId, seasonOne),
          leagueTeamsApi.get(leagueTwoId, seasonTwo),
        ]);

        if (dataOne?.response.length > 0) {
          const leagueStandingOne: LeagueStanding = dataOne.response[0];
          setStandingsOne(leagueStandingOne.league.standings[0]);
        }

        if (dataTwo?.response.length > 0) {
          const leagueStandingTwo: LeagueStanding = dataTwo.response[0];
          setStandingsTwo(leagueStandingTwo.league.standings[0]);
        }

      } catch (error) {
        console.error("Error fetching one or both standings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, [leagueOneId, leagueTwoId, seasonOne, seasonTwo]);

  useEffect(() => {
    if (standingsOne.length > 0) {
      const foundTeam = standingsOne.find(
        (team) => team.team.name.toLowerCase() === teamOneName.toLowerCase()
      );
      setTeamOneStanding(foundTeam ?? null);
    }
  }, [teamOneName, standingsOne]);

  useEffect(() => {
    if (standingsTwo.length > 0) {
      const foundTeam = standingsTwo.find(
        (team) => team.team.name.toLowerCase() === teamTwoName.toLowerCase()
      );
      setTeamTwoStanding(foundTeam ?? null);
    }
  }, [teamTwoName, standingsTwo]);

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
