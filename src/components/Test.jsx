import React, { useState } from "react";

function Test() {
  const [passcode, setPasscode] = useState();
  const [notes, setNotes] = useState([{}]);

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
        <h3>Heading</h3>
        <br />
        <p>Content</p>
      </div>
    </div>
  );
}

export default Test;
