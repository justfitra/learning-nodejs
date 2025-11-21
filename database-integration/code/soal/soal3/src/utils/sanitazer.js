export const capFirstLetterInSentence = (sentence) => {
  if (!sentence) return "";
  const words = sentence.split(" ").map((word) => {
    return word[0].toUpperCase() + word.slice(1);
  });

  return words.join(" ");
};

export const removeDoubleWhiteSpace = (sentence) => {
  if (!sentence) return "";
  return sentence.replace(/\s+/g, " ");
};

export const sanitizeKeyword = (keyword) => {
  if (!keyword) return "";
  const clean = keyword.replace(/[^a-zA-Z0-9 ]/g, " ");

  return clean.trim();
};

export const isRegexInjection = (keyword) => {
  const dangerousPatterns = [
    /\.\*/g,
    /\^\$/g,
    /\(\?=.+\)/g,
    /\(\?!.+\)/g,
    /\(\?<=.+\)/g,
    /\(\?<!.+\)/g,
  ];

  return dangerousPatterns.some((pattern) => pattern.test(keyword));
};
