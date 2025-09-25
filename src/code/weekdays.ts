export enum Weekdays {
  All = 0b1111111, // 127 in decimal
  Monday = 0b0000001, // 1
  Tuesday = 0b0000010, // 2
  Wednesday = 0b0000100, // 4
  Thursday = 0b0001000, // 8
  Friday = 0b0010000, // 16
  Saturday = 0b0100000, // 32
  Sunday = 0b1000000, // 64
}

// Ordered array of weekdays (for iteration)
const WEEKDAYS_ARRAY: Weekdays[] = [
  Weekdays.Monday,
  Weekdays.Tuesday,
  Weekdays.Wednesday,
  Weekdays.Thursday,
  Weekdays.Friday,
  Weekdays.Saturday,
  Weekdays.Sunday,
];

const WEEKDAY_NAMES: Record<Weekdays, string> = {
  [Weekdays.Monday]: "Monday",
  [Weekdays.Tuesday]: "Tuesday",
  [Weekdays.Wednesday]: "Wednesday",
  [Weekdays.Thursday]: "Thursday",
  [Weekdays.Friday]: "Friday",
  [Weekdays.Saturday]: "Saturday",
  [Weekdays.Sunday]: "Sunday",
  [Weekdays.All]: "All",
};

export const getWeekdayName = (weekday: Weekdays): string => WEEKDAY_NAMES[weekday] ?? "";

// Converts bitmask to array of enums
export const getWeekdayEnums = (weekdays: Weekdays): Weekdays[] =>
  WEEKDAYS_ARRAY.filter((day) => weekdays & day);

// Form data for weekdays
export const getWeekdayFormData = () =>
  WEEKDAYS_ARRAY.map((day) => ({
    value: day,
    label: getWeekdayName(day),
    id: getWeekdayName(day).toLowerCase(),
  }));
