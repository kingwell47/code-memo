import React from "react";

//Passcode should scramble the data before setting it in local storage
//Should also probably add disclaimer that this app should not be used for secure details because it's open source and thus any scrambling I do can be reverse engineered

function GetPasscode() {
  return (
    <div>
      <p>Enter the passcode here</p>
    </div>
  );
}

export default GetPasscode;
