//scrambler should scramble all the text in the note, no matter the passcode given

export function scrambler(word, number) {
  if (!number) return;
  const min = 33;
  const max = 126;

  const leftOver = number % (max - min);

  return word.replace(/[^\s]/g, (x) => {
    let diff = 0;
    let currentVal = x.charCodeAt(0);
    if (currentVal + leftOver > max) {
      diff = min + currentVal + leftOver - max;
    } else {
      diff = currentVal + leftOver;
    }

    return String.fromCharCode(diff);
  });
}

export function unScrambler(word, number) {
  if (!number) return;
  const min = 33;
  const max = 126;

  const leftOver = number % (max - min);

  return word.replace(/[^\s]/g, (x) => {
    let diff = 0;
    let currentVal = x.charCodeAt(0);
    if (currentVal - leftOver < min) {
      diff = max - (min - (currentVal - leftOver));
    } else {
      diff = currentVal - leftOver;
    }

    return String.fromCharCode(diff);
  });
}
