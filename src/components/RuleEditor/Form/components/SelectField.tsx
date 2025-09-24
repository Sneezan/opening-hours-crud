import type React from "react";
import { type Control, Controller } from "react-hook-form";
import type { FormData } from "../types";

export const SelectField: React.FC<{
  name: keyof FormData;
  control: Control<FormData>;
  label: string;
  options: { value: string; label: string }[];
}> = ({
  name,
  control,
  label,
  options,
}: {
  name: keyof FormData;
  control: Control<FormData>;
  label: string;
  options: { value: string; label: string }[];
}) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <select
          id={name}
          value={field.value === true ? "true" : "false"}
          onChange={(e) => field.onChange(e.target.value === "true")}
          onBlur={field.onBlur}
          name={field.name}
          ref={field.ref}
        >
          {options.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      )}
    />
  </div>
);
