import React, { useState, useRef } from "react";
import { nanoid } from "nanoid";
import Note from "./Note";

function NoteList() {
  const [notes, setNotes] = useState([]);
  const [addingNote, setAddingNote] = useState(false);

  const titleRef = useRef();
  const textRef = useRef();

  const onAddNote = () => {
    let newNote = {
      id: nanoid(),
      title: titleRef.current.value,
      text: textRef.current.value,
      date: Date.now(),
    };

    setNotes([newNote, ...notes]);
    titleRef.current.value = "";
    textRef.current.value = "";
    setAddingNote(false);
  };

  const onEditNote = (id, newTitle, newText) => {
    let allNotes = [...notes];
    const toEditIndex = allNotes.map((item) => item.id).indexOf(id);
    let toEdit = notes.filter((item) => item.id === id);
    toEdit.id = id;
    toEdit.title = newTitle;
    toEdit.text = newText;
    toEdit.date = Date.now();
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
          onEditNote={onEditNote}
          onDeleteNote={onDeleteNote}
        />
      ))}
    </div>
  );
}

export default NoteList;
