import { useEffect, useState } from "react";
import {
  countryOptions,
  seasonOptions,
  getLeagueOptions,
  getTeamOptions,
  fetchLeaguesByCountry,
  fetchStandings,
  resetSelectionState,
  League,
} from "../utils/h2hSelectionHelpers";
import { TeamStanding } from "@components/Teams/standings-types";

export function useH2HSelection() {
  const [leftSide, setLeftSide] = useState({
    country: "",
    league: "",
    leagueId: 0,
    team: "",
    season: "2023",
  });
  const [rightSide, setRightSide] = useState({
    country: "",
    league: "",
    leagueId: 0,
    team: "",
    season: "2023",
  });

  const [leagues1, setLeagues1] = useState<League[]>([]);
  const [leagues2, setLeagues2] = useState<League[]>([]);
  const [teams1, setTeams1] = useState<TeamStanding[]>([]);
  const [teams2, setTeams2] = useState<TeamStanding[]>([]);

  const leagueOptions1 = getLeagueOptions(leagues1, leftSide.country);
  const leagueOptions2 = getLeagueOptions(leagues2, rightSide.country);
  const teamOptions1 = getTeamOptions(teams1);
  const teamOptions2 = getTeamOptions(teams2);

  useEffect(() => {
    if (leftSide.country) fetchLeaguesByCountry(leftSide.country, setLeagues1);
    if (rightSide.country)
      fetchLeaguesByCountry(rightSide.country, setLeagues2);
  }, [leftSide.country, rightSide.country]);

  useEffect(() => {
    fetchStandings(
      leagues1,
      leftSide.league,
      leftSide.season,
      (id) => setLeftSide((prev) => ({ ...prev, leagueId: id })),
      setTeams1
    );
  }, [leftSide.league, leftSide.season, leagues1]);

  useEffect(() => {
    fetchStandings(
      leagues2,
      rightSide.league,
      rightSide.season,
      (id) => setRightSide((prev) => ({ ...prev, leagueId: id })),
      setTeams2
    );
  }, [rightSide.league, rightSide.season, leagues2]);

  const resetTeamSelection = (side: "left" | "right", fullReset = false) => {
    if (side === "left") {
      setLeftSide((prev) => ({
        ...resetSelectionState(prev, fullReset),
        leagueId: 0,
      }));
      setTeams1([]);
    } else {
      setRightSide((prev) => ({
        ...resetSelectionState(prev, fullReset),
        leagueId: 0,
      }));
      setTeams2([]);
    }
  };

  const handleSeasonChange = (
    selected: { value: number; label: string } | null,
    side: "left" | "right"
  ) => {
    if (!selected) return;
    const setter = side === "left" ? setLeftSide : setRightSide;
    setter((prev) => ({ ...prev, season: selected.value.toString() }));
  };

  return {
    countryOptions,
    seasonOptions,
    leftSide,
    rightSide,
    setLeftSide,
    setRightSide,
    leagueOptions1,
    leagueOptions2,
    teamOptions1,
    teamOptions2,
    resetTeamSelection,
    handleSeasonChange,
    teams1,
    teams2
  };
}
