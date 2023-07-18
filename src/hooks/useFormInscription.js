import { useState } from "react";

const useFormInscription = () => {
  const [text, setText] = useState("");
  const [textWidth, setTextWidth] = useState(0);
  const [textHeight, setTextHeight] = useState(6);
  const [font, setFont] = useState("alumini sans");
  const [color, setColor] = useState("#FEFEFE");
  const [price, setPrice] = useState(0);
  const [positionText, setPositionText] = useState("start");
  const [styleText, setStyleText] = useState("none");

  return {
    text,
    textWidth,
    textHeight,
    font,
    color,
    price,
    positionText,
    styleText,
    setText,
    setTextWidth,
    setTextHeight,
    setFont,
    setColor,
    setPrice,
    setPositionText,
    setStyleText,
  };
};

export default useFormInscription;
