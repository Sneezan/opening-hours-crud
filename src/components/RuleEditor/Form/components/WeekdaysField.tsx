import { Controller } from "react-hook-form";
import { getWeekdayFormData, type Weekdays } from "../../../../code/weekdays";
import styles from "../index.module.css";
import type { FormData } from "../types";

interface WeekdaysFieldProps {
  control: import("react-hook-form").Control<FormData>;
}

export const WeekdaysField = ({ control }: WeekdaysFieldProps) => (
  <fieldset className={styles.weekdaysFieldset}>
    <legend className={styles.legend} id="weekdays-legend">
      Active Days
    </legend>
    <Controller
      name="weekdays"
      control={control}
      render={({ field: { onChange, value } }) => {
        const weekdaysData = getWeekdayFormData();

        const handleToggle = (dayValue: Weekdays) => {
          const currentValue = value || [];
          const isSelected = currentValue.includes(dayValue);
          onChange(
            isSelected
              ? currentValue.filter((day) => day !== dayValue)
              : [...currentValue, dayValue],
          );
        };

        return (
          <div className={styles.chipsContainer} role="group" aria-labelledby="weekdays-legend">
            {weekdaysData.map(({ value: dayValue, label, id }) => {
              const selected = value?.includes(dayValue) || false;
              return (
                <button
                  key={id}
                  type="button"
                  className={`${styles.chip} ${selected ? styles.chipSelected : ""}`}
                  onClick={() => handleToggle(dayValue)}
                  aria-pressed={selected}
                >
                  {label}
                </button>
              );
            })}
          </div>
        );
      }}
    />
  </fieldset>
);

export default WeekdaysField;
