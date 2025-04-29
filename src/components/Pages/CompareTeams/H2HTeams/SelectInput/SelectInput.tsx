import Select, { SingleValue, StylesConfig } from "react-select";
import styles from "./SelectInput.module.scss";

interface SelectInputProps {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: number; image?: string }[];
}

export function SelectInput({
  icon,
  placeholder,
  value,
  onChange,
  options,
}: SelectInputProps) {
  //StylesConfig<Option, IsMulti, Group>
  const customStyles: StylesConfig<
    { label: string; value: number; image?: string },
    false
  > = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      boxShadow: "none",
      borderColor: state.isFocused ? "#01ac88" : "#e0e0e5",
      "&:hover": {
        borderColor: "#2ecc71",
      },
    }),

    option: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: state.isFocused ? "#eee" : "white",
      color: "black",
    }),
  };

  const selectedOption = options.find((opt) => opt.label === value) || null;

  const handleChange = (
    selected: SingleValue<{ label: string; value: number; image?: string }>
  ) => {
    if (selected) {
      onChange(selected.label);
    }
  };

  const formatOptionLabel = (option: {
    label: string;
    value: number;
    image?: string;
  }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
      {option.image && (
        <img src={option.image} alt={option.label} className={styles["flag"]} />
      )}
      {option.label}
    </div>
  );

  return (
    <div className={styles["team-header"]}>
      <div className={styles["team-icon"]}>{icon}</div>
      <div className={styles["input-wrapper"]}>
        <Select
          options={options}
          value={selectedOption}
          onChange={handleChange}
          placeholder={placeholder}
          styles={customStyles}
          formatOptionLabel={formatOptionLabel}
          isSearchable
        />
      </div>
    </div>
  );
}
