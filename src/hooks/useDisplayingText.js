import { lettersFormatOptions } from "constants";
import { nanoid } from "nanoid";
import { useMemo } from "react";

const toCapitalizeCase = (str) => {
  const firstLetter = str[0] ? str[0].toUpperCase() : "";
  return firstLetter + str.slice(1);
};

const changeStringByLettersFormat = (str, lettersFormat) => {
  const SPACE = " ";
  const { UPPERCASE, LOWERCASE, CAPITALIZE } = lettersFormatOptions;
  switch (lettersFormat) {
    case UPPERCASE:
      return str.toUpperCase();
    case LOWERCASE:
      return str.toLowerCase();
    case CAPITALIZE:
      return str
        .split(SPACE)
        .map((el) => (/^[\s]+$/.test(el) ? el : toCapitalizeCase(el)))
        .join(SPACE);
    default:
      return str;
  }
};

export const useDisplayingText = (text, lettersFormat) => {
  const displayingTextOptions = useMemo(() => {
    return text.split("\n").map((el) => ({
      stringText: changeStringByLettersFormat(el, lettersFormat),
      id: nanoid(),
    }));
  }, [text, lettersFormat]);
  return displayingTextOptions;
};
