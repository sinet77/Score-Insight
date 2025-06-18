import styles from "./SearchBar.module.scss";

type SearchBarProps = {
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SearchBar = ({ placeholder, value, onChange }: SearchBarProps) => {
  return (
    <div className={styles["search-container"]}>
      <svg
        className={styles["search-container__search-icon"]}
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles["search-container__search-input"]}
      />
    </div>
  );
};
