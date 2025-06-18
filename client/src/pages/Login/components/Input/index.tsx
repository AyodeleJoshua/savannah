import React, { forwardRef } from "react";
import type { IconType } from "react-icons";
import styles from "./styles.module.scss";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Icon to display on the left side of the input */
  icon?: IconType;
  /** Icon to display on the right side of the input (e.g., password toggle) */
  rightIcon?: IconType;
  /** Click handler for the right icon */
  onRightIconClick?: () => void;
  /** Whether the right icon button should be disabled */
  rightIconDisabled?: boolean;
  /** Additional CSS classes for the input wrapper */
  wrapperClassName?: string;
  /** Additional CSS classes for the input itself */
  inputClassName?: string;
}

/**
 * Reusable Input component that supports icons and all native input props
 */
export const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      icon: Icon,
      rightIcon: RightIcon,
      onRightIconClick,
      rightIconDisabled = false,
      wrapperClassName = "",
      inputClassName = "",
      className,
      ...inputProps
    },
    ref,
  ) => {
    return (
      <div className={`${styles["input-wrapper"]} ${wrapperClassName}`}>
        <input
          ref={ref}
          className={`${styles["form-input"]} ${inputClassName} text-black`}
          {...inputProps}
        />
      </div>
    );
  },
);

Input.displayName = "Input";
