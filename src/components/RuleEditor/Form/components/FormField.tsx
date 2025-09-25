import { Controller } from "react-hook-form";
import styles from "../index.module.css";
import type { FormFieldProps } from "../types";

export const FormField = ({ name, control, label, type = "text", placeholder }: FormFieldProps) => (
  <div className="form-group">
    <fieldset className={styles.formField}>
      <legend className={styles.legend}>{label}</legend>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            className={styles.formFieldInput}
            {...field}
            type={type}
            id={name}
            placeholder={placeholder}
            value={(field.value as string) || ""}
          />
        )}
      />
    </fieldset>
  </div>
);
