import React, { forwardRef } from "react";
import styles from "./styles.module.scss";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {  
  wrapperClassName?: string;
  inputClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      wrapperClassName = "",
      inputClassName = "",
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
