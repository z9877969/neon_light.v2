import Container from "./Container/Container";
import FormInscription from "./FormInscription/FormInscription";
import Tabs from "./Tabs/Tabs";
import { useState } from "react";
import OwnDesign from "./OwnDesign/OwnDesign";
import ScreenComponent from "./Screen/Screen";

import ModalFeedback from "./ModalFeedback/ModalFeedback";
import FormFeedback from "./FormFeedback/FormFeedback";
import fonts from "./FormInscription/Options/fonts";

const App = () => {
  const [formInscription, setFormInscription] = useState(true);
  const [text, setText] = useState("Введіть текст");
  const [textWidth, setTextWidth] = useState("");
  const [textHeight, setTextHeight] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [font, setFont] = useState("comfortaa");
  const [color, setColor] = useState("#FFFFFF80");
  const [alignment, setAlignment] = useState("start");
  const [format, setFormat] = useState(null);
  const [price, setPrice] = useState(0);
  const textWidthToHeightRatio = 3;


  // const [positionText, setPositionText] = useState("start");
  // const [styleText, setStyleText] = useState("none");

  const handelePriceChange = (newPrice) => {
    setPrice(newPrice);
  }

  const handeleAlignmentChange = (newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleFormatChange = (newFormat) => {
    setFormat(newFormat);
  }

  const handleColor = (color) => {
    setColor(color);
  };

  const getSelectValue = () => {
    return font ? fonts.find((c) => c.value === font) : "";
  };

  const onChangeSelectValue = (newValue) => {
    setFont(newValue.value);
  };

  const handleModalClose = () => {
    setIsOpen(!isOpen);
  };

  const onFormInscription = () => {
    setFormInscription(false);
  };

  const onOwnDesign = () => {
    setFormInscription(true);
  };

  const handleTextChange = (event) => {
    const newText = event.target.value;
    setText(newText);
  };

  const handleWidthChange = (event) => {
    let newWidth = event.target.value;
    if (newWidth > 200) {
      newWidth = 200;
    }
    const newHeight = Math.round(newWidth / textWidthToHeightRatio);
    setTextWidth(newWidth);
    setTextHeight(newHeight);
  };

  const handleHeightChange = (event) => {
    let newHeight = event.target.value;
    if (newHeight < 6) {
      newHeight = 6;
    }
    const newWidth = Math.round(newHeight * textWidthToHeightRatio);
    setTextHeight(newHeight);
    setTextWidth(newWidth);
  };

  return (
    <Container>
      <ScreenComponent
        text={text}
        textWidth={textWidth}
        textHeight={textHeight}
        font={font}
        color={color}
        alignment={alignment}
        format={format}
        price={price}
      />

      <Tabs onFormInscription={onFormInscription} onOwnDesign={onOwnDesign} />
      {formInscription ? (
        <FormInscription
          alignment={alignment}
          format={format}
          color={color}
          text={text}
          font={font}
          price={price}
          textWidth={textWidth}
          textHeight={textHeight}
          handleColor={handleColor}
          getSelectValue={getSelectValue()}
          onChangeSelectValue={onChangeSelectValue}
          onTextChange={handleTextChange}
          onWidthChange={handleWidthChange}
          onHeightChange={handleHeightChange}
          onAlignmentChange={handeleAlignmentChange}
          onFormatChange={handleFormatChange}
          onPriceChange={handelePriceChange}
        />
      ) : (
        <OwnDesign onClose={handleModalClose} />
      )}
      {isOpen && (
        <ModalFeedback onClose={handleModalClose}>
          <FormFeedback />
        </ModalFeedback>
      )
      }

    </Container>
  );
};

export default App;