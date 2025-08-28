import type { Dispatch, SetStateAction } from "react";
import { RotateCcw, Flag, Shield, ShieldUser, User } from "lucide-react";
import { SelectInput } from "@components/SelectInputH2H/SelectInput";
import Select from "react-select";
import { customSelectStyles } from "@components/SelectInputH2H/selectStyles";

type Option = { label: string; value: number; image?: string };

type BaseSideState  = {
  country: string;
  league: string;
  team: string;
  season: string;
};

type PlayerCardProps<T extends BaseSideState > = {
  title: string;
  side: "left" | "right";
  state: T;
  setState: Dispatch<SetStateAction<T>>;
  countryOptions: Option[];
  leagueOptions: Option[];
  teamOptions: Option[];
  seasonOptions: { label: string; value: number }[];
  playerOptions: { label: string; value: number }[];
  selectedPlayerLabel?: string;
  onSelectPlayer: (label?: string) => void;
  onReset: (side: "left" | "right", hard?: boolean) => void;
  handleSeasonChange: (
    selected: { value: number; label: string } | null,
    side: "left" | "right"
  ) => void;
};

export function PlayerCard<T extends BaseSideState >({
  title,
  side,
  state,
  setState,
  countryOptions,
  leagueOptions,
  teamOptions,
  seasonOptions,
  playerOptions,
  selectedPlayerLabel,
  onSelectPlayer,
  onReset,
  handleSeasonChange,
}: PlayerCardProps<T>) {
  return (
    <div className="team-card">
      <div className="button-container">
        <span className="card-title">{title}</span>
        <button
          onClick={() => {
            onReset(side, true);
            onSelectPlayer();
          }}
          className="reset-button"
        >
          <RotateCcw />
        </button>
      </div>

      <SelectInput
        icon={<Flag size={30} strokeWidth={1.5} />}
        placeholder="Select country"
        value={state.country}
        onChange={(label) => {
          setState((prev) => ({
            ...prev,
            country: label,
            league: "",
            team: "",
          }));
          onReset(side);
          onSelectPlayer();
        }}
        options={countryOptions}
      />

      <SelectInput
        icon={<Shield size={30} strokeWidth={1.5} />}
        placeholder="Select league"
        value={state.league}
        onChange={(label) => {
          setState((prev) => ({ ...prev, league: label, team: "" }));
          onSelectPlayer();
        }}
        options={leagueOptions}
      />

      <SelectInput
        icon={<ShieldUser size={30} strokeWidth={1.5} />}
        placeholder="Select team"
        value={state.team}
        onChange={(label) => {
          setState((prev) => ({ ...prev, team: label }));
          onSelectPlayer();
        }}
        options={teamOptions}
      />

      <SelectInput
        icon={<User size={30} strokeWidth={1.5} />}
        placeholder="Select player"
        value={selectedPlayerLabel ?? ""}
        onChange={(label) => onSelectPlayer(label)}
        options={playerOptions}
      />

      <div className="items">
        <Select
          options={seasonOptions}
          value={
            seasonOptions.find(
              (opt) => Number(opt.value) === Number(state.season)
            ) || seasonOptions[2]
          }
          onChange={(selected) => {
            handleSeasonChange(selected, side);
            onSelectPlayer();
          }}
          styles={customSelectStyles}
        />
      </div>
    </div>
  );
}
