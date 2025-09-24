import type { Weekdays } from "../../../code/weekdays";

export type FormData = {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  weekdays: Weekdays[];
  state: boolean;
  payload?: unknown;
};
