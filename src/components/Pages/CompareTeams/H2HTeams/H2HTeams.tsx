import { useEffect, useState } from "react";
import styles from "./H2HTeams.module.scss";
import { Shield, ShieldUser, Trophy } from "lucide-react";

interface Team {
  id: string;
  name: string;
}

export function TeamSelection() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [leagueInputValue1, setLeagueInputValue1] = useState("");
  const [leagueInputValue2, setLeagueInputValue2] = useState("");
  const [countryInputValue1, setCountryInputValue1] = useState("");
  const [countryInputValue2, setCountryInputValue2] = useState("");


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
      {/* LEAGUE 1 */}
      <div className={styles["team-card"]}>
      <div className={styles["team-header"]}>
          <div className={styles["team-icon"]}>
            <Shield size={30} strokeWidth={1.5} />
          </div>
          <div className={styles["input-wrapper"]}>
            <input
              className={styles["input"]}
              placeholder="Select league"
              type="text"
              value={leagueInputValue1}
              onChange={(e) => setLeagueInputValue1(e.target.value)}

            />
            {leagueInputValue1 && (
              <ul className={styles["dropdown"]}>
                {filterItems(teams, inputValue1).map((team) => (
                  <button
                    key={team.id}
                    className={styles["team-option"]}
                    onClick={() => {
                      setLeagueInputValue1(team.name);
                    }}
                  >
                    {team.name}
                  </button>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className={styles["team-header"]}>
          <div className={styles["team-icon"]}>
            <ShieldUser size={30} strokeWidth={1.5} />
          </div>
          <div className={styles["input-wrapper"]}>
            <input
              className={styles["input"]}
              placeholder="Select team"
              type="text"
              value={inputValue1}
              onChange={(e) => setInputValue1(e.target.value)}

            />
            {inputValue1 && (
              <ul className={styles["dropdown"]}>
                {filterItems(teams, inputValue1).map((team) => (
                  <button
                    key={team.id}
                    className={styles["team-option"]}
                    onClick={() => {
                      setInputValue1(team.name);
                    }}
                  >
                    {team.name}
                  </button>
                ))}
              </ul>
            )}
          </div>
        </div>
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

      {/* TEAM 2 */}
      <div className={styles["team-card"]}>
        <div className={styles["team-header"]}>
          <div className={styles["team-icon"]}>
            <ShieldUser size={30} strokeWidth={1.5} />
          </div>
          <div className={styles["input-wrapper"]}>
            <input
              className={styles["input"]}
              placeholder="Select team"
              type="text"
              value={inputValue2}
              onChange={(e) => setInputValue2(e.target.value)}
            />
            {inputValue2 && (
              <ul className={styles["dropdown"]}>
                {filterItems(teams, inputValue2).map((team) => (
                  <button
                  key={team.id}
                  className={styles["team-option"]}
                  onClick={() => {
                    setInputValue2(team.name);
                  }}
                >
                  {team.name}
                </button>
                ))}
              </ul>
            )}
          </div>
        </div>
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
