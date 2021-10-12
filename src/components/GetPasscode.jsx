import React, { useState } from "react";
import "./GetPasscode.scss";

//Passcode should scramble the data before setting it in local storage
//Should also probably add disclaimer that this app should not be used for secure details because it's open source and thus any scrambling I do can be reverse engineered

function GetPasscode({
  setPassCode,
  removePassCode,
  getRandomCode,
  removeRandomCode,
}) {
  const [displayCode, setDisplayCode] = useState("");

  let digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
    <section className='keypad'>
      <input
        className='keypad__display'
        type='password'
        name=''
        id=''
        value={displayCode}
        disabled
      />
      <div className='keypad__keys'>
        {digits.map((digit) => (
          <button
            className='keypad__key'
            value={digit}
            key={digit}
            onClick={(e) => handleClick(e)}>
            {digit}
          </button>
        ))}
        <button className='keypad__key delete' onClick={handleDelete}>
          Del
        </button>
        <button
          className='keypad__key zero'
          value='0'
          onClick={(e) => handleClick(e)}>
          0
        </button>
        <button className='keypad__key submit' onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <button className='keypad__reset' onClick={handleReset}>
        Reset
      </button>
    </section>
  );
}

export default GetPasscode;
