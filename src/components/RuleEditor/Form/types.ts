import type { Control } from "react-hook-form";
import type { Rule } from "../../../code/rule";
import type { Rules } from "../../../code/rules";
import type { Weekdays } from "../../../code/weekdays";

// Define the payload type - can be extended for specific use cases
export type RulePayload = Record<string, unknown> | null;

export type FormData = {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  weekdays: Weekdays[];
  state: boolean;
  payload?: RulePayload;
};

export interface FormProps {
  rules: Rules<RulePayload>;
  setRules: (rules: Rules<RulePayload>) => void;
  editingRule: Rule<RulePayload> | null;
  editingIndex: number | null;
  onCancelEdit: () => void;
}

export interface BaseFieldProps {
  name: keyof FormData;
  control: Control<FormData>;
  label: string;
}

export interface FormFieldProps extends BaseFieldProps {
  type?: string;
  placeholder?: string;
}

export interface SelectFieldProps extends BaseFieldProps {
  options: { value: string; label: string }[];
}
