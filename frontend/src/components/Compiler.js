function tokenise(eq) {
  const tokens = eq.match(/(?<=\\)[a-zA-Z]+|[=+*^\-\/[\]{}(),]|[0-9]+(\.[0-9]+)?|[a-zA-Z](_[a-zA-Z0-9]|_{[a-zA-Z]*[0-9]*\.?[0-9]*})?/g);
  for (const i = 0; i < tokens.length(); i++) {
    if (tokens[i] == "left" || tokens[i] == "right") {
        tokens.splice(i, 1);
    } 
    if (tokens[i] == "-" && (i == 0 || open_braces.includes(tokens[i-1]))) {
        tokens[i] = "unaryMinus";
    }
    if (tokens[i] == "+" && (i == 0 || open_braces.includes(tokens[i-1]))) {
        tokens.splice(i, 1);
    }
  }
  return tokens;
}

function shuntingYard(expr_queue) {
  const output_stack = [];
  const operator_stack = [];
  let current;
  let operator;
  
  function checkFunction() {
    if (operator_stack.at(-1) in functions) {
      operator = operator_stack.pop();
      if (operator == "sqrt" && operator_stack.at(-2) == "]") {
        output_stack.push(new math.FunctionNode("pow", [output_stack.pop(), new math.FunctionNode("divide", [1, output_stack.pop()])]));
      } else {
        output_stack.push(new math.FunctionNode(operator, output_stack.splice(functions[operator])));
      }
    }
  }

  while (expr_queue) {
    current = expr_queue.shift();

    if (current in operators) {
      checkFunction();
      operator = operator_stack.at(-1);
      while ((operator in operators) && (operators[operator][2] >= operators[current][2])) {
        output_stack.push(new math.OperatorNode(operator, operators[operator][0], output_stack.splice(operators[operator][1])));
        operator_stack.pop();
        operator = operator_stack.at(-1);
      }
      operator_stack.push(current);
    }

    else if (current in functions) {
      operator_stack.push(current);
    }

    else if (open_braces.includes(current)) {
      operator_stack.push(current);
    }

    else if (current in braces) {
      checkFunction();
      while (operator_stack.at(-1) != braces[current]) {
        operator = operator_stack.pop();
        output_stack.push(new math.OperatorNode(operator, operators[operator][0], output_stack.splice(operators[operator][1])));
      }
      operator_stack.pop();
    }

    else if (current == ",") {
      checkFunction();
      while (!open_braces.includes(operator_stack.at(-1))) {
        operator = operator_stack.pop();
        output_stack.push(new math.OperatorNode(operator, operators[operator][0], output_stack.splice(operators[operator][1])));
      }
    }

    else {
        if (!isNaN(current) || current == "pi" || current == "e" || current == "i") {
            output_stack.push(new math.ConstantNode(current))
        } else {
            output_stack.push(new math.SymbolNode(current))
        }
        if (!(expr_queue[0] in operators)) {
            expr_queue.unshift("*");
        }
    }
  }

  checkFunction()
  while (operator_stack) {
    operator = operator_stack.pop();
    output_stack.push(new math.OperatorNode(operator, operators[operator][0], output_stack.splice(operators[operator][1])));
  }

  return output_stack[0];
}
