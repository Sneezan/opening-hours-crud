import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { formatDate, formatRules, formatTime, parseRuleDates } from "../../../code/datetime";
import { Rule, type RuleConfig } from "../../../code/rule";
import { Rules } from "../../../code/rules";
import { getWeekdayEnums, getWeekdayFormData, type Weekdays } from "../../../code/weekdays";
import { FormField } from "./components/FormField";
import { SelectField } from "./components/SelectField";
import type { FormData } from "./types";

const DEFAULT_FORM_VALUES: FormData = {
  startDate: "",
  endDate: "",
  startTime: "",
  endTime: "",
  weekdays: [],
  state: true,
};

export const Form = ({
  rules,
  setRules,
  editingRule,
  editingIndex,
  onCancelEdit,
}: {
  rules: Rules<any>;
  setRules: (rules: Rules<any>) => void;
  editingRule: Rule<any> | null;
  editingIndex: number | null;
  onCancelEdit: () => void;
}) => {
  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: DEFAULT_FORM_VALUES,
  });

  // Populate form when editing
  useEffect(() => {
    if (editingRule) {
      const startDate = formatDate(editingRule.startDate);
      const endDate = formatDate(editingRule.endDate);
      const startTime = formatTime(editingRule.startTime);
      const endTime = formatTime(editingRule.endTime);
      const weekdaysArray = getWeekdayEnums(editingRule.weekdays);

      reset({
        startDate,
        endDate,
        startTime,
        endTime,
        weekdays: weekdaysArray,
        state: editingRule.state,
        payload: editingRule.payload,
      });
    }
  }, [editingRule, reset]);

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
      const ruleFactory = Rule.getFactory<RuleConfig<unknown>>();
      const newRule = ruleFactory.make({
        startDate,
        endDate,
        startTime,
        endTime,
        weekdays: weekdaysValue,
        state: data.state,
        payload: data.payload,
      });

      const updatedRules = new Rules([...rules.rules]);

      if (editingRule && editingIndex !== null) {
        // Update existing rule
        updatedRules.updateRule(editingIndex, newRule);
        console.log("Updating rule at index:", editingIndex);
        reset(DEFAULT_FORM_VALUES);
        onCancelEdit(); // Clear editing state
      } else {
        // Create new rule
        updatedRules.addRule(newRule);
        console.log("Just added:", newRule);
        reset(DEFAULT_FORM_VALUES);
      }
      setRules(updatedRules);
      formatRules(updatedRules);
    } catch (error) {
      console.error("Error saving rule:", error);
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
                const weekdaysData = getWeekdayFormData();

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
            <button type="submit">{editingRule ? "Save Changes" : "Create Rule"}</button>
            {editingRule ? (
              <button
                type="button"
                onClick={() => {
                  reset(DEFAULT_FORM_VALUES);
                  onCancelEdit();
                }}
              >
                Cancel Edit
              </button>
            ) : (
              <button type="button" onClick={() => reset(DEFAULT_FORM_VALUES)}>
                Reset Form
              </button>
            )}
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Form;
