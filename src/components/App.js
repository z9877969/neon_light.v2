import Container from "./Container/Container";
import FormInscription from "./FormInscription/FormInscription";
import Tabs from "./Tabs/Tabs";
import { useState } from "react";
import OwnDesign from "./OwnDesign/OwnDesign";
import ScreenComponent from "./Screen/Screen";

import ModalFeedback from "./ModalFeedback/ModalFeedback";
import FormFeedback from "./FormFeedback/FormFeedback";

const App = () => {
  const [formInscription, setFormInscription] = useState(true);
  const [text, setText] = useState("Введіть текст");
  const [textWidth, setTextWidth] = useState('');
  const [textHeight, setTextHeight] = useState('');
  const [isOpen, setIsOpen] = useState(false);

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
      <Tabs onFormInscription={onFormInscription} onOwnDesign={onOwnDesign} />
      {formInscription ? (

        <FormInscription
          text={text}
          onTextChange={handleTextChange}
          onWidthChange={handleWidthChange}
          onHeightChange={handleHeightChange}
        />

      ) :
        (
          <OwnDesign onClose={handleModalClose} />
        )}
      {isOpen && (
        <ModalFeedback onClose={handleModalClose}>
          <FormFeedback />
        </ModalFeedback>
      )
      }
      <ScreenComponent
        text={text}
        textWidth={textWidth}
        textHeight={textHeight}
      />
    </Container>
  );
};

export default App;
