import React, { useState, useEffect } from "react";
import "./GetPasscode.scss";

//Passcode should scramble the data before setting it in local storage
//Should also probably add disclaimer that this app should not be used for secure details because it's open source and thus any scrambling I do can be reverse engineered

function GetPasscode({
  setPassCode,
  removePassCode,
  randomCode,
  getRandomCode,
  removeRandomCode,
}) {
  const [displayCode, setDisplayCode] = useState("");
  const [initialized, setInitialized] = useState(false);

  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  useEffect(() => {
    randomCode ? setInitialized(true) : setInitialized(false);
  }, [randomCode]);

  const handleClick = (e) => {
    if (displayCode.length > 5) return;
    let num = displayCode;
    num = num.concat(e.target.value.toString());
    setDisplayCode(num);
  };

  const handleDelete = () => {
    setDisplayCode("");
  };

  const handleSubmit = () => {
    setPassCode(displayCode);
    getRandomCode();
    setDisplayCode("");
  };

  const handleReset = () => {
    if (
      window.confirm(
        "Resetting will cause all notes to be unreadable. Are you sure?"
      )
    ) {
      removePassCode();
      removeRandomCode();
    }
    setDisplayCode("");
  };

  return (
    <>
      <section className='keypad'>
        <input
          className='keypad__display'
          type='password'
          title='passcode'
          value={displayCode}
          readOnly
        />
        {!initialized && (
          <p className='keypad__initialization'>
            Please input a new passcode to initialize the app
          </p>
        )}
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
            x
          </button>
          <button
            className='keypad__key zero'
            value='0'
            onClick={(e) => handleClick(e)}>
            0
          </button>
          <button className='keypad__key submit' onClick={handleSubmit}>
            ✓
          </button>
        </div>
        <button className='keypad__reset' onClick={handleReset}>
          Reset
        </button>
      </section>
    </>
  );
}

export default GetPasscode;
