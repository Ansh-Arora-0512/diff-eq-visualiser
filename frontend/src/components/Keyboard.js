import { React, useState } from 'react';
import { EditableMathField, StaticMathField } from 'react-mathquill';
import { useEq } from './EqContext';

function EqInput() {
  const { mathFieldRef, typeText } = useEq();
  const [eq, setEq] = useState("");

  const operands = {
    "+": ["{}+{}", 3],
    "-": ["{}-{}", 3],
    "*": ["{}\\cdot{}", 2],
    "^": ["{}^{}"],
    "(": ["\\left({}\\right.", 0],
    ")": ["\\left.{}\\right)", 0],
  }

  function onEdit(mathField) {
    setEq(mathField.latex());
  }

  return (
    <div className="Eq">
      <EditableMathField
        ref={mathFieldRef}
        latex={eq}
        onChange={onEdit}
      />
      <p>{eq}</p>
    </div>
  )
}

function CalcKey({ expr }) {
  const { mathFieldRef, typeText } = useEq();

  return (
    <button onClick={() => typeText(expr)}>
      <StaticMathField>{expr}</StaticMathField>
    </button>
  )
}

function Keyboard() {
  return (
    <div className="Keyboard">
      <table id="Variables">
        <tr></tr>
        <tr></tr>
        <tr></tr>
        <tr></tr>
      </table>
      <table id="Operators">
        <tr>
          <td><CalcKey expr={"\\frac{d}{dx}"}></CalcKey></td>
          <td><button><MathJax hideUntilTypeset='first'>{"$ \\frac{d}{dx} $"}</MathJax></button></td>
          <td><button><MathJax hideUntilTypeset='first'>{"$ \\frac{\\partial}{\\partial x} $"}</MathJax></button></td>
          <td><button><MathJax hideUntilTypeset='first'>{"$ ( $"}</MathJax></button></td>
          <td><button><MathJax hideUntilTypeset='first'>{"$ ) $"}</MathJax></button></td>
        </tr>
        <tr>
          <td><button><MathJax hideUntilTypeset='first'>{"$ x^2 $"}</MathJax></button></td>
          <td><button><MathJax hideUntilTypeset='first'>{"$ x^n $"}</MathJax></button></td>
          <td><button><MathJax hideUntilTypeset='first'>{"$ \\sqrt{x} $"}</MathJax></button></td>
          <td><button><MathJax hideUntilTypeset='first'>{"$ \\sqrt[n]{x} $"}</MathJax></button></td>
        </tr>
        <tr>
          <td><button><MathJax hideUntilTypeset='first'>{"$ \\pi $"}</MathJax></button></td>
          <td><button><MathJax hideUntilTypeset='first'>{"$ \\ln{x} $"}</MathJax></button></td>
          <td><button><MathJax hideUntilTypeset='first'>{"$ \\log{x} $"}</MathJax></button></td>
          <td><button><MathJax hideUntilTypeset='first'>{"$ \\log_n{x} $"}</MathJax></button></td>
        </tr>
        <tr>
          <td><button><MathJax hideUntilTypeset='first'>{"$ \\sin{x} $"}</MathJax></button></td>
          <td><button><MathJax hideUntilTypeset='first'>{"$ \\cos{x} $"}</MathJax></button></td>
          <td><button><MathJax hideUntilTypeset='first'>{"$ \\tan{x} $"}</MathJax></button></td>
          <td><button><MathJax hideUntilTypeset='first'>{"$ \\frac{a}{b} $"}</MathJax></button></td>
        </tr>
      </table>
      <table id="Numbers">
      <tr>
          <td><button><MathJax hideUntilTypeset='first'>{"$ 7 $"}</MathJax></button></td>
          <td><button><MathJax hideUntilTypeset='first'>{"$ 8 $"}</MathJax></button></td>
          <td><button><MathJax hideUntilTypeset='first'>{"$ 9 $"}</MathJax></button></td>
          <td><button><MathJax hideUntilTypeset='first'>{"$ \\div $"}</MathJax></button></td>
        </tr>
        <tr>
          <td><button><MathJax hideUntilTypeset='first'>{"$ 4 $"}</MathJax></button></td>
          <td><button><MathJax hideUntilTypeset='first'>{"$ 5 $"}</MathJax></button></td>
          <td><button><MathJax hideUntilTypeset='first'>{"$ 6 $"}</MathJax></button></td>
          <td><button><MathJax hideUntilTypeset='first'>{"$ \\times $"}</MathJax></button></td>
        </tr>
        <tr>
          <td><button><MathJax hideUntilTypeset='first'>{"$ 1 $"}</MathJax></button></td>
          <td><button><MathJax hideUntilTypeset='first'>{"$ 2 $"}</MathJax></button></td>
          <td><button><MathJax hideUntilTypeset='first'>{"$ 3 $"}</MathJax></button></td>
          <td><button><MathJax hideUntilTypeset='first'>{"$ - $"}</MathJax></button></td>
        </tr>
        <tr>
          <td><button><MathJax hideUntilTypeset='first'>{"$ 0 $"}</MathJax></button></td>
          <td><button><MathJax hideUntilTypeset='first'>{"$ . $"}</MathJax></button></td>
          <td><button><MathJax hideUntilTypeset='first'>{"$ = $"}</MathJax></button></td>
          <td><button><MathJax hideUntilTypeset='first'>{"$ + $"}</MathJax></button></td>
        </tr>
      </table>
    </div>
  )
}

export default Keyboard;
