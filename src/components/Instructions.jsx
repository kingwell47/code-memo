import React from "react";
import "./Instructions.scss";

function Instructions() {
  return (
    <section className='instructions'>
      <h1 className='instructions__title'>Code Memo</h1>
      <div className='instructions__disclaimer'>
        Disclaimer: This app is not intended to be used to protect any sensitive
        information. It's just a fun side project, nothing more.
      </div>
      <h2 className='instructions__how'>How to Use:</h2>
      <ol className='instructions__text'>
        <li className='instructions__text_item'>
          Initialize the app with a six (6) digit code.
        </li>
        <li className='instructions__text_item'>Add, edit, or delete notes.</li>
        <li className='instructions__text_item'>
          Using an incorrect code will still grant access to the notes, but will
          have all the note content ciphered.
        </li>
        <li className='instructions__text_item'>
          Notes will only be readable if the correct code is entered.
        </li>
        <li className='instructions__text_item'>
          Resetting the app will not delete the notes, but will make existing
          notes unreadable.
        </li>
      </ol>
      <p className='instructions__credit'>
        Coded by{" "}
        <a href='https://joeldoctor.com' rel='noreferrer' target='_blank'>
          Joel P. Doctor
        </a>
      </p>
    </section>
  );
}

export default Instructions;
