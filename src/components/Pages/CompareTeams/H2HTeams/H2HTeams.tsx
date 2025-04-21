import { useEffect, useState } from "react";
import styles from "./H2HTeams.module.scss";
import { Flag, Shield, ShieldUser, Trophy } from "lucide-react";
import countryData from "../../../../data/countriesData.json";
import { SelectInput } from "./SelectInput/SelectInput";

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
  const [teams, setTeams] = useState<Team[]>([]);
  
  const [countryInputValue1, setCountryInputValue1] = useState("");
  const [countryInputValue2, setCountryInputValue2] = useState("");
  const [leagueInputValue1, setLeagueInputValue1] = useState("");
  const [leagueInputValue2, setLeagueInputValue2] = useState("");
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");

  useEffect(() => {
    setTeams([
      { id: "1", name: "Barcelona" },
      { id: "2", name: "Real Madrid" },
      { id: "3", name: "Bayern Munich" },
      { id: "4", name: "Borussia Dortmund" },
    ]);
  }, []);

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
          options={filterItems(teams, leagueInputValue1).map((team) => ({
            label: team.name,
            value: team.id,
          }))}
        />
        <SelectInput
          icon={<ShieldUser size={30} strokeWidth={1.5} />}
          placeholder="Select team"
          value={inputValue1}
          onChange={setInputValue1}
          options={filterItems(teams, inputValue1).map((team) => ({
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
          options={filterItems(teams, leagueInputValue2).map((team) => ({
            label: team.name,
            value: team.id,
          }))}
        />
        <SelectInput
          icon={<ShieldUser size={30} strokeWidth={1.5} />}
          placeholder="Select team"
          value={inputValue2}
          onChange={setInputValue2}
          options={filterItems(teams, inputValue2).map((team) => ({
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
