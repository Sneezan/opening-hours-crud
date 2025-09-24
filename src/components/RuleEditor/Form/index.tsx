import { useState } from "react";
import { type Control, Controller, useForm } from "react-hook-form";
import { parseRuleDates } from "../../../code/datetime";
import { Rule, type RuleConfig } from "../../../code/rule";
import { Rules } from "../../../code/rules";
import { Weekdays } from "../../../code/weekdays";

type FormData = RuleConfig<unknown> & {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  weekdays: Weekdays[];
  state: boolean;
};

// Helper component for form fields
const FormField = ({
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
    <label htmlFor={name}>{label}</label>
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
  </div>
);

const SelectField = ({
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
        <select {...field} value={field.value ? "true" : "false"} id={name}>
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

export const Form = () => {
  const [ruleArray, setRuleArray] = useState<Rules<any>>(new Rules([]));
  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      startDate: "2020-01-01",
      endDate: "2020-01-01",
      startTime: "",
      endTime: "",
      weekdays: [
        Weekdays.Monday,
        Weekdays.Tuesday,
        Weekdays.Wednesday,
        Weekdays.Thursday,
        Weekdays.Friday,
        Weekdays.Saturday,
        Weekdays.Sunday,
      ],
      state: true,
    },
  });

  const onSubmit = (data: FormData) => {
    const weekdaysValue = data.weekdays.reduce((acc, val) => acc | val, 0);

    // Parse datetime strings to Date objects
    const { startDate, endDate, startTime, endTime } = parseRuleDates(
      data.startDate,
      data.endDate,
      data.startTime,
      data.endTime,
    );

    try {
      const rule = new Rule({
        startDate,
        endDate,
        startTime,
        endTime,
        weekdays: weekdaysValue,
        state: data.state,
        payload: data.payload,
      });

      console.log("Just added rule:", rule);

      const upDatedRuleArray = new Rules(ruleArray.rules).addRule(rule);
      setRuleArray(upDatedRuleArray);

      console.log("Updated rules:", upDatedRuleArray);
      reset();
    } catch (error) {
      console.error("Error creating rule:", error);
    }
  };
  return (
    <div>
      <form className="rule-form" onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>Rule Configuration</legend>
          <FormField name="startDate" control={control} label="Start Date" type="date" />
          <FormField name="endDate" control={control} label="End Date" type="date" />
          <FormField name="startTime" control={control} label="Start Time" type="time" />
          <FormField name="endTime" control={control} label="End Time" type="time" />

          <fieldset className="weekdays-group">
            <legend id="weekdays-legend">Active Days</legend>
            <Controller
              name="weekdays"
              control={control}
              render={({ field: { onChange, value } }) => {
                const weekdaysData = [
                  { value: Weekdays.Monday, label: "Monday", id: "monday" },
                  { value: Weekdays.Tuesday, label: "Tuesday", id: "tuesday" },
                  { value: Weekdays.Wednesday, label: "Wednesday", id: "wednesday" },
                  { value: Weekdays.Thursday, label: "Thursday", id: "thursday" },
                  { value: Weekdays.Friday, label: "Friday", id: "friday" },
                  { value: Weekdays.Saturday, label: "Saturday", id: "saturday" },
                  { value: Weekdays.Sunday, label: "Sunday", id: "sunday" },
                ];

                const handleWeekdayChange = (dayValue: Weekdays, checked: boolean) => {
                  const currentValue = value || [];
                  if (checked) {
                    onChange([...currentValue, dayValue]);
                  } else {
                    onChange(currentValue.filter((day) => day !== dayValue));
                  }
                };

                return (
                  <div className="checkbox-group" role="group" aria-labelledby="weekdays-legend">
                    {weekdaysData.map(({ value: dayValue, label, id }) => (
                      <div key={id} className="checkbox-item">
                        <input
                          type="checkbox"
                          id={id}
                          checked={value?.includes(dayValue) || false}
                          onChange={(e) => handleWeekdayChange(dayValue, e.target.checked)}
                        />
                        <label htmlFor={id}>{label}</label>
                      </div>
                    ))}
                  </div>
                );
              }}
            />
          </fieldset>

          <SelectField
            name="state"
            control={control}
            label="Rule State"
            options={[
              { value: "true", label: "Open" },
              { value: "false", label: "Closed" },
            ]}
          />

          <div className="form-actions">
            <button type="submit">Create Rule</button>
            <button type="button" onClick={() => reset()}>
              Reset Form
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Form;
