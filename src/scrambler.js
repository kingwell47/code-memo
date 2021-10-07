//scrambler should scramble all the text in the note, no matter the passcode given

export default function scrambler(word, number) {
  const min = 33;
  const max = 126;

  const leftOver = number % (max - min);

  return word.replace(/[^\s]/g, (x) => {
    let result = 0;
    if (x.charCodeAt(0) - leftOver < min) {
      result = max - (min - (x.charCodeAt(0) - leftOver + 1));
    } else {
      result = x.charCodeAt(0) - leftOver;
    }
    return String.fromCharCode(result);
  });
}
