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
    <div className='notes__note'>
      {editing ? (
        <div className='notes__note_editing'>
          <input
            ref={titleRef}
            className='notes__note_editing_title'
            type='text'
            name='newNote'
            defaultValue={unScrambler(note.title, keyNumber)}
          />
          <textarea
            ref={textRef}
            className='notes__note_editing_text'
            name='newNote'
            defaultValue={unScrambler(note.text, keyNumber)}
          />
          <button className='notes__button submit' onClick={submitEdit}>
            Submit Edit
          </button>
        </div>
      ) : (
        <div className='notes__note_content'>
          <div className='notes__note_date'>
            {new Date(note.date).toLocaleDateString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <h3 className='notes__note_title'>
            {unScrambler(note.title, keyNumber)}
          </h3>
          <p className='notes__note_text'>
            {unScrambler(note.text, keyNumber)}
          </p>
          <button
            className='notes__button delete'
            onClick={() => onDeleteNote(note.id)}>
            Delete Note
          </button>
          <button
            className='notes__button edit'
            onClick={() => setEditing(true)}>
            Edit Note
          </button>
        </div>
      )}
    </div>
  );
}

export default Note;
