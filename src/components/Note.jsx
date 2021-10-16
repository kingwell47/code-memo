import React, { useState, useRef } from "react";
import { unScrambler } from "../hooks/scrambler";

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

  const cancelEdit = () => {
    setEditing(false);
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
          <div className='button_wrapper'>
            <button
              className='notes__button submit'
              onClick={submitEdit}
              title='Submit edit'>
              <i class='fas fa-check' />
            </button>
            <button
              className='notes__button cancel'
              onClick={cancelEdit}
              title='Cancel edit'>
              <i class='fas fa-times' />
            </button>
          </div>
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
          <div className='button_wrapper'>
            <button
              className='notes__button edit'
              onClick={() => setEditing(true)}
              title='Edit note'>
              <i class='fas fa-edit' />
            </button>
            <button
              className='notes__button delete'
              onClick={() => onDeleteNote(note.id)}
              title='Delete note'>
              <i class='fas fa-trash-alt' />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Note;
