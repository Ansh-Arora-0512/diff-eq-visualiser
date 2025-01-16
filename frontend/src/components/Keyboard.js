import { React } from 'react';
import { EditableMathField, StaticMathField } from 'react-mathquill';
import { useEq } from './EqContext';

function EqInput() {
  const { mathFieldRef, writeLatex, eq, setEq } = useEq();
  const blacklisted = ["\\", " ", "{", "}"];
  const braces = ["(", "["];

  function keyPress(mathField, event) {
    const key = event.key;
    prev_is_char = false;
    if (blacklisted.includes(key)) {
      event.preventDefault();
    }
    if (braces.includes(key)) {
      mathField.cmd(key);
      writeLatex("{}", false, 1);
      event.preventDefault;
    }
  }

  return (
    <EditableMathField
      ref={mathFieldRef}
      latex={eq}
      onKeyDown={keyPress}
      onChange={(mathField)=>{setEq(mathField.latex())}}
    />
  )
}

function CalcKey({ expr, isCmd=false, lcount=0, display=undefined }) {
  const { mathFieldRef, writeLatex, eq, setEq } = useEq();

  return (
    <button onClick={() => writeLatex(expr, isCmd, lcount)}>
      <StaticMathField>{display ? display : expr}</StaticMathField>
    </button>
  )
}

function Keyboard() {
  return (
    <div className="Keyboard">
      <table id="Operators">
        <tr>
          <td><CalcKey expr={"\\frac{d}{d{}}{}"} lcount={1}></CalcKey></td>
          <td><CalcKey expr={"\\frac{\\partial}{\\partial{}}{}"} lcount={1}></CalcKey></td>
          <td><CalcKey expr={"\\left({}\\right)"} lcount={3} display={"("}></CalcKey></td> // test lcount = 2
          <td><CalcKey expr={")"} isCmd={true}></CalcKey></td>
        </tr>
        <tr>
          <td><CalcKey expr={"{}^{2}"} lcount={5} display={"x^2"}></CalcKey></td>
          <td><CalcKey expr={"{}^{}"} lcount={4} display={"x^n"}></CalcKey></td>
          <td><CalcKey expr={"\\sqrt{}"} lcount={1} display={"\\sqrt{x}"}></CalcKey></td>
          <td><CalcKey expr={"\\sqrt[]{}"} lcount={3} display={"\\sqrt[n]{x}"}></CalcKey></td> // test lcount = 2
        </tr>
        <tr>
          <td><button><MathJax hideUntilTypeset='first'>{"$ \\pi $"}</MathJax></button></td>
          <td><CalcKey expr={"\\ln{}"} lcount={1} display={"\\ln{x}"}></CalcKey></td>
          <td><CalcKey expr={"\\log{}"} lcount={1} display={"\\sqrt{x}"}></CalcKey></td>          <td><button><MathJax hideUntilTypeset='first'>{"$ \\log{x} $"}</MathJax></button></td>
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
