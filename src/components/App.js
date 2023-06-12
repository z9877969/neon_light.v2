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
  const [color, setColor] = useState("");
  // const [positionText, setPositionText] = useState("start");
  // const [styleText, setStyleText] = useState("none");

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

  const handleTextChange = (newText) => {
    setText(newText);
  };

  const handleWidthChange = (newWidth) => {
    setTextWidth(newWidth);
  };

  const handleHeightChange = (newHeight) => {
    setTextHeight(newHeight);
  };

  return (
    <Container>
      <ScreenComponent
        text={text}
        textWidth={textWidth}
        textHeight={textHeight}
      />

      <Tabs onFormInscription={onFormInscription} onOwnDesign={onOwnDesign} />
      {formInscription ? (
        <FormInscription
          color={color}
          text={text}
          font={font}
          handleColor={handleColor}
          getSelectValue={getSelectValue()}
          onChangeSelectValue={onChangeSelectValue}
          onTextChange={handleTextChange}
          onWidthChange={handleWidthChange}
          onHeightChange={handleHeightChange}
        />
      ) : (
        <OwnDesign onClose={handleModalClose} />
      )}
      {isOpen && (
        <ModalFeedback onClose={handleModalClose}>
          <FormFeedback />
        </ModalFeedback>
      )}
    </Container>
  );
};

export default App;
