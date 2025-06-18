import { useState, useRef, useEffect } from "react";
import styles from "./styles.module.scss";
import { LuFilter } from "react-icons/lu";
import { HiMagnifyingGlass } from "react-icons/hi2";

interface IOption {
  id: string;
  label: string;
  count: number;
}

interface IMultiSelectDropdownProps {
  options: IOption[];
  placeholder?: string;
  buttonText?: string;
  onSelectionChange?: (selectedIds: string[]) => void;
}

export default function MultiSelectDropdown({
  options,
  placeholder = "Search options...",
  buttonText = "Filter",
  onSelectionChange,
}: IMultiSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleToggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleOptionChange = (optionId: string) => {
    const newSelectedOptions = selectedOptions.includes(optionId)
      ? selectedOptions.filter((id) => id !== optionId)
      : [...selectedOptions, optionId];

    setSelectedOptions(newSelectedOptions);
    onSelectionChange?.(newSelectedOptions);
  };

  const handleClearFilters = () => {
    setSelectedOptions([]);
    setSearchTerm("");
    onSelectionChange?.([]);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={styles["multi-select-dropdown"]}
      data-testid="multi-select-dropdown"
      ref={dropdownRef}
    >
      <button
        className={styles["multi-select-dropdown__button"]}
        onClick={handleToggleDropdown}
      >
        <span className={styles["multi-select-dropdown__button-icon"]}>
          <LuFilter />
        </span>
        {buttonText}
      </button>

      {isOpen && (
        <div className={styles["multi-select-dropdown__panel"]}>
          <div className={styles["multi-select-dropdown__search"]}>
            <span className={styles["multi-select-dropdown__search-icon"]}>
              <HiMagnifyingGlass />
            </span>
            <input
              type="text"
              placeholder={placeholder}
              value={searchTerm}
              onChange={handleSearchChange}
              className={styles["multi-select-dropdown__search-input"]}
            />
          </div>
          <div className={styles["multi-select-dropdown__options"]}>
            {filteredOptions.map((option) => (
              <label
                key={option.id}
                className={styles["multi-select-dropdown__option"]}
              >
                <input
                  type="checkbox"
                  value={option.id}
                  checked={selectedOptions.includes(option.id)}
                  onChange={() => handleOptionChange(option.id)}
                  className={styles["multi-select-dropdown__option-checkbox"]}
                />
                <span className={styles["multi-select-dropdown__option-label"]}>
                  {option.label}
                </span>
                <span className={styles["multi-select-dropdown__option-count"]}>
                  {option.count}
                </span>
              </label>
            ))}
          </div>
          <hr />
          <button
            className={styles["multi-select-dropdown__clear-button"]}
            onClick={handleClearFilters}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
