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
      setPrice(Math.round(totalPrice));
    }
  }, [text, textHeight, textWidth]);

  return { price, setPrice };
};

export default usePrice;
