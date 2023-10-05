import React, { useEffect, useState } from "react";
import { Textarea } from "./components/TeaxtArea/Textarea";
import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([]);
  const [duplicates, setDuplicates] = useState([]);
  const [status, setStatus] = useState(false);

  // Validation functions
  const isValidAddress = (address) =>
    address.length === 42 && address.indexOf("0x") === 0;
  const isValidBalance = (balance) => !isNaN(balance);

  const validateLine = (line, lineNumber) => {
    const [address, balance] = line.split(/[=, ]/);
    const addressError = !isValidAddress(address)
      ? `Invalid Ethereum address`
      : null;
    const balanceError = !isValidBalance(balance) ? `Invalid amount` : null;

    if (addressError || balanceError) {
      const errors = [];
      if (addressError) errors.push(`Line no ${lineNumber}: ${addressError}`);
      if (balanceError) errors.push(`Line no ${lineNumber}: ${balanceError}`);
      return errors.join(", ");
    }

    return null;
  };

  const inputValidation = (inputValues, event) => {
    const results = inputValues
      .map((line, index) => validateLine(line, index + 1))
      .filter(Boolean);
    setOutput(results);
    const duplicateLines = findDuplicates(inputValues);
    if (duplicateLines.length) {
      setStatus(true);
      setDuplicates(duplicateLines);
    } else {
      setStatus(false);
      setDuplicates([]);
    }

    // Check if there are any validation errors
    const hasValidationErrors = results.length > 0 || duplicateLines.length > 0;

    // If there are no validation errors, prevent the default action
    if (!hasValidationErrors) {
      event.preventDefault(); // Prevent the default form submission
      setValue("");
    }
  };
  const findDuplicates = (inputValues) => {
    const duplicates = [];
    const unique = Array.from(new Set(inputValues));
    for (let j = 0; j < unique.length; j++) {
      let elementToFind = unique[j]; // Change this to the element you want to find

      let duplicateIndices = [];
      for (let i = 0; i < inputValues.length; i++) {
        if (inputValues[i] === elementToFind) {
          duplicateIndices.push(i + 1);
        }
      }
      if (duplicateIndices.length > 1) {
        duplicates.push(
          `"${elementToFind}" duplicates in line: ${duplicateIndices.join(
            ", "
          )}`
        );
      }
    }
    return duplicates;
  };

  const removeDuplicates = (inputValues) => {
    const unique = Array.from(new Set(inputValues));
    setStatus(false);
    const joinedString = unique.join("\n");

    setValue(joinedString);
    setDuplicates([]);
  };

  const findDuplicatesAndAddBalances = (inputValues) => {
    const balances = {};

    inputValues.forEach((line) => {
      const [address, balanceStr] = line.split(/[=, ]/);
      const balance = parseInt(balanceStr, 10);

      if (!isNaN(balance)) {
        if (address in balances) {
          balances[address] += balance;
        } else {
          balances[address] = balance;
        }
      }
    });

    const result = Object.keys(balances).map(
      (address) => `${address}=${balances[address]}`
    );

    setStatus(false);
    const joinedString = result.join("\n");

    setDuplicates([]);
    setValue(joinedString);
  };

  useEffect(() => {
    setInput(value.split("\n"));
  }, [value]);

  return (
    <div className="App">
      <Textarea
        name="test-textarea"
        value={value}
        onValueChange={setValue}
        numOfLines={1}
      />
      <br />

      {output.length > 0 && (
        <div className="outPut">
          {output.map((result, index) => (
            <p key={index}>{result}</p>
          ))}
        </div>
      )}
      {duplicates.length > 0 && (
        <div className="outPut">
          {duplicates.map((result, index) => (
            <p key={index}>{result}</p>
          ))}
        </div>
      )}

      <br />

      {status && (
        <div>
          <button className="enjoy-css" onClick={() => removeDuplicates(input)}>
            Remove Duplicates
          </button>
          <span style={{ margin: "0 10px" }}></span>
          <button
            className="enjoy-css"
            onClick={() => findDuplicatesAndAddBalances(input)}
          >
            Add Balances
          </button>
        </div>
      )}

      <br />
      <button
        className="myButton"
        onClick={(event) => inputValidation(input, event)}
      >
        Next
      </button>
    </div>
  );
}

export default App;
