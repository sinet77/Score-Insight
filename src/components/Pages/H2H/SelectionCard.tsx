import { RotateCcw, Trophy } from "lucide-react";
import Select, { StylesConfig } from "react-select";
import styles from "./SelectionCard.module.scss";
import { SelectInput } from "../CompareTeams/H2HTeams/SelectInput/SelectInput";

interface SelectInputConfig {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: number; image?: string }[];
}

interface SelectionCardProps {
  title: string;
  selects: SelectInputConfig[];
  showPosition?: boolean;
  positionLabel?: string;
  reset: () => void;
  seasonSelect?: {
    options: { label: string; value: string | number }[];
    value: { label: string; value: string | number };
    onChange: (
      option: { label: string; value: string | number } | null
    ) => void;
    styles: StylesConfig;
  };
}

export const SelectionCard = ({
  title,
  selects,
  showPosition = false,
  positionLabel,
  reset,
  seasonSelect,
}: SelectionCardProps) => {
  return (
    <div className={styles["team-card"]}>
      <div className={styles["button-container"]}>
        <span className={styles["card-title"]}>{title}</span>
        <button onClick={reset} className={styles["reset-button"]}>
          <RotateCcw />
        </button>
      </div>

      {selects.map((select) => (
        <SelectInput
          key={select.placeholder}
          icon={select.icon}
          placeholder={select.placeholder}
          value={select.value}
          onChange={select.onChange}
          options={select.options}
        />
      ))}

      'adasdasda'

      {(showPosition || seasonSelect) && (
        <div className={styles["items"]}>
          {showPosition && (
            <div className={`${styles["item"]} ${styles["wider"]}`}>
              <div className={styles["trophy-icon"]}>
                <Trophy />
              </div>
              <span className={styles["team-position"]}>
                {positionLabel ?? "Position unknown"}
              </span>
            </div>
          )}
          {seasonSelect && (
            <Select
              options={seasonSelect.options}
              value={seasonSelect.value}
              onChange={(newValue) =>
                seasonSelect.onChange(
                  newValue as { label: string; value: string | number } | null
                )
              }
              styles={seasonSelect.styles}
            />
          )}
        </div>
      )}
    </div>
  );
};
