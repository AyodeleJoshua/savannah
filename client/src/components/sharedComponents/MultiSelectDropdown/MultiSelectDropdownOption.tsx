import styles from "./styles.module.scss";

interface IOption {
  id: string;
  label: string;
  count: number;
}

interface IMultiSelectDropdownOptionProps {
  option: IOption;
  isSelected: boolean;
  onOptionChange: (optionId: string) => void;
}

export default function MultiSelectDropdownOption({
  option,
  isSelected,
  onOptionChange,
}: IMultiSelectDropdownOptionProps) {
  return (
    <label className={styles["multi-select-dropdown__option"]}>
      <input
        type="checkbox"
        value={option.id}
        checked={isSelected}
        onChange={() => onOptionChange(option.id)}
        className={styles["multi-select-dropdown__option-checkbox"]}
      />
      <span className={styles["multi-select-dropdown__option-label"]}>
        {option.label}
      </span>
      {/* <span className={styles["multi-select-dropdown__option-count"]}>
        {option.count}
      </span> */}
    </label>
  );
} 