import React, { useState } from "react";
import { evaluate } from "mathjs";
import "./App.css";
import Button from "./components/Button";
import Input from "./components/Input";

const DEFAULT_BUTTON_COLOR = "#f2a33c";
const CLEAR_BUTTON_COLOR = "#da5252";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const addToText = (val) => {
    setText((text) => [...text, val + " "]);
  };

  const calculateResult = () => {
    const input = text.join("");
    setResult(evaluate(input));
  };

  const resetInput = () => {
    setText("");
    setResult("");
  };

  const buttonRows = [
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "+"],
    ["0", ".", "=", "-"],
  ];

  const renderButtonRow = (row) => (
    <div className="row" key={row.join("")}>
      {row.map((symbol, index) => (
        <Button
          key={symbol}
          symbol={symbol}
          color={index % 4 === 3 ? DEFAULT_BUTTON_COLOR : undefined}
          handleClick={symbol === "=" ? calculateResult : addToText}
        />
      ))}
    </div>
  );

  return (
    <div className="App">
      <div className="calc-wrapper">
        <Input text={text} result={result} />
        {buttonRows.map((row) => renderButtonRow(row))}
        <Button
          symbol="Clear"
          color={CLEAR_BUTTON_COLOR}
          handleClick={resetInput}
        />
      </div>
    </div>
  );
}

export default App;
