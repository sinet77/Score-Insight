import { useEffect, useState } from "react";
import styles from "./H2HTeams.module.scss";
import { Flag, Shield, ShieldUser, Trophy } from "lucide-react";
import countryData from "../../../../data/countriesData.json";
import { SelectInput } from "./SelectInput/SelectInput";
import { countriesApi } from "@api/countries-api";
import { leagueTeamsApi } from "@api/leagueTeams-api";
import { TeamStanding } from "@components/Teams/standings-types";
import { Comparision } from "./Comparision/Comparision";

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
  const [leagues, setLeagues] = useState<League[]>([]);
  const [teams1, setTeams1] = useState<TeamStanding[]>([]);
  const [teams2, setTeams2] = useState<TeamStanding[]>([]);

  const [selectedSeason1, setSelectedSeason1] = useState<string>("2023");
  const [selectedSeason2, setSelectedSeason2] = useState<string>("2023");

  const [countryInputValue1, setCountryInputValue1] = useState("");
  const [countryInputValue2, setCountryInputValue2] = useState("");
  const [leagueInputValue1, setLeagueInputValue1] = useState("");
  const [leagueInputValue2, setLeagueInputValue2] = useState("");
  const [teamValue1, setTeamValue1] = useState("");
  const [teamValue2, setTeamValue2] = useState("");

  const leagueOptions1 = leagues
    .filter((item) => item.country?.name === countryInputValue1)
    .map((item) => ({
      label: item.league.name,
      value: item.league.id,
      image: item.league.logo,
    }));

  const leagueOptions2 = leagues
    .filter((item) => item.country?.name === countryInputValue2)
    .map((item) => ({
      label: item.league.name,
      value: item.league.id,
      image: item.league.logo,
    }));

  const teamOptions1 = teams1.map((item) => ({
    label: item.team.name,
    value: item.team.id,
  }));

  const teamOptions2 = teams2.map((item) => ({
    label: item.team.name,
    value: item.team.id,
  }));

  useEffect(() => {
    const fetchLeaguesByCountry = async (countryName: string) => {
      try {
        const data = await countriesApi.get();
        if (!data) return;

        const leaguesForCountry = data.response.filter(
          (league: League) => league.country?.name === countryName
        );
        setLeagues(leaguesForCountry);
      } catch (error) {
        console.error("Error fetching leagues:", error);
      }
    };

    if (countryInputValue1) {
      fetchLeaguesByCountry(countryInputValue1);
    }
    if (countryInputValue2) {
      fetchLeaguesByCountry(countryInputValue2);
    }
  }, [countryInputValue1, countryInputValue2]);

  useEffect(() => {
    const fetchStandings1 = async () => {
      if (!leagueInputValue1 || !selectedSeason1) return;

      const selectedLeague = leagues.find(
        (league) => league.league.name === leagueInputValue1
      );
      const selectedLeagueId = selectedLeague?.league.id;

      if (!selectedLeagueId) return;

      try {
        const data = await leagueTeamsApi.get(
          selectedLeagueId,
          selectedSeason1
        );
        const teamsList = data.response?.[0]?.league?.standings?.[0] || [];
        setTeams1(teamsList);
      } catch (error) {
        console.error("Error fetching standings 1:", error);
      }
    };

    fetchStandings1();
  }, [leagueInputValue1, selectedSeason1, leagues]);

  useEffect(() => {
    const fetchStandings2 = async () => {
      if (!leagueInputValue2 || !selectedSeason2) return;

      const selectedLeague = leagues.find(
        (league) => league.league.name === leagueInputValue2
      );
      const selectedLeagueId = selectedLeague?.league.id;

      if (!selectedLeagueId) return;

      try {
        const data = await leagueTeamsApi.get(
          selectedLeagueId,
          selectedSeason2
        );
        const teamsList = data.response?.[0]?.league?.standings?.[0] || [];
        setTeams2(teamsList);
      } catch (error) {
        console.error("Error fetching standings 2:", error);
      }
    };

    fetchStandings2();
  }, [leagueInputValue2, selectedSeason2, leagues]);

  const resetTeamSelection1 = () => {
    setLeagueInputValue1("");
    setTeamValue1("");
    setSelectedSeason1("2023");
    setTeams1([]);
  };

  const resetTeamSelection2 = () => {
    setLeagueInputValue2("");
    setTeamValue2("");
    setSelectedSeason2("2023");
    setTeams2([]);
  };

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["team-selection-container"]}>
        {/* 1 kafelek */}
        <div className={styles["team-card"]}>
          <SelectInput
            icon={<Flag size={30} strokeWidth={1.5} />}
            placeholder="Select country"
            value={countryInputValue1}
            onChange={(value) => {
              setCountryInputValue1(value);
              resetTeamSelection1();
            }}
            options={countryOptions}
          />
          <SelectInput
            icon={<Shield size={30} strokeWidth={1.5} />}
            placeholder="Select league"
            value={leagueInputValue1}
            onChange={setLeagueInputValue1}
            options={leagueOptions1}
          />

          <SelectInput
            icon={<ShieldUser size={30} strokeWidth={1.5} />}
            placeholder="Select team"
            value={teamValue1}
            onChange={setTeamValue1}
            options={teamOptions1}
          />
          <div className={styles["items"]}>
            <div className={`${styles["item"]} ${styles["wider"]}`}>
              <div className={styles["trophy-icon"]}>
                <Trophy />
              </div>
              <span className={styles["team-position"]}>
                {(() => {
                  const team = teams1.find(
                    (team) => team.team.name === teamValue1
                  );
                  return team
                    ? `Finished in #${team.rank} place`
                    : "Position unknown";
                })()}
              </span>
            </div>
            <select
              id="year"
              name="year"
              className={styles["item"]}
              onChange={(event) => setSelectedSeason1(event.target.value)}
              value={selectedSeason1 || "2023"}
            >
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </select>
          </div>
        </div>

        {/* 2 kafelek */}
        <div className={styles["team-card"]}>
          <SelectInput
            icon={<Flag size={30} strokeWidth={1.5} />}
            placeholder="Select country"
            value={countryInputValue2}
            onChange={(value) => {
              setCountryInputValue2(value);
              resetTeamSelection2();
            }}
            options={countryOptions}
          />
          <SelectInput
            icon={<Shield size={30} strokeWidth={1.5} />}
            placeholder="Select league"
            value={leagueInputValue2}
            onChange={setLeagueInputValue2}
            options={leagueOptions2}
          />
          <SelectInput
            icon={<ShieldUser size={30} strokeWidth={1.5} />}
            placeholder="Select team"
            value={teamValue2}
            onChange={setTeamValue2}
            options={teamOptions2}
          />
          <div className={styles["items"]}>
            <div className={`${styles["item"]} ${styles["wider"]}`}>
              <div className={styles["trophy-icon"]}>
                <Trophy />
              </div>
              <span className={styles["team-position"]}>
                {(() => {
                  const team = teams2.find(
                    (team) => team.team.name === teamValue2
                  );
                  return team
                    ? `Finished in #${team.rank} place`
                    : "Position unknown";
                })()}
              </span>
            </div>
            <select
              id="year"
              name="year"
              className={styles["item"]}
              onChange={(event) => setSelectedSeason2(event.target.value)}
              value={selectedSeason2 || "2023"}
            >
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </select>
          </div>
        </div>
      </div>
      <Comparision
        teamOneName={teamValue1}
        teamTwoName={teamValue2}
        leagueOneId={leagueInputValue1}
        leagueTwoId={leagueInputValue2}
        seasonOne={selectedSeason1}
        seasonTwo={selectedSeason2}
      />
    </div>
  );
}
