import { useState, useRef, useEffect } from "react";
import styles from "./styles.module.scss";
import { LuFilter } from "react-icons/lu";
import MultiSelectDropdownHeader from "./MultiSelectDropdownHeader";
import MultiSelectDropdownOption from "./MultiSelectDropdownOption";
import MultiSelectDropdownFooter from "./MultiSelectDropdownFooter";

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
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleToggleDropdown();
        }
      }}
      aria-expanded={isOpen}
      aria-haspopup="listbox"
    >
      <button
        className={styles["multi-select-dropdown__button"]}
        onClick={handleToggleDropdown}
        role="button"
      >
        <span className={styles["multi-select-dropdown__button-icon"]}>
          <LuFilter />
        </span>
        {buttonText}
      </button>

      {isOpen && (
        <div className={styles["multi-select-dropdown__panel"]}>
          <MultiSelectDropdownHeader
            placeholder={placeholder}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
          />

          <div className={styles["multi-select-dropdown__options-container"]}>
            <div className={styles["multi-select-dropdown__options"]}>
              {filteredOptions.map((option) => (
                <MultiSelectDropdownOption
                  key={option.id}
                  option={option}
                  isSelected={selectedOptions.includes(option.id)}
                  onOptionChange={handleOptionChange}
                />
              ))}
            </div>
          </div>

          <MultiSelectDropdownFooter onClearFilters={handleClearFilters} />
        </div>
      )}
    </div>
  );
}
