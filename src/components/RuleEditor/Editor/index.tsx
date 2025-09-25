import type { Rule } from "../../../code/rule";
import type { Rules } from "../../../code/rules";
import { Form } from "../Form";
import type { RulePayload } from "../Form/types";

interface EditorProps {
  rules: Rules<RulePayload>;
  setRules: (rules: Rules<RulePayload>) => void;
  editingRule: Rule<RulePayload> | null;
  editingIndex: number | null;
  onCancelEdit: () => void;
}

export const Editor = ({
  rules,
  setRules,
  editingRule,
  editingIndex,
  onCancelEdit,
}: EditorProps) => {
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
