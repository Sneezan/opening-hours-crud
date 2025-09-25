import { formatDate, formatTime } from "../../../code/datetime";
import type { Rule } from "../../../code/rule";
import type { Rules } from "../../../code/rules";
import { getWeekdayEnums, getWeekdayName, type Weekdays } from "../../../code/weekdays";
import Button from "../../Button";
import type { RulePayload } from "../Form/types";
import styles from "./index.module.css";

interface TableProps {
  rules: Rules<RulePayload>;
  onEditRule: (rule: Rule<RulePayload>, index: number) => void;
}

export const Table = ({ rules, onEditRule }: TableProps) => {
  return (
    <div className={styles.rulesList}>
      {rules.rules.length === 0 ? (
        <h1 className={styles.noRules}>No rules yet</h1>
      ) : (
        <div className={styles.rulesTableContainer}>
          <table className={styles.rulesTable}>
            <thead>
              <tr>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Active Days</th>
                <th>State</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rules.rules.map((rule, index) => (
                <tr key={index} className={styles.ruleRow}>
                  <td>{formatDate(rule.startDate)}</td>
                  <td>{formatDate(rule.endDate)}</td>
                  <td>{formatTime(rule.startTime)}</td>
                  <td>{formatTime(rule.endTime)}</td>
                  <td>
                    <div className={styles.weekdaysList}>
                      {getWeekdayEnums(rule.weekdays).map((day: Weekdays, dayIndex: number) => (
                        <span key={dayIndex} className={styles.weekdayTag}>
                          {getWeekdayName(day)}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span
                      className={`${styles.stateBadge} ${rule.state ? styles.stateOpen : styles.stateClosed}`}
                    >
                      {rule.state ? "Open" : "Closed"}
                    </span>
                  </td>
                  <td>
                    <Button
                      variant="secondary"
                      size="small"
                      type="button"
                      onClick={() => onEditRule(rule, index)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
