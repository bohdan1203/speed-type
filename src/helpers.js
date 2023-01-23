export function getClassNames(i, currentIndex, isTyping, typedText, chars) {
  if (i === currentIndex) {
    return "bg-black text-white";
  }

  if (!isTyping || currentIndex < i) {
    return "bg-darker-white";
  }

  if (typedText[i] === chars[i]) {
    return "bg-green-200";
  } else {
    return "bg-red-200";
  }
}

export function calculateSpeed(
  isTyping,
  text,
  currentIndex,
  timestamps,
  typingIsFinished
) {
  if (currentIndex === 0) {
    return "Start typing";
  }

  if (isTyping) {
    return (
      ((text.slice(0, currentIndex).length /
        ((Date.now() - timestamps[0]) / 1000)) *
        60) /
      5
    ).toFixed(2);
  }

  if (typingIsFinished) {
    return (
      ((text.length / ((timestamps[1] - timestamps[0]) / 1000)) * 60) /
      5
    ).toFixed(2);
  }

  return "Error occured";
}

export function calculateAccuracy(
  isTyping,
  text,
  actualTypedText,
  currentIndex,
  typingIsFinished
) {
  if (currentIndex === 0) {
    return "Start typing";
  }

  if (isTyping) {
    return (
      (100 / actualTypedText.length) *
      text.slice(0, currentIndex).length
    ).toFixed(2);
  }

  if (typingIsFinished) {
    return ((100 / actualTypedText.length) * text.length).toFixed(2);
  }

  return "Error occured";
}

export function areMistakes(text, typedText, currentIndex) {
  return text.slice(0, currentIndex) !== typedText.slice(0, currentIndex);
}

export function getRandomIndex(maximum) {
  return Math.trunc(Math.random() * maximum);
}

export function playSound(sound) {
  new Audio(sound).play();
}
