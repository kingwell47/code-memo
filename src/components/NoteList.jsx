import React, { useState, useRef } from "react";
import { nanoid } from "nanoid";
import Note from "./Note";
import { useLocalStorage } from "../useStorage";
import { scrambler } from "../scrambler";
import "./NoteList.scss";

function NoteList({ passCode, randomCode, removePassCode }) {
  const [notes, setNotes] = useLocalStorage("notes", []);
  const [addingNote, setAddingNote] = useState(false);
  const titleRef = useRef();
  const textRef = useRef();

  const onAddNote = () => {
    let newNote = {
      id: nanoid(),
      title: scrambler(titleRef.current.value, Math.abs(passCode - randomCode)),
      text: scrambler(textRef.current.value, Math.abs(passCode - randomCode)),
      date: Date.now(),
    };

    setNotes([newNote, ...notes]);
    titleRef.current.value = "";
    textRef.current.value = "";
    setAddingNote(false);
  };

  const onEditNote = (id, newTitle, newText) => {
    const allNotes = [...notes];
    const toEditIndex = allNotes.map((item) => item.id).indexOf(id);
    const toEdit = {
      id: id,
      title: scrambler(newTitle, Math.abs(passCode - randomCode)),
      text: scrambler(newText, Math.abs(passCode - randomCode)),
      date: Date.now(),
    };
    allNotes[toEditIndex] = toEdit;
    setNotes(allNotes);
  };

  const onDeleteNote = (idToDelete) => {
    setNotes(notes.filter((note) => note.id !== idToDelete));
  };

  return (
    <section className='notes'>
      <div className='notes__topbar'>
        <h1 className='notes__title'>Code Memo</h1>
        <button className='notes__button logout' onClick={removePassCode}>
          Log-out
        </button>
      </div>
      <div className='notes__underbar'>
        <h2 className='notes__subtitle'>Notes</h2>
        <button
          className='notes__button new'
          onClick={() => setAddingNote(true)}>
          +
        </button>
      </div>
      {addingNote && (
        <div className='notes__note_input_wrapper'>
          <input
            ref={titleRef}
            className='notes__note_input_title'
            type='text'
            name='newNote'
            placeholder='Put title here...'
          />
          <textarea
            ref={textRef}
            className='notes__note_input_text'
            name='newNote'
            placeholder='Put text here...'
          />
          <button className='notes__button add' onClick={onAddNote}>
            Add Note
          </button>
        </div>
      )}
      {notes.map((note) => (
        <Note
          note={note}
          key={note.id}
          keyNumber={Math.abs(passCode - randomCode)}
          onEditNote={onEditNote}
          onDeleteNote={onDeleteNote}
        />
      ))}
    </section>
  );
}

export default NoteList;
