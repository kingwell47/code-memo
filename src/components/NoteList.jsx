import React, { useState, useRef } from "react";
import { nanoid } from "nanoid";
import { useTransition, animated } from "react-spring";
import Note from "./Note";
import { useLocalStorage } from "../hooks/useStorage";
import { scrambler } from "../hooks/scrambler";
import logo from "../logo.png";
import "./NoteList.scss";

function NoteList({ passCode, randomCode, removePassCode }) {
  const [notes, setNotes] = useLocalStorage("notes", []);
  const [addingNote, setAddingNote] = useState(false);
  const titleRef = useRef();
  const textRef = useRef();

  const transitions = useTransition(notes, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    delay: 200,
  });

  const fadeIn = useTransition(addingNote, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

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
    const toEditIndex = notes.map((item) => item.id).indexOf(id);
    const toEdit = {
      id: id,
      title: scrambler(newTitle, Math.abs(passCode - randomCode)),
      text: scrambler(newText, Math.abs(passCode - randomCode)),
      date: Date.now(),
    };
    setNotes((a) => [
      ...a.slice(0, toEditIndex),
      toEdit,
      ...a.slice(toEditIndex + 1, a.length),
    ]);
  };

  const onDeleteNote = (idToDelete) => {
    setNotes(notes.filter((note) => note.id !== idToDelete));
  };

  return (
    <section className='notes'>
      <div className='notes__topbar'>
        <h1 className='notes__title'>Code Memo</h1>
        <img className='notes__logo' src={logo} alt='' />
        <button
          className='notes__button logout'
          onClick={removePassCode}
          title='Log-out'>
          <i className='fas fa-sign-out-alt' />
        </button>
      </div>
      <div className='notes__underbar'>
        <h2 className='notes__subtitle'>Notes</h2>
        <button
          className='notes__button new'
          onClick={() => setAddingNote(!addingNote)}
          title='Add new note'>
          <i className='fas fa-plus' />
        </button>
      </div>
      {fadeIn(
        (styles, item) =>
          item && (
            <animated.div className='notes__note_input_wrapper' style={styles}>
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
              <div className='button_wrapper'>
                <button
                  className='notes__button add'
                  onClick={onAddNote}
                  title='add note'>
                  <i className='fas fa-check' />
                </button>
                <button
                  className='notes__button close'
                  onClick={() => setAddingNote(false)}>
                  <i className='fas fa-times' />
                </button>
              </div>
            </animated.div>
          )
      )}
      <div className='notes__note_wrapper'>
        {transitions(
          (styles, item) =>
            item && (
              <animated.div style={styles}>
                <Note
                  note={item}
                  key={item.id}
                  keyNumber={Math.abs(passCode - randomCode)}
                  onEditNote={onEditNote}
                  onDeleteNote={onDeleteNote}
                />
              </animated.div>
            )
        )}
      </div>
    </section>
  );
}

export default NoteList;
