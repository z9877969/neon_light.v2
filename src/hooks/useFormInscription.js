import {
  alignmentOptions,
  lettersFormatOptions,
  selectorFonts,
  textSizeOptions,
} from "constants";

import { useState } from "react";

const useFormInscription = () => {
  const [text, setText] = useState("");
  const [textWidth, setTextWidth] = useState(0);
  const [textHeight, setTextHeight] = useState(textSizeOptions.MIN_HEIGHT);
  const [fontOption, setFontOption] = useState(selectorFonts[0]);
  const [color, setColor] = useState("#FEFEFE");
  const [price, setPrice] = useState(0);
  const [textAlign, setTextAlign] = useState(alignmentOptions.LEFT);
  const [lettersFormat, setLettersFormat] = useState(lettersFormatOptions.NONE);

  return {
    text,
    textWidth,
    textHeight,
    fontOption,
    color,
    price,
    textAlign,
    lettersFormat,
    setText,
    setTextWidth,
    setTextHeight,
    setFontOption,
    setColor,
    setPrice,
    setTextAlign,
    setLettersFormat,
  };
};

export default useFormInscription;
