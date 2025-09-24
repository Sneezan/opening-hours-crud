import type { Factory } from "./factory";
import type { Weekdays } from "./weekdays";

export interface RuleConfig<T> {
  startDate: Date | string;
  endDate: Date | string;
  startTime: Date | string;
  endTime: Date | string;
  weekdays: Weekdays;
  state: boolean;
  payload?: T;
}

export class Rule<T> {
  startDate: Date; //YYYY-MM-DD
  endDate: Date; //YYYY-MM-DD
  startTime: Date; //HH:MM:SS
  endTime: Date; //HH:MM:SS
  weekdays: Weekdays; // See weekdays.ts for bit flags.
  state: boolean; // True if the rule is open, false if the rule is closed
  payload?: T; // Optional payload for the rule. In case one would want to store some data with the rule. Like prices for example.

  constructor(json: RuleConfig<T>) {
    this.startDate = new Date(json.startDate);
    this.endDate = new Date(json.endDate);
    this.startTime = new Date(json.startTime);
    this.endTime = new Date(json.endTime);
    this.weekdays = json.weekdays;
    this.state = json.state;
    this.payload = json.payload as T;
  }

  static getFactory<T>(): Factory<Rule<T>> {
    return new (class implements Factory<Rule<T>> {
      make(json: RuleConfig<T>): Rule<T> {
        return new Rule<T>(json);
      }
    })();
  }
}
