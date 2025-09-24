import { format, parse } from "date-fns";
import type { Rules } from "./rules";

const DATE_FORMAT = "yyyy-MM-dd";
const TIME_FORMAT = "HH:mm";
const LOG_DATE_FORMAT = "MM-dd-yyyy";
const LOG_TIME_FORMAT = "HH:mm:ss";

// Parsing helpers: convert form input strings into Date objects
export const parseDate = (value: string): Date => parse(value, DATE_FORMAT, new Date());

export const parseTime = (value: string): Date => parse(value, TIME_FORMAT, new Date(1970, 0, 1));

export const parseRuleDates = (
  startDate: string,
  endDate: string,
  startTime: string,
  endTime: string,
) => ({
  startDate: parseDate(startDate),
  endDate: parseDate(endDate),
  startTime: parseTime(startTime),
  endTime: parseTime(endTime),
});

// --- Formatting helpers ---
export const formatDate = (date: Date, forLog = false): string =>
  format(date, forLog ? LOG_DATE_FORMAT : DATE_FORMAT);

export const formatTime = (date: Date, forLog = false): string =>
  format(date, forLog ? LOG_TIME_FORMAT : TIME_FORMAT);

// --- Format rules for logging ---
export const formatRules = (rules: Rules<any>) => {
  console.log(
    rules.rules.map((rule) => ({
      startDate: formatDate(rule.startDate, true),
      endDate: formatDate(rule.endDate, true),
      startTime: formatTime(rule.startTime, true),
      endTime: formatTime(rule.endTime, true),
      weekdays: rule.weekdays,
      state: rule.state,
      payload: rule.payload,
    })),
  );
};
