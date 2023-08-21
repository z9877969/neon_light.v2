import {
  alignmentOptions,
  lettersFormatOptions,
  selectorFonts,
  textSizeConstants,
} from "constants";

import { useState } from "react";

const useFormInscription = () => {
  const [text, setText] = useState("");
  const [sides, setSides] = useState({
    width: 0,
    height: textSizeConstants.MIN_HEIGHT,
  });
  const [fontOption, setFontOption] = useState(selectorFonts[0]);
  const [color, setColor] = useState("#FEFEFE");
  const [textAlign, setTextAlign] = useState(alignmentOptions.LEFT);
  const [lettersFormat, setLettersFormat] = useState(lettersFormatOptions.NONE);

  return {
    text,
    sides,
    fontOption,
    color,
    textAlign,
    lettersFormat,
    setText,
    setSides,
    setFontOption,
    setColor,
    setTextAlign,
    setLettersFormat,
  };
};

export default useFormInscription;
