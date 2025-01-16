import React, { createContext, useContext, useRef, useState } from 'react';

export const EqContext = createContext();

export function useEq() {
  return useContext(EqContext);
}

export function EqProvider({ children }) {
  const mathFieldRef = useRef(null);
  const [eq, setEq] = useState("");

  const tokens = new Set([
    "{}={}", "{}\\gt{}", "{}\\ge{}", "{}\\lt{}", "{}\\le{}",
    "{}+{}", "{}-{}", "{}\\cdot{}", "{}\\div{}", "{}^{}", "{}_{}", "{}\\to{}",
    "\\frac{}{}", "\\frac{d}{d{}}{}", "\\partial{}", "\\lim_{}{}",
    "\\sqrt{}", "\\sqrt[{}]{}", "\\log{}", "\\log_{}{}", "\\binom{}{}",
    "\\sum_{}^{}{}", "\\prod_{}^{}{}", "\\int_{}^{}{}", "\\oint_{}^{}{}",
    "\\left({}\\right)", "\\left[{}\\right]", "\\left|{}\\right|",
    "\\left\\lfloor{}\\right\\rfloor", "\\left\\lceil{}\\right\\rceil"
  ]);

  function splitBranches(tree, ...operators) {
    const operator = operators[0];
    let new_tree
    let tree_flag
    let len
    let prev
    let char
    let new_branch
    let branch

    for (let branch_index = tree.length - 1; branch >= 0; branch--) {
      branch = tree[branch_index];
      if (typeof branch === "string") {
        new_tree = []
        tree_flag = false
        len = branch.length
        prev = len;
        for (let i = len - 1; i >= 0; i--) {
          char = branch[i];
          if (operators.includes(char)) {
            new_branch.push(char, [], branch.slice(i + 1, prev));
            new_branch = new_branch[1];
            prev = i;
            tree_flag = true;
          }
        }
        if (tree_flag) {
          tree[branch_index] = new_tree;
        }
      } else {
        tree[branch_index] = splitBranches(branch);
      }
    }

    const expr = tree[0]
    const operands = [];
    let operand_index = tree.length - 1;
    new_tree = []
    tree_flag = false
    len = expr.length
    prev = len;
    for (let i = len - 1; i >= 0; i--) {
      char = expr[i];
      if (operators.includes(char) && (i > len - 5 || expr.slice(i + 1, i + 5) != "{}{}")) {
        tree_flag = true;
        new_tree.push(char, [], (operands ? [expr.slice(i + 1, prev), ...operands] : expr.slice(i + 1, prev)));
        new_tree = new_tree[1];
        prev = i;
        operands = [];
      } else if (char === "{") {
        operands.unshift(tree[operand_index]);
        operand_index--;
      }
    }
    return (tree_flag ? new_tree : tree)
  }
  
  function generateTree() {
    const brace_stack = []
    const tree = []
    let expr
    let brace_pairs
    let len
    let operands
    let last_is_num
    let last_is_alpha;

    for (let i = 0; i < eq.length; i++) {
      switch (eq[i]) {
        case "{":
          brace_stack[brace_stack.length - 1].push(i+1);
          brace_stack.push([i + 1]);

        case "}":
          expr = "";
          brace_pairs = brace_stack.pop();
          brace_pairs.push(i);
          len = brace_pairs.length;
          operands = len > 2;
          for (let j = 0; j < len; j+=2) {
            expr += eq.slice(brace_pairs[j], brace_pairs[j+1]);
          }

          if (operands) {
            tree.splice(-operands, operands, [expr, ...tree.slice(-operands)]);
          } else {
            if (!isNaN(expr)) {
              expr = +expr;
            }
            tree.push(expr);
          }
          brace_stack[brace_stack.length - 1].push(i);
      }
    }
    
    tree = splitBranches(tree, "+", "-");
    tree = splitBranches(tree, "\\cdot", "\\div");
    tree = splitBranches(tree, "^");
    return tree;
  }

  function writeLatex(latex, isCmd=false, lcount=0) {
    const mathField = mathFieldRef?.current?.mathField; 
    if (mathField) {
      if (isCmd) {
        mathField.cmd(latex);
      } else {
        mathField.typedText(latex);
      }
      mathField.keystoke("Left ".repeat(lcount));
      setEq(mathField.latex());
    }
  }

  return (
    <EqContext.Provider 
      value={{ 
        mathFieldRef,
        writeLatex,
        eq,
        setEq
      }}
    >
      {children}
    </EqContext.Provider>
  );
}
