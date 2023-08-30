import { useEffect, useState } from "react";

import { textSizeConstants as textSize } from "constants";
import { textSizeConstants } from "constants";
import { toast } from "react-toastify";

const useError = ({
  text,
  textWidth,
  textHeight,
  errorMessageText = "*Обов'язкове поле",
  errorMessageTextWidth = "*Обов'язкове поле",
  errorMessageTextHeight = "*Обов'язкове поле",
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

    if (Math.floor(textWidth) > textSize.MAX_WIDTH) {
      return setErrorTextWidth(`Максимальна висота ${textSize.MAX_WIDTH} см.`);
    }

    setErrorTextWidth("");
  }, [textWidth, errorMessageTextWidth]);

  useEffect(() => {
    if (!textHeight) {
      return setErrorTextHeight(errorMessageTextHeight);
    }

    if (Math.round(textHeight) < textSize.MIN_HEIGHT) {
      return setErrorTextHeight(`Мінімальна висота ${textSize.MIN_HEIGHT} см.`);
    }

    if (Math.floor(textHeight) > textSize.MAX_HEIGHT) {
      return setErrorTextHeight(
        `Максимальна висота ${textSize.MAX_HEIGHT} см.`
      );
    }

    setErrorTextHeight("");
  }, [textHeight, errorMessageTextHeight]);

  useEffect(() => {
    const { MAX_WIDTH, MAX_HEIGHT, MIN_HEIGHT } = textSizeConstants;
    if (
      textWidth > MAX_WIDTH ||
      textHeight > MAX_HEIGHT ||
      textHeight < MIN_HEIGHT
    ) {
      toast.error(
        "Максимальні ширина та висота 200см. Мінімальна висота рядка 7см."
      );
    }
  }, [textHeight, textWidth]);

  return { errorText, errorTextWidth, errorTextHeight };
};

export default useError;
