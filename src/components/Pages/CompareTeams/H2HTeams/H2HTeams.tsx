import { useEffect, useState } from "react";
import styles from "./H2HTeams.module.scss";
import { Flag, Shield, ShieldUser } from "lucide-react";
import countryData from "../../../../data/countriesData.json";
import { countriesApi } from "@api/countries-api";
import { leagueTeamsApi } from "@api/leagueTeams-api";
import { TeamStanding } from "@components/Teams/standings-types";
import { Comparision } from "./Comparision/Comparision";
import { SingleValue } from "react-select";
import { customSelectStyles } from "./SelectInput/selectStyles";
import { SelectionCard } from "@components/Pages/H2H/SelectionCard";
interface League {
  league: {
    id: number;
    name: string;
    logo: string;
  };
  country?: {
    name: string;
  };
}

const countryOptions = countryData.response.map((c) => ({
  label: c.name,
  value: Number(c.code) || 0,
  image: c.flag ?? "",
}));

export function TeamSelection() {
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

  const leagueOptions1 = leagues1
    .filter((item) => item.country?.name === leftSide.country)
    .map((item) => ({
      label: item.league.name,
      value: item.league.id,
      image: item.league.logo,
    }));

  const leagueOptions2 = leagues2
    .filter((item) => item.country?.name === rightSide.country)
    .map((item) => ({
      label: item.league.name,
      value: item.league.id,
      image: item.league.logo,
    }));

  const teamOptions1 = teams1.map((item) => ({
    label: item.team.name,
    value: item.team.id,
    image: item.team.logo,
  }));

  const teamOptions2 = teams2.map((item) => ({
    label: item.team.name,
    value: item.team.id,
    image: item.team.logo,
  }));

  const seasonOptions = [
    { value: 2021, label: "2021" },
    { value: 2022, label: "2022" },
    { value: 2023, label: "2023" },
  ];

  useEffect(() => {
    const fetchLeaguesByCountry = async (
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

    if (leftSide.country) {
      fetchLeaguesByCountry(leftSide.country, setLeagues1);
    }
    if (rightSide.country) {
      fetchLeaguesByCountry(rightSide.country, setLeagues2);
    }
  }, [leftSide.country, rightSide.country]);

  useEffect(() => {
    const fetchStandings1 = async () => {
      if (!leftSide.league || !leftSide.season) return;

      const selectedLeague = leagues1.find(
        (league) => league.league.name === leftSide.league
      );
      const selectedLeagueId = selectedLeague?.league.id;

      if (!selectedLeagueId) return;
      else {
        setLeftSide((prev) => ({
          ...prev,
          leagueId: selectedLeagueId,
        }));
      }

      try {
        const data = await leagueTeamsApi.get(
          selectedLeagueId,
          leftSide.season
        );
        const teamsList = data.response?.[0]?.league?.standings?.[0] || [];
        setTeams1(teamsList);
      } catch (error) {
        console.error("Error fetching standings 1:", error);
      }
    };

    fetchStandings1();
  }, [leftSide.league, leftSide.season, leagues1]);

  useEffect(() => {
    const fetchStandings2 = async () => {
      if (!rightSide.league || !rightSide.season) return;

      const selectedLeague = leagues2.find(
        (league) => league.league.name === rightSide.league
      );
      const selectedLeagueId = selectedLeague?.league.id;

      if (!selectedLeagueId) return;
      else {
        setRightSide((prev) => ({
          ...prev,
          leagueId: selectedLeagueId,
        }));
      }

      try {
        const data = await leagueTeamsApi.get(
          selectedLeagueId,
          rightSide.season
        );
        const teamsList = data.response?.[0]?.league?.standings?.[0] || [];
        setTeams2(teamsList);
      } catch (error) {
        console.error("Error fetching standings 2:", error);
      }
    };

    fetchStandings2();
  }, [rightSide.league, rightSide.season, leagues2]);

  const resetTeamSelection = (side: "left" | "right", fullReset = false) => {
    const resetState = (prev: typeof leftSide) => ({
      ...prev,
      country: fullReset ? "" : prev.country,
      league: "",
      team: "",
      season: "2023",
    });

    if (side === "left") {
      setLeftSide((prev) => resetState(prev));
      setTeams1([]);
    } else {
      setRightSide((prev) => resetState(prev));
      setTeams2([]);
    }
  };

  const handleSeasonChange = (
    selected: SingleValue<{ value: number; label: string }>,
    side: "left" | "right"
  ) => {
    if (!selected) return;

    const setter = side === "left" ? setLeftSide : setRightSide;
    setter((prev) => ({ ...prev, season: selected.value.toString() }));
  };

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["team-selection-container"]}>
        <SelectionCard
          title="Choose first team"
          reset={() => resetTeamSelection("left", true)}
          selects={[
            {
              icon: <Flag size={30} strokeWidth={1.5} />,
              placeholder: "Select country",
              value: leftSide.country,
              onChange: (value) => {
                setLeftSide((prev) => ({ ...prev, country: value }));
                resetTeamSelection("left");
              },
              options: countryOptions,
            },
            {
              icon: <Shield size={30} strokeWidth={1.5} />,
              placeholder: "Select league",
              value: leftSide.league,
              onChange: (value) =>
                setLeftSide((prev) => ({ ...prev, league: value })),
              options: leagueOptions1,
            },
            {
              icon: <ShieldUser size={30} strokeWidth={1.5} />,
              placeholder: "Select team",
              value: leftSide.team,
              onChange: (value) =>
                setLeftSide((prev) => ({ ...prev, team: value })),
              options: teamOptions1,
            },
          ]}
          showPosition
          positionLabel={
            (() => {
              const team = teams1.find(
                (team) => team.team.name === leftSide.team
              );
              return team ? `Finished in #${team.rank} place` : "Position unknown";
            })()
          }
          seasonSelect={{
            options: seasonOptions,
            value:
              seasonOptions.find(
                (opt) => opt.value === Number(leftSide.season)
              ) || seasonOptions[2],
            onChange: (selected) => handleSeasonChange(selected, "left"),
            styles: customSelectStyles,
          }}
        />

        <SelectionCard
          title="Choose second team"
          reset={() => resetTeamSelection("right", true)}
          selects={[
            {
              icon: <Flag size={30} strokeWidth={1.5} />,
              placeholder: "Select country",
              value: rightSide.country,
              onChange: (value) => {
                setRightSide((prev) => ({ ...prev, country: value }));
                resetTeamSelection("right");
              },
              options: countryOptions,
            },
            {
              icon: <Shield size={30} strokeWidth={1.5} />,
              placeholder: "Select league",
              value: rightSide.league,
              onChange: (value) =>
                setRightSide((prev) => ({ ...prev, league: value })),
              options: leagueOptions2,
            },
            {
              icon: <ShieldUser size={30} strokeWidth={1.5} />,
              placeholder: "Select team",
              value: rightSide.team,
              onChange: (value) =>
                setRightSide((prev) => ({ ...prev, team: value })),
              options: teamOptions2,
            },
          ]}
          showPosition
          positionLabel={
            (() => {
              const team = teams2.find(
                (team) => team.team.name === rightSide.team
              );
              return team ? `Finished in #${team.rank} place` : "Position unknown";
            })()
          }
          seasonSelect={{
            options: seasonOptions,
            value:
              seasonOptions.find(
                (opt) => opt.value === Number(rightSide.season)
              ) || seasonOptions[2],
            onChange: (selected) => handleSeasonChange(selected, "right"),
            styles: customSelectStyles,
          }}
        />
      </div>
      <Comparision
        teamOneName={leftSide.team}
        teamTwoName={rightSide.team}
        leagueOneId={leftSide.leagueId}
        leagueTwoId={rightSide.leagueId}
        seasonOne={leftSide.season}
        seasonTwo={rightSide.season}
      />
    </div>
  );
}
