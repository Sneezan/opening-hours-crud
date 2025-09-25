import { useState } from "react";
import type { Rule } from "../../code/rule";
import { Rules } from "../../code/rules";
import { Button } from "../Button";
import { Editor } from "./Editor";
import type { RulePayload } from "./Form/types";
import { Table } from "./Table";

type EditingState = {
  rule: Rule<RulePayload> | null;
  index: number | null;
  isOpen: boolean;
};

const RuleEditor = () => {
  const [ruleArray, setRuleArray] = useState<Rules<RulePayload>>(new Rules([]));
  const [editing, setEditing] = useState<EditingState>({ rule: null, index: null, isOpen: false });

  const startEdit = (rule: Rule<RulePayload> | null = null, index: number | null = null) => {
    setEditing({ rule, index, isOpen: true });
  };

  const cancelEdit = () => {
    setEditing({ rule: null, index: null, isOpen: false });
  };

  return (
    <div>
      <Table rules={ruleArray} onEditRule={(rule, index) => startEdit(rule, index)} />
      <div>
        {!editing.isOpen && (
          <Button onClick={() => startEdit()} rounded variant="primary" size="small">
            +
          </Button>
        )}
        {editing.isOpen && (
          <Editor
            rules={ruleArray}
            setRules={setRuleArray}
            editingRule={editing.rule}
            editingIndex={editing.index}
            onCancelEdit={cancelEdit}
          />
        )}
      </div>
    </div>
  );
};

export default RuleEditor;
