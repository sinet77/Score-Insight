import { countriesApi } from "@api/countries-api";
import { leagueTeamsApi } from "../api/leagueTeams-api";
import countryData from "../data/countriesData.json";
import { TeamStanding } from "@components/Teams/standings-types";

export interface League {
  league: {
    id: number;
    name: string;
    logo: string;
  };
  country?: {
    name: string;
  };
}

export const seasonOptions = [
  { value: 2021, label: "2021" },
  { value: 2022, label: "2022" },
  { value: 2023, label: "2023" },
];

export const countryOptions = countryData.response.map((c) => ({
  label: c.name,
  value: Number(c.code) || 0,
  image: c.flag ?? "",
}));

export const getLeagueOptions = (leagues: League[], country: string) =>
  leagues
    .filter((item) => item.country?.name === country)
    .map((item) => ({
      label: item.league.name,
      value: item.league.id,
      image: item.league.logo,
    }));

export const getTeamOptions = (teams: TeamStanding[]) =>
  teams.map((item) => ({
    label: item.team.name,
    value: item.team.id,
    image: item.team.logo,
  }));

export const fetchLeaguesByCountry = async (
  countryName: string,
  setter: (leagues: League[]) => void
) => {
  try {
    const data = await countriesApi.get();
    if (!data) return;

    const leaguesForCountry = data.response.filter(
      (league: League) => league.country?.name === countryName
    );
    setter(leaguesForCountry);
  } catch (error) {
    console.error("Error fetching leagues:", error);
  }
};

export const fetchStandings = async (
  leagues: League[],
  selectedLeagueName: string,
  season: string,
  setLeagueId: (id: number) => void,
  setTeams: (teams: TeamStanding[]) => void
) => {
  const selectedLeague = leagues.find(
    (league) => league.league.name === selectedLeagueName
  );
  const selectedLeagueId = selectedLeague?.league.id;

  if (!selectedLeagueId) return;

  setLeagueId(selectedLeagueId);

  try {
    const data = await leagueTeamsApi.get(selectedLeagueId, season);
    const teamsList = data.response?.[0]?.league?.standings?.[0] || [];
    setTeams(teamsList);
  } catch (error) {
    console.error("Error fetching standings:", error);
  }
};

export const resetSelectionState = (
  prev: {
    country: string;
    league: string;
    team: string;
    season: string;
  },
  fullReset = false
) => ({
  ...prev,
  country: fullReset ? "" : prev.country,
  league: "",
  team: "",
  season: "2023",
});
