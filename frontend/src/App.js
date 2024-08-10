import './App.css';
import React from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { addStyles } from 'react-mathquill';
import Keyboard from './components/Keyboard';

addStyles();

function App() {
  return (
    <MathJaxContext>
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <Keyboard></Keyboard>
      </div>
    </MathJaxContext>
  );
}

export default App;
