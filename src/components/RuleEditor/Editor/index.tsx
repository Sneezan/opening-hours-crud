import type { Rule } from "../../../code/rule";
import type { Rules } from "../../../code/rules";
import { Form } from "../Form";

export const Editor = ({
  rules,
  setRules,
  editingRule,
  editingIndex,
  onCancelEdit,
}: {
  rules: Rules<any>;
  setRules: (rules: Rules<any>) => void;
  editingRule: Rule<any> | null;
  editingIndex: number | null;
  onCancelEdit: () => void;
}) => {
  return (
    <div>
      <Form
        rules={rules}
        setRules={setRules}
        editingRule={editingRule}
        editingIndex={editingIndex}
        onCancelEdit={onCancelEdit}
      />
    </div>
  );
};
