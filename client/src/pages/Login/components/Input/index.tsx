import React, { forwardRef } from "react";
import { Field, type FieldProps } from "formik";
import styles from "./styles.module.scss";

interface IInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> {
  wrapperClassName?: string;
  inputClassName?: string;
  name: string;
  showError?: boolean;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      wrapperClassName = "",
      inputClassName = "",
      name,
      showError = false,
      ...inputProps
    },
    ref,
  ) => {
    return (
      <Field name={name}>
        {({ field, meta }: FieldProps) => (
          <div className={`${styles["input-wrapper"]} ${wrapperClassName}`}>
            <input
              ref={ref}
              className={`${
                styles["form-input"]
              } ${inputClassName} text-black ${
                meta.touched && meta.error ? styles["input-error"] : ""
              }`}
              {...field}
              {...inputProps}
            />
            {showError && meta.touched && meta.error && (
              <div
                className={styles["input-error-message"]}
                data-testid={`${name}-error`}
              >
                {meta.error}
              </div>
            )}
          </div>
        )}
      </Field>
    );
  },
);

Input.displayName = "Input";
