import React from 'react';
import { MathJax } from 'better-react-mathjax';

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
          <td><button><MathJax>{}</MathJax></button></td>
          <td><button><Latex>$ \\frac{\\partial}{\\partial x} $</Latex></button></td>
          <td><button><Latex>$ ( $</Latex></button></td>
          <td><button><Latex>$ ) $</Latex></button></td>
        </tr>
        <tr>
          <td><button><Latex>$ x^2 $</Latex></button></td>
          <td><button><Latex>$ x^y $</Latex></button></td>
          <td><button><Latex>$ \sqrt{x} $</Latex></button></td>
          <td><button><Latex>$ \sqrt[n]{x} $</Latex></button></td>
        </tr>
        <tr></tr>
        <tr></tr>
      </table>
      <table id="Numbers">
        <tr></tr>
        <tr></tr>
        <tr></tr>
        <tr></tr>
      </table>
    </div>
  )
}
