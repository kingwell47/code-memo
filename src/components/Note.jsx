import React, { useState, useRef } from "react";

function Note({ note, onEditNote, onDeleteNote }) {
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
            defaultValue={note.title}
          />
          <textarea
            ref={textRef}
            name='newNote'
            id=''
            defaultValue={note.text}
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
          <h3>{note.title}</h3>
          <p>{note.text}</p>
          <button onClick={() => onDeleteNote(note.id)}>Delete Note</button>
          <button onClick={() => setEditing(true)}>Edit Note</button>
        </div>
      )}
    </div>
  );
}

export default Note;
