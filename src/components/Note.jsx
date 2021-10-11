import React, { useState, useRef } from "react";
import { unScrambler } from "../scrambler";

function Note({ note, onEditNote, onDeleteNote, keyNumber }) {
  const [editing, setEditing] = useState(false);

  const titleRef = useRef();
  const textRef = useRef();

  const submitEdit = () => {
    setEditing(false);
    onEditNote(note.id, titleRef.current.value, textRef.current.value);
    titleRef.current.value = "";
    textRef.current.value = "";
  };

  return (
    <div>
      {editing ? (
        <div>
          <input
            ref={titleRef}
            type='text'
            name='newNote'
            id=''
            defaultValue={unScrambler(note.title, keyNumber)}
          />
          <textarea
            ref={textRef}
            name='newNote'
            id=''
            defaultValue={unScrambler(note.text, keyNumber)}
          />
          <button onClick={submitEdit}>Submit Edit</button>
        </div>
      ) : (
        <div>
          <div>
            {new Date(note.date).toLocaleDateString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <h3>{unScrambler(note.title, keyNumber)}</h3>
          <p>{unScrambler(note.text, keyNumber)}</p>
          <button onClick={() => onDeleteNote(note.id)}>Delete Note</button>
          <button onClick={() => setEditing(true)}>Edit Note</button>
        </div>
      )}
    </div>
  );
}

export default Note;
