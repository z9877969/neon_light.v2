import { useEffect, useState } from "react";

import { textSizeConstants as textSize } from "constants";

const useError = ({
  text,
  textWidth,
  textHeight,
  errorMessageText = "*Обовязкове поле",
  errorMessageTextWidth = "*Обовязкове поле",
  errorMessageTextHeight = "*Обовязкове поле",
}) => {
  const [errorText, setErrorText] = useState(false);
  const [errorTextWidth, setErrorTextWidth] = useState(false);
  const [errorTextHeight, setErrorTextHeight] = useState(false);

  useEffect(() => {
    if (!text) {
      return setErrorText(errorMessageText);
    }

    setErrorText("");
  }, [text, errorMessageText]);

  useEffect(() => {
    if (!textWidth) {
      return setErrorTextWidth(errorMessageTextWidth);
    }

    setErrorTextWidth("");
  }, [textWidth, errorMessageTextWidth]);

  useEffect(() => {
    if (!textHeight) {
      return setErrorTextHeight(errorMessageTextHeight);
    }

    if (Number(textHeight) < textSize.MIN_HEIGHT) {
      return setErrorTextHeight(`Мінімальна висота ${textSize.MIN} см.`);
    }

    setErrorTextHeight("");
  }, [textHeight, errorMessageTextHeight]);

  return { errorText, errorTextWidth, errorTextHeight };
};

export default useError;
