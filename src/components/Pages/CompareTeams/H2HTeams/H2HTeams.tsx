import { Flag, RotateCcw, Shield, ShieldUser, Trophy } from "lucide-react";
import { SelectInput } from "@components/SelectInputH2H/SelectInput";
import { StatsData } from "@components/Pages/CompareTeams/H2HTeams/StatsData/StatsData";
import Select from "react-select";
import { customSelectStyles } from "@components/SelectInputH2H/selectStyles";
import { useH2HSelection } from "../../../../hooks/useH2hSelection";

export function TeamSelection() {
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
    teams1,
    teams2,
  } = useH2HSelection();

  return (
    <div className="wrapper">
      <div className="team-selection-container">
        {/* 1 kafelek */}
        <div className="team-card">
          <div className="button-container">
            <span className="card-title">Choose first team</span>
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
          <div className="items">
            <div className="item wider">
              <div className="trophy-icon">
                <Trophy />
              </div>
              <span className="team-position">
                {(() => {
                  const team = teams1.find(
                    (team) => team.team.name === leftSide.team
                  );
                  return team
                    ? `Finished in #${team.rank} place`
                    : "Position unknown";
                })()}
              </span>
            </div>
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
            <span className="card-title">Choose second team</span>
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
          <div className="items">
            <div className="item wider">
              <div className="trophy-icon">
                <Trophy />
              </div>
              <span className="team-position">
                {(() => {
                  const team = teams2.find(
                    (team) => team.team.name === rightSide.team
                  );
                  return team
                    ? `Finished in #${team.rank} place`
                    : "Position unknown";
                })()}
              </span>
            </div>
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
      <StatsData
        teamOneStanding={
          teams1.find((team) => team.team.name === leftSide.team) ?? null
        }
        teamTwoStanding={
          teams2.find((team) => team.team.name === rightSide.team) ?? null
        }
      />
    </div>
  );
}
