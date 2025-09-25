import { Controller } from "react-hook-form";
import styles from "../index.module.css";
import type { SelectFieldProps } from "../types";

export const SelectField = ({ name, control, label, options }: SelectFieldProps) => (
  <div className={styles.stateContainer}>
    <label className={styles.stateLabel} htmlFor={name}>
      {label}
    </label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={styles.stateChips}>
          {options.map(({ value, label: optionLabel }) => {
            const isSelected =
              (value === "true" && field.value === true) ||
              (value === "false" && field.value === false);
            return (
              <button
                key={value}
                type="button"
                className={`${styles.stateChip} ${isSelected ? (value === "true" ? styles.stateChipOpen : styles.stateChipClosed) : ""}`}
                onClick={() => field.onChange(value === "true")}
              >
                {optionLabel}
              </button>
            );
          })}
        </div>
      )}
    />
  </div>
);
