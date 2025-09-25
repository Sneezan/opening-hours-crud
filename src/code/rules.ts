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

  // Update a rule at a given index, ie updated rule stays the same priority.
  updateRule(index: number, rule: Rule<T>): this {
    if (index < 0 || index >= this.rules.length) {
      throw new Error(`Index ${index} is out of bounds for rules array.`);
    }
    this.rules[index] = rule;
    return this;
  }
}
