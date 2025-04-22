import { useEffect, useState } from "react";
import styles from "./H2HTeams.module.scss";
import { Flag, Shield, ShieldUser, Trophy } from "lucide-react";
import countryData from "../../../../data/countriesData.json";
import { SelectInput } from "./SelectInput/SelectInput";
import { countriesApi } from "@api/countries-api";
import { leagueTeamsApi } from "@api/leagueTeams-api";
import { TeamStanding } from "@components/Teams/standings-types";

interface Team {
  id: string;
  name: string;
}

const countryOptions = countryData.response.map((c) => ({
  label: c.name,
  value: c.code ?? "",
  image: c.flag ?? "",
}));

export function TeamSelection() {
  const [teams, setTeams] = useState<TeamStanding[]>([]);
  const [leagues, setLeagues] = useState<any[]>([]);

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

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const data = await countriesApi.get();
        if (!data) {
          return;
        }
        setLeagues(data.response);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchLeagues();
  }, []);

  // useEffect(() => {
  //   const fetchStandings = async () => {
  //     try {
  //       const data = await leagueTeamsApi.get(39, "2023");
  //       setTeams(data.response);
  //       console.log("data", data);
  //     } catch (error) {
  //       console.error("Error fetching standings:", error);
  //     }
  //   };

  //   fetchStandings();
  // }, []);

  const filterItems = (items: Team[], input: string) =>
    items.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase())
    );

  return (
    <div className={styles["team-selection-container"]}>
      {/* 1 kafelek */}
      <div className={styles["team-card"]}>
        <SelectInput
          icon={<Flag size={30} strokeWidth={1.5} />}
          placeholder="Select country"
          value={countryInputValue1}
          onChange={setCountryInputValue1}
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
          options={filterItems(teams, teamValue1).map((team) => ({
            label: team.name,
            value: team.id,
          }))}
        />
        <div className={styles["items"]}>
          <div className={`${styles["item"]} ${styles["wider"]}`}>
            <div className={styles["trophy-icon"]}>
              <Trophy />
            </div>
            <span className={styles["empty-placeholder"]}>-</span>
          </div>
          <div className={styles["item"]}>
            <span className={styles["empty-placeholder"]}>-</span>
          </div>
        </div>
      </div>

      {/* 2 kafelek */}
      <div className={styles["team-card"]}>
        <SelectInput
          icon={<Flag size={30} strokeWidth={1.5} />}
          placeholder="Select country"
          value={countryInputValue2}
          onChange={setCountryInputValue2}
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
          options={filterItems(teams, teamValue2).map((team) => ({
            label: team.name,
            value: team.id,
          }))}
        />
        <div className={styles["items"]}>
          <div className={`${styles["item"]} ${styles["wider"]}`}>
            <div className={styles["trophy-icon"]}>
              <Trophy />
            </div>
            <span className={styles["empty-placeholder"]}>-</span>
          </div>
          <div className={styles["item"]}>
            <span className={styles["empty-placeholder"]}>-</span>
          </div>
        </div>
      </div>
    </div>
  );
}
