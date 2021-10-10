import React, { useState, useRef } from "react";
import { scrambler, unScrambler } from "../scrambler";

function Test() {
  const [passcode, setPasscode] = useState();
  const [randomCode, setRandomCode] = useState();
  const [testState, setTestState] = useState("");
  const [scrambledState, setScrambledState] = useState("");
  const [test2State, setTest2State] = useState("");
  const [scrambled2State, setScrambled2State] = useState("");
  const [notes, setNotes] = useState([
    {
      label: "this is a label",
      text: "this is the content",
    },
  ]);

  const inputRef = useRef();

  const getRandomCode = () => {
    if (randomCode) return;
    setRandomCode(Math.floor(Math.random() * 999999));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputRef.current.value) return;
    setPasscode(inputRef.current.value);
    getRandomCode();
    e.target.reset();
  };

  const handleChange = (e) => {
    setTestState(e.target.value);
  };

  const handle2Change = (e) => {
    setTest2State(e.target.value);
  };

  const scrambleText = () => {
    if (!randomCode) return;
    setScrambledState(scrambler(testState, Math.abs(passcode - randomCode)));
  };
  const unScrambleText = () => {
    if (!randomCode) return;
    setScrambled2State(
      unScrambler(test2State, Math.abs(passcode - randomCode))
    );
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
        <br />
        <input type='text' onChange={(e) => handleChange(e)} />
        <p>{scrambledState}</p>
        <button onClick={scrambleText}>Scramble</button>
        <br />
        <input type='text' onChange={(e) => handle2Change(e)} />
        <p>{scrambled2State}</p>
        <button onClick={unScrambleText}>UnScramble</button>
      </div>
    </div>
  );
}

export default Test;
