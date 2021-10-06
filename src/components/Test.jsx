import React, { useState, useRef } from "react";

function Test() {
  const [passcode, setPasscode] = useState();
  const [randomCode, setRandomCode] = useState();
  const [notes, setNotes] = useState([
    {
      label: "this is a label",
      text: "this is the content",
    },
  ]);

  const inputRef = useRef();

  const getRandomCode = () => {
    setRandomCode(Math.floor(Math.random() * 999999));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPasscode(inputRef.current.value);
    getRandomCode();
    e.target.reset();
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor='passcode'> Passcode:</label>
        <input
          type='number'
          maxLength='6'
          placeholder='number here'
          htmlFor='passcode'
          ref={inputRef}
        />
        <input type='submit' value='Set Passcode' />
      </form>
      <br />
      <div>
        Note Heading
        <input type='text' />
      </div>
      <br />
      <div>
        Note content
        <input type='text' />
      </div>
      <br />
      <div>
        <p>{passcode}</p>
        <p>{randomCode}</p>
        <br />
        <h3>{notes[0].label}</h3>
        <br />
        <p>{notes[0].text}</p>
      </div>
    </div>
  );
}

export default Test;
