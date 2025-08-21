import styles from "./PlayerSelection.module.scss";
import { Flag, RotateCcw, Shield, ShieldUser, User } from "lucide-react";
import { SelectInput } from "@components/SelectInputH2H/SelectInput";
import Select from "react-select";
import { customSelectStyles } from "@components/SelectInputH2H/selectStyles";
import { useH2HSelection } from "../../../../hooks/useh2hSelection";
import { useEffect, useState } from "react";
import { PlayersStatsData } from "../PlayersStatsData/PlayersStatsData";

export function PlayerSelection() {
  const [selectedPlayer1, setSelectedPlayer1] = useState<string>();
  const [selectedPlayer2, setSelectedPlayer2] = useState<string>();

  const {
    leftSide,
    rightSide,
    setLeftSide,
    setRightSide,
    countryOptions,
    seasonOptions,
    leagueOptions1,
    leagueOptions2,
    teamOptions1,
    teamOptions2,
    resetTeamSelection,
    handleSeasonChange,
    players1,
    players2,
  } = useH2HSelection();

  const playerOptions1 = players1.map((p) => ({
    label: p.player.name,
    value: p.player.id,
  }));

  const playerOptions2 = players2.map((p) => ({
    label: p.player.name,
    value: p.player.id,
  }));
  useEffect(() => {
    console.log("selectedPlayer1", selectedPlayer1);
    console.log(
      "players1",
      players1.map((p) => p.player)
    );
  }, [selectedPlayer1, players1]);
  return (
    <div className="wrapper">
      <div className="team-selection-container">
        {/* 1 kafelek */}
        <div className="team-card">
          <div className="button-container">
            <span className="card-title">Choose first player</span>
            <button
              onClick={() => resetTeamSelection("left", true)}
              className="reset-button"
            >
              <RotateCcw />
            </button>
          </div>
          <SelectInput
            icon={<Flag size={30} strokeWidth={1.5} />}
            placeholder="Select country"
            value={leftSide.country}
            onChange={(value) => {
              setLeftSide((prev) => ({ ...prev, country: value }));
              resetTeamSelection("left");
            }}
            options={countryOptions}
          />
          <SelectInput
            icon={<Shield size={30} strokeWidth={1.5} />}
            placeholder="Select league"
            value={leftSide.league}
            onChange={(value) =>
              setLeftSide((prev) => ({ ...prev, league: value }))
            }
            options={leagueOptions1}
          />
          <SelectInput
            icon={<ShieldUser size={30} strokeWidth={1.5} />}
            placeholder="Select team"
            value={leftSide.team}
            onChange={(value) =>
              setLeftSide((prev) => ({ ...prev, team: value }))
            }
            options={teamOptions1}
          />
          <SelectInput
            icon={<User size={30} strokeWidth={1.5} />}
            placeholder="Select player"
            value={selectedPlayer1}
            onChange={(value) => setSelectedPlayer1(value)}
            options={playerOptions1}
          />
          <div className="items">
            <Select
              options={seasonOptions}
              value={
                seasonOptions.find(
                  (opt) => opt.value === Number(leftSide.season)
                ) || seasonOptions[2]
              } // default 2023
              onChange={(selected) => handleSeasonChange(selected, "left")}
              styles={customSelectStyles}
            />
          </div>
        </div>

        {/* 2 kafelek */}
        <div className="team-card">
          <div className="button-container">
            <span className="card-title">Choose second player</span>
            <button
              onClick={() => resetTeamSelection("right", true)}
              className="reset-button"
            >
              <RotateCcw />
            </button>
          </div>

          <SelectInput
            icon={<Flag size={30} strokeWidth={1.5} />}
            placeholder="Select country"
            value={rightSide.country}
            onChange={(value) => {
              setRightSide((prev) => ({ ...prev, country: value }));
              resetTeamSelection("right");
            }}
            options={countryOptions}
          />
          <SelectInput
            icon={<Shield size={30} strokeWidth={1.5} />}
            placeholder="Select league"
            value={rightSide.league}
            onChange={(value) =>
              setRightSide((prev) => ({ ...prev, league: value }))
            }
            options={leagueOptions2}
          />
          <SelectInput
            icon={<ShieldUser size={30} strokeWidth={1.5} />}
            placeholder="Select team"
            value={rightSide.team}
            onChange={(value) =>
              setRightSide((prev) => ({ ...prev, team: value }))
            }
            options={teamOptions2}
          />
          <SelectInput
            icon={<User size={30} strokeWidth={1.5} />}
            placeholder="Select player"
            value={selectedPlayer2}
            onChange={(value) => setSelectedPlayer2(value)}
            options={playerOptions2}
          />
          <div className="items">
            <Select
              options={seasonOptions}
              value={
                seasonOptions.find(
                  (opt) => opt.value === Number(rightSide.season)
                ) || seasonOptions[2]
              } // default 2023
              onChange={(selected) => handleSeasonChange(selected, "right")}
              styles={customSelectStyles}
            />
          </div>
        </div>
      </div>
      <PlayersStatsData
        playerOne={
          players1.find((p) => p.player.name === selectedPlayer1) ?? null
        }
        playerTwo={
          players2.find((p) => p.player.name === selectedPlayer2) ?? null
        }
      />
    </div>
  );
}
