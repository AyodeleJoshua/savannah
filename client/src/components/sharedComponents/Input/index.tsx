import type { ReactNode, InputHTMLAttributes } from "react";
import styles from "./styles.module.scss";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  iconLeft?: ReactNode;
  inputClassName?: string;
}

export default function Input({
  iconLeft,
  inputClassName = "",
  className = "",
  ...inputProps
}: IInputProps) {
  return (
    <div className={`${styles["input-wrapper"]} ${className}`}>
      <div className={styles["input-wrapper__field-container"]}>
        {iconLeft && <span className={styles["input-wrapper__icon"]}>{iconLeft}</span>}
        <input data-testid="search-input" className={`${styles["input-wrapper__input"]} ${inputClassName}`} {...inputProps} />
      </div>
    </div>
  );
}
