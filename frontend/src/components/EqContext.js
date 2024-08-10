import React, { createContext, useContext, useRef, useState } from 'react';

const EqContext = createContext();

export function useEq() {
  return useContext(EqContext);
}

export function EqProvider({ children }) {
  const mathFieldRef = useRef(null);
  const eqTree = [];

  const operators = ["+", "-", "\\cdot", "^", "="];
  const braces = ["(", "[", "{", ")", "]", "}"];

  function generateTree() {
    const eq = mathFieldRef?.current?.mathField ? mathFieldRef.current.mathField.latex() : "";
    const branches = [];
    let branch = [];
    let token = "";
    let char = "";
    let operand = false;

    for (let i = 0; i < eq.length; i++) {
      char = eq[i];
      if (char == "{") {
        if (token) {
          branches.push(branch);
          branch.push([token]);
          branch = branch[-1];
        } else if (operand) {
          
        }
      }
      if (char == "}") {
        operand = true;
      } else if (operand) {
        operand = false;
      }
    }
  }

  function typeText(text) {
    if (mathFieldRef?.current?.mathField) {
      mathFieldRef.current.mathField.typedText(text);
    }
  }

  return (
    <EqContext.Provider 
      value={{ 
        mathFieldRef,
        typeText,
      }}
    >
      {children}
    </EqContext.Provider>
  );
}
