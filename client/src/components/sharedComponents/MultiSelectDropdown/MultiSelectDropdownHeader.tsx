import { HiMagnifyingGlass } from "react-icons/hi2";
import styles from "./styles.module.scss";

interface IMultiSelectDropdownHeaderProps {
  placeholder?: string;
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function MultiSelectDropdownHeader({
  placeholder = "Search options...",
  searchTerm,
  onSearchChange,
}: IMultiSelectDropdownHeaderProps) {
  return (
    <div className={styles["multi-select-dropdown__header"]}>
      <div className={styles["multi-select-dropdown__search"]}>
        <span className={styles["multi-select-dropdown__search-icon"]}>
          <HiMagnifyingGlass />
        </span>
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={onSearchChange}
          className={styles["multi-select-dropdown__search-input"]}
        />
      </div>
    </div>
  );
} 