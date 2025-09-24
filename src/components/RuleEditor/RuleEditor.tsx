import { useState } from "react";
import type { Rule } from "../../code/rule";
import { Rules } from "../../code/rules";
import { Editor } from "./Editor";
import { List } from "./List";

const RuleEditor = () => {
  const [ruleArray, setRuleArray] = useState<Rules<any>>(new Rules([]));
  const [editingRule, setEditingRule] = useState<Rule<any> | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleEditRule = (rule: Rule<any>, index: number) => {
    setEditingRule(rule);
    setEditingIndex(index);
  };

  const handleCancelEdit = () => {
    setEditingRule(null);
    setEditingIndex(null);
  };

  return (
    <div>
      <List rules={ruleArray} onEditRule={handleEditRule} />
      <Editor
        rules={ruleArray}
        setRules={setRuleArray}
        editingRule={editingRule}
        editingIndex={editingIndex}
        onCancelEdit={handleCancelEdit}
      />
    </div>
  );
};
export default RuleEditor;
