import {
  alignmentOptions,
  lettersFormatOptions,
  selectorFonts,
  textSizeConstants,
} from "constants";

import { useState } from "react";

const useFormInscription = () => {
  const [text, setText] = useState("");
  const [textWidth, setTextWidth] = useState(0);
  const [textHeight, setTextHeight] = useState(textSizeConstants.MIN_HEIGHT);
  const [fontOption, setFontOption] = useState(selectorFonts[0]);
  const [color, setColor] = useState("#FEFEFE");
  const [textAlign, setTextAlign] = useState(alignmentOptions.LEFT);
  const [lettersFormat, setLettersFormat] = useState(lettersFormatOptions.NONE);

  return {
    text,
    textWidth,
    textHeight,
    fontOption,
    color,
    textAlign,
    lettersFormat,
    setText,
    setTextWidth,
    setTextHeight,
    setFontOption,
    setColor,
    setTextAlign,
    setLettersFormat,
  };
};

export default useFormInscription;
