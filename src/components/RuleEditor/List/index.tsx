import { formatDate, formatTime } from "../../../code/datetime";
import type { Rule } from "../../../code/rule";
import type { Rules } from "../../../code/rules";
import { getWeekdayNames } from "../../../code/weekdays";
import styles from "./index.module.css";

export const List = ({
  rules,
  onEditRule,
}: {
  rules: Rules<any>;
  onEditRule: (rule: Rule<any>, index: number) => void;
}) => {
  return (
    <div className={styles.rulesList}>
      <h2>Rules List ({rules.rules.length} rules)</h2>

      {rules.rules.length === 0 ? (
        <p className={styles.noRules}>
          No rules created yet. Use the form below to create your first rule.
        </p>
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
                <th>Payload</th>
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
                      {getWeekdayNames(rule.weekdays).map((day, dayIndex) => (
                        <span key={dayIndex} className={styles.weekdayTag}>
                          {day}
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
                    {rule.payload ? (
                      <code className={styles.payloadCode}>{JSON.stringify(rule.payload)}</code>
                    ) : (
                      <span className={styles.noPayload}>-</span>
                    )}
                  </td>
                  <td>
                    <button
                      type="button"
                      className={styles.editButton}
                      onClick={() => onEditRule(rule, index)}
                    >
                      Edit
                    </button>
                    <button type="button" className={styles.deleteButton}>
                      Delete
                    </button>
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
