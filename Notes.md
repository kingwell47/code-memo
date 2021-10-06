# Code Memo

Emulating functionality from old ericsson phone

## Possible References

- [Intro to Javascript: Replace the letters in a string with next letter in alpabet by Isaac Grey](https://www.youtube.com/watch?v=6awwmspnviA)
- [Unicode Charsets](https://www.w3schools.com/charsets/ref_utf_basic_latin.asp)

## Process

The user needs to:

- Initialize the app with a 6 digit code
- Enter the code at start-up of the app
- Add a note that has a header and content
- Note will have timestamp (optional?)
- Upon exiting the app and starting it again, they will be asked again for their passcode
- Any passcode can be used and will be accepted but will result in the note contents being jumbled
- Only the correct passcode will properly decode the notes
- Adding another note to the app while the current code is not correct will result in a readable note, but it will be jumbled once the correct code is entered

## To Do

The app will:

- Initializing the app will generate a random code that is based on the code entered by the user
- This random code will not change until the app is re-initialized with a new code
- This random code will also be the baseline for the text that is entered by the user
- The user should see the correct letters being displayed while they are using the correct code, but internally the strings will be jumbled
- The app will store the random code and the jumbled strings in local storage
- Upon restarting the app will check if there is something in the localstorage for it
- If there is, the app will ask the user for the passcode
- The app will accept any passcode entered, but only the correct one will result in the notes being decoded properly.
