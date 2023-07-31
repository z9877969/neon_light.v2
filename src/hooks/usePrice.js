import { useEffect, useState } from "react";

import calculatePrice from "../shared/lib/priceCalculator";
import { fontSize } from "constants";
import getNeonStripLength from "../shared/lib/getNeonStripLength";

const changeNumByComma = (num, numsAfterCommaAmount = 0) => {
  const devider = Math.pow(10, numsAfterCommaAmount);
  return Math.round(num * devider) / devider;
};

const calcTextOptions = (text, textHeight) => {
  const textSymbolQuantity = text
    .split(" ")
    .join("")
    .split("\n")
    .join("").length;
  const textRows = text.split("\n").length;
  const textFontSize = Math.ceil(textHeight / textRows / fontSize.LINE_HEIGHT);

  return { textSymbolQuantity, textFontSize };
};

const usePrice = ({ text, textWidth, textHeight }) => {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (text && textWidth && textHeight) {
      const { textSymbolQuantity, textFontSize } = calcTextOptions(
        text,
        textHeight
      );
      const lengthOfLedStripInMeters = getNeonStripLength(
        textSymbolQuantity,
        textFontSize
      );
      const totalPrice = calculatePrice(
        changeNumByComma(textWidth) / 100,
        changeNumByComma(textHeight) / 100,
        textSymbolQuantity,
        lengthOfLedStripInMeters / 100
      );
      setPrice(Math.round(totalPrice));
    }
    if (!text) {
      setPrice(0);
    }
  }, [text, textHeight, textWidth]);

  return { price, setPrice };
};

export default usePrice;
