import { format, parse } from "date-fns";
import type { Rules } from "./rules";
import { RulePayload } from "../components/RuleEditor/Form/types";

const DATE_FORMAT = "yyyy-MM-dd";
const TIME_FORMAT = "HH:mm";

// Parsing helper, parses Strings -> Date objects
// To convert form input strings to Date objects.
export const parseRuleDates = (
  startDate: string,
  endDate: string,
  startTime: string,
  endTime: string,
) => ({
  startDate: parse(startDate, DATE_FORMAT, new Date()),
  endDate: parse(endDate, DATE_FORMAT, new Date()),
  startTime: parse(startTime, TIME_FORMAT, new Date(1970, 0, 1)),
  endTime: parse(endTime, TIME_FORMAT, new Date(1970, 0, 1)),
});

// Formatting helper, formats a Date object -> String
// For UI display or logging purposes
export const formatDate = (date: Date) => format(date, DATE_FORMAT);
export const formatTime = (date: Date) => format(date, TIME_FORMAT);

//  Format rules for clean logging
export const formatRules = (rules: Rules<RulePayload>) =>
  console.log(
    rules.rules.map((data) => ({
      startDate: formatDate(data.startDate),
      endDate: formatDate(data.endDate),
      startTime: formatTime(data.startTime),
      endTime: formatTime(data.endTime),
      weekdays: data.weekdays,
      state: data.state,
      payload: data.payload,
    })),
  );
