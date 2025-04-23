import { useState, useRef, useEffect } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(value.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setIsOpen(true);
  };

  const handleOptionClick = (label: string) => {
    onChange(label);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={styles["team-header"]} ref={wrapperRef}>
      <div className={styles["team-icon"]}>{icon}</div>
      <div className={styles["input-wrapper"]}>
        <input
          className={styles["input"]}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
        />
        {isOpen && filteredOptions.length > 0 && (
          <ul className={styles["dropdown"]}>
            {filteredOptions.map((option, index) => (
              <button
                key={index}
                className={styles["team-option"]}
                onClick={() => handleOptionClick(option.label)}
              >
                {option.image && (
                  <img
                    src={option.image}
                    alt={option.label}
                    className={styles["flag"]}
                  />
                )}
                {option.label}
              </button>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
