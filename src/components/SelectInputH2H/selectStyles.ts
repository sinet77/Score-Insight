import { StylesConfig } from "react-select";

export type SelectOption = {
  label: string;
  value: number;
  image?: string;
};

  //StylesConfig<Option, IsMulti, Group>
export const customSelectStyles: StylesConfig<SelectOption, false> = {
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
