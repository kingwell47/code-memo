import React, { useState } from "react";

//Passcode should scramble the data before setting it in local storage
//Should also probably add disclaimer that this app should not be used for secure details because it's open source and thus any scrambling I do can be reverse engineered

function GetPasscode() {
  const [passCode, setPassCode] = useState("");
  const [displayCode, setDisplayCode] = useState("");
  const [randomCode, setRandomCode] = useState("");

  let digits = [];
  for (let i = 0; i <= 9; i++) {
    digits = [...digits, i];
  }

  const getRandomCode = () => {
    if (randomCode) return;
    setRandomCode(Math.floor(Math.random() * 999999));
  };

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
      </div>
    </div>
  );
}

export default GetPasscode;
