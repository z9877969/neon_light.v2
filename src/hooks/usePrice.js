import { useEffect, useState } from "react";

import calculatePrice from "../shared/lib/priceCalculator";
import getNeonStripLength from "../shared/lib/getNeonStripLength";

const usePrice = ({ text, textWidth, textHeight }) => {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (text && textWidth && textHeight) {
      const symbolQuantityText = text.split(" ").join("").length;
      const lengthOfLedStripInMeters = getNeonStripLength(
        symbolQuantityText,
        Number(textHeight)
      );
      const totalPrice = calculatePrice(
        textWidth / 100,
        textHeight / 100,
        symbolQuantityText,
        lengthOfLedStripInMeters / 100
      );
      console.log("totalPrice :>> ", totalPrice);
      console.log("textWidth / 100", textWidth / 100);
      console.log("textHeight / 100", textHeight / 100);
      console.log("symbolQuantityText", symbolQuantityText);
      console.log("lengthOfLedStripInMeters", lengthOfLedStripInMeters / 100);
      setPrice(Math.round(totalPrice));
    }
  }, [text, textHeight, textWidth]);

  return { price, setPrice };
};

export default usePrice;
