import styles from "./styles.module.scss";

interface IMultiSelectDropdownFooterProps {
  onClearFilters: () => void;
}

export default function MultiSelectDropdownFooter({
  onClearFilters,
}: IMultiSelectDropdownFooterProps) {
  return (
    <div className={styles["multi-select-dropdown__footer"]}>
      <button
        className={styles["multi-select-dropdown__clear-button"]}
        onClick={onClearFilters}
      >
        Clear Filters
      </button>
    </div>
  );
} 