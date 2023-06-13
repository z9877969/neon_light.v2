import Container from "./Container/Container";
import FormInscription from "./FormInscription/FormInscription";
import Tabs from "./Tabs/Tabs";
import { useState } from "react";
import OwnDesign from "./OwnDesign/OwnDesign";
import ScreenComponent from "./Screen/Screen";

import ModalFeedback from "./ModalFeedback/ModalFeedback";
import FormFeedback from "./FormFeedback/FormFeedback";
import fonts from "./FormInscription/Options/fonts";
import s from "./App.module.scss";
// import serviceCost from "../shared/lib/serviceCost";
// import makePriceCalculator from "../shared/lib/priceCalculator";

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
  const [price, setPrice] = useState("");

  // const calculatePrice = makePriceCalculator({ ...serviceCost });

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
    <>
      <div className={s.header}></div>
      <Container>
        <div className={s.wrapper}>
          <ScreenComponent
            text={text}
            textWidth={textWidth}
            textHeight={textHeight}
          />

          <div className={s.componentsWrapper}>
            <Tabs
              activeBtn={formInscription}
              onFormInscription={onFormInscription}
              onOwnDesign={onOwnDesign}
            />
            {formInscription ? (
              <FormInscription
                price={price}
                color={color}
                text={text}
                font={font}
                textWidth={textWidth}
                textHeight={textHeight}
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
          </div>
        </div>
        {isOpen && (
          <ModalFeedback onClose={handleModalClose}>
            <FormFeedback />
          </ModalFeedback>
        )}
      </Container>
    </>
  );
};

export default App;
