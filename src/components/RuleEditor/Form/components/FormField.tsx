import type React from "react";
import { type Control, Controller } from "react-hook-form";
import type { FormData } from "../types";

export const FormField: React.FC<{
  name: keyof FormData;
  control: Control<FormData>;
  label: string;
  type?: string;
  placeholder?: string;
}> = ({
  name,
  control,
  label,
  type = "text",
  placeholder,
}: {
  name: keyof FormData;
  control: Control<FormData>;
  label: string;
  type?: string;
  placeholder?: string;
}) => (
  <div className="form-group">
    <fieldset>
      <legend>{label}</legend>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
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
