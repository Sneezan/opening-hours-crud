import { formatDate, formatTime } from "./datetime";
import type { Factory } from "./factory";
import { Weekdays } from "./weekdays";

export interface RuleInit<T> {
  name: string;
  startDate: Date | string;
  endDate: Date | string;
  startTime: Date | string;
  endTime: Date | string;
  weekdays: Weekdays | Weekdays[];
  state: boolean;
  payload?: T;
}

export class Rule<T> {
  name: string; // Name of the rule
  startDate: Date; //YYYY-MM-DD
  endDate: Date; //YYYY-MM-DD
  startTime: Date; //HH:MM:SS
  endTime: Date; //HH:MM:SS
  weekdays: Weekdays; // See weekdays.ts for bit flags.
  state: boolean; // True if the rule is open, false if the rule is closed
  payload?: T; // Optional payload for the rule. In case one would want to store some data with the rule. Like prices for example.

  constructor(json: RuleInit<T>) {
    const toBitmask = (v: Weekdays | Weekdays[]) =>
      Array.isArray(v) ? v.reduce((acc, d) => acc | d, 0) : (v as Weekdays);

    this.name = json.name;
    this.startDate = new Date(json.startDate);
    this.endDate = new Date(json.endDate);
    this.startTime = new Date(json.startTime);
    this.endTime = new Date(json.endTime);
    this.weekdays = toBitmask(json.weekdays);
    this.state = json.state;
    this.payload = json.payload as T;
  }

  // Converting bit flags to "readable" weekday names
  getWeekdayNames(): string | string[] {
    if (this.weekdays === Weekdays.All) {
      return "Weekdays.All";
    }

    const names = Object.entries(Weekdays)
      .filter(
        ([name, value]) =>
          name !== "All" && typeof value === "number" && (this.weekdays & value) === value,
      )
      .map(([name]) => `Weekdays.${name}`);

    return names.length === 1 ? names[0] : names;
  }

  toJSON() {
    return {
      name: this.name,
      startDate: formatDate(this.startDate),
      endDate: formatDate(this.endDate),
      startTime: formatTime(this.startTime),
      endTime: formatTime(this.endTime),
      weekdays: this.getWeekdayNames(),
      state: this.state,
      payload: this.payload,
    };
  }

  static getFactory<T>(): Factory<Rule<T>> {
    return new (class implements Factory<Rule<T>> {
      make(json: any): Rule<T> {
        return new Rule<T>(json);
      }
    })();
  }
}
