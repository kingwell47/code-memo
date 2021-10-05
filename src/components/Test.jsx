import React, { useState } from "react";

function Test() {
  const [passcode, setPasscode] = useState();
  const [notes, setNotes] = useState([
    {
      label: "this is a label",
      text: "this is the content",
    },
  ]);

  return (
    <div>
      <div>
        Passcode:
        <input type='number' maxLength='6' placeholder='number here' />
      </div>
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
        <p>Display</p>
        <br />
        <h3>{notes.label}</h3>
        <br />
        <p>{notes.text}</p>
      </div>
    </div>
  );
}

export default Test;
