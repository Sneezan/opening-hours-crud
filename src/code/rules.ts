import type { Rule } from "./rule";

export class Rules<T> {
  rules: Rule<T>[]; // Rules are stored in an array where the last rule has the highest priority and the first rule has the lowest priority.

  constructor(rules: Rule<T>[]) {
    this.rules = rules;
  }

  addRule(rule: Rule<T>) {
    this.rules.push(rule);
    return this;
  }
}
