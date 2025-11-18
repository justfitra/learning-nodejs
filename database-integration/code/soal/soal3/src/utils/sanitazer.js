export const capFirstLetterInSentence = (sentence) => {
  const words = sentence.split(" ").map((word) => {
    return word[0].toUpperCase() + word.slice(1);
  });

  return words.join(" ");
};

export const removeDoubleWhiteSpace = (sentence) => {
  return sentence.replace(/\s+/g, " ");
};
