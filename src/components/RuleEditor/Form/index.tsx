import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { formatDate, formatRules, formatTime, parseRuleDates } from "../../../code/datetime";
import { Rule } from "../../../code/rule";
import { Rules } from "../../../code/rules";
import { getWeekdayEnums } from "../../../code/weekdays";
import { Button } from "../../Button";
import { FormField } from "./components/FormField";
import { SelectField } from "./components/SelectField";
import { WeekdaysField } from "./components/WeekdaysField";
import styles from "./index.module.css";
import type { FormData, FormProps, RulePayload } from "./types";

const DEFAULT_FORM_VALUES: FormData = {
  startDate: "",
  endDate: "",
  startTime: "",
  endTime: "",
  weekdays: [],
  state: true,
};

// Formats a Rule object -> FormData object
// To populate the form when editing a rule
const ruleToFormData = (rule: Rule<any>): FormData => ({
  startDate: formatDate(rule.startDate),
  endDate: formatDate(rule.endDate),
  startTime: formatTime(rule.startTime),
  endTime: formatTime(rule.endTime),
  weekdays: getWeekdayEnums(rule.weekdays),
  state: rule.state,
  payload: rule.payload,
});

export const Form = ({ rules, setRules, editingRule, editingIndex, onCancelEdit }: FormProps) => {
  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: DEFAULT_FORM_VALUES,
  });

  // onEdit useEffect, populates the form when editing a rule
  useEffect(() => {
    if (editingRule) reset(ruleToFormData(editingRule));
  }, [editingRule, reset]);

  const onSubmit = (data: FormData) => {
    const weekdaysValue = data.weekdays.reduce((acc, val) => acc | val, 0);

    const { startDate, endDate, startTime, endTime } = parseRuleDates(
      data.startDate,
      data.endDate,
      data.startTime,
      data.endTime,
    );

    try {
      const ruleFactory = Rule.getFactory<RulePayload>();
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
        updatedRules.updateRule(editingIndex, newRule);
        console.log("Updating rule at index:", editingIndex);
        onCancelEdit();
      } else {
        updatedRules.addRule(newRule);
        console.log("Just added:", newRule);
      }
      reset(DEFAULT_FORM_VALUES);
      setRules(updatedRules);
      formatRules(updatedRules);
    } catch (error) {
      console.error("Error saving rule:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legends}>{editingRule ? "Edit Rule" : "Create Rule"}</legend>
          <div>
            <div className={styles.formRow}>
              <FormField name="startDate" control={control} label="Start Date" type="date" />
              <FormField name="endDate" control={control} label="End Date" type="date" />
            </div>

            <div className={styles.formRow}>
              <FormField name="startTime" control={control} label="Start Time" type="time" />
              <FormField name="endTime" control={control} label="End Time" type="time" />
            </div>
            <div className={styles.formRow}>
              <WeekdaysField control={control} />
            </div>
            <SelectField
              name="state"
              control={control}
              label="State"
              options={[
                { value: "true", label: "Open" },
                { value: "false", label: "Closed" },
              ]}
            />
          </div>
          <div className={styles.formActions}>
            <Button type="submit" variant="primary" size="small">
              {editingRule ? "Save" : "Create"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="small"
              onClick={() => {
                reset(DEFAULT_FORM_VALUES);
                if (editingRule) onCancelEdit();
              }}
            >
              {editingRule ? "Cancel" : "Reset"}
            </Button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Form;
