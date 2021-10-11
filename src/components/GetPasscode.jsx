import React, { useState } from "react";
import { useSessionStorage, useLocalStorage } from "../useStorage";

//Passcode should scramble the data before setting it in local storage
//Should also probably add disclaimer that this app should not be used for secure details because it's open source and thus any scrambling I do can be reverse engineered

function GetPasscode({
  passCode,
  setPassCode,
  removePassCode,
  randomCode,
  getRandomCode,
  removeRandomCode,
}) {
  const [displayCode, setDisplayCode] = useState("");

  let digits = [];
  for (let i = 0; i <= 9; i++) {
    digits = [...digits, i];
  }

  const handleClick = (e) => {
    if (displayCode.length > 5) return;
    let num = displayCode;
    num = num.concat(e.target.value.toString());
    setDisplayCode(num);
  };

  const handleDelete = () => {
    if (displayCode.length <= 0) return;
    let num = displayCode;
    num = num.slice(0, -1);
    setDisplayCode(num);
  };

  const handleSubmit = () => {
    setPassCode(displayCode);
    getRandomCode();
    setDisplayCode("");
  };

  const handleReset = () => {
    removePassCode();
    removeRandomCode();
  };

  return (
    <div>
      <p>{displayCode}</p>
      <p>{passCode}</p>
      <p>{randomCode}</p>
      <div>
        {digits.map((digit) => (
          <button value={digit} key={digit} onClick={(e) => handleClick(e)}>
            {digit}
          </button>
        ))}
        <button onClick={handleDelete}>Del</button>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default GetPasscode;
