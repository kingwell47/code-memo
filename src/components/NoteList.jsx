import React, { useState, useRef } from "react";
import { nanoid } from "nanoid";
import Note from "./Note";
import { useLocalStorage } from "../useStorage";
import { scrambler } from "../scrambler";

function NoteList({ passCode, randomCode }) {
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
    <div>
      <h1>Notes</h1>
      <button onClick={() => setAddingNote(true)}>New Note</button>
      {addingNote && (
        <div>
          <input
            ref={titleRef}
            type='text'
            name='newNote'
            id=''
            placeholder='Put title here...'
          />
          <textarea
            ref={textRef}
            name='newNote'
            id=''
            placeholder='Put text here...'
          />
          <button onClick={onAddNote}>Add Note</button>
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
    </div>
  );
}

export default NoteList;
