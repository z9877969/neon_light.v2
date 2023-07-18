import "react-toastify/dist/ReactToastify.css";

import {
  alignmentOptions as alignment,
  letterFormatOptions,
  lettersFormatOptions,
} from "../constants";
import { useCallback, useEffect, useState } from "react";

import Container from "./Container/Container";
import FormFeedback from "./FormFeedback/FormFeedback";
import FormInscription from "./FormInscription/FormInscription";
import ModalFeedback from "./ModalFeedback/ModalFeedback";
import OwnDesign from "./OwnDesign/OwnDesign";
import { ScreenComponent } from "./Screen";
import Tabs from "./Tabs/Tabs";
import { ToastContainer } from "react-toastify";
import calculatePrice from "../shared/lib/priceCalculator";
import fonts from "./FormInscription/TextOptionsInputs/fonts";
import getNeonStripLength from "../shared/lib/getNeonStripLength";
import s from "./App.module.scss";

const App = () => {
  const [formInscription, setFormInscription] = useState(true);
  const [text, setText] = useState("");
  const [textWidth, setTextWidth] = useState(0);
  const [textHeight, setTextHeight] = useState(6);
  const [isOpen, setIsOpen] = useState(false);
  const [font, setFont] = useState("alumini sans");
  const [color, setColor] = useState("#FEFEFE");
  const [price, setPrice] = useState(0);
  const [textAlign, setTextAlign] = useState(alignment.LEFT);
  const [lettersFormat, setLettersFormat] = useState(lettersFormatOptions.NONE);
  const [textDirty, setTextDirty] = useState(false);
  const [widthDirty, setWidthDirty] = useState(false);
  const [heightDirty, setHeightDirty] = useState(false);
  const [textError, setTextError] = useState("");
  const [widthError, setWidthError] = useState("*Обовязкове поле");
  const [heightError, setHeightError] = useState("*Обовязкове поле");

  // const textWidthToHeightRatio = 4;

  useEffect(() => {
    // controls error
    if (!text) {
      setTextError("Обовязкове поле");
      setPrice(0);
    } else {
      setTextError("");
    }
    if (!textWidth) {
      setWidthError("Обовязкове поле");
    } else {
      setWidthError("");
    }
    if (!textHeight) {
      setHeightError("Обовязкове поле");
    } else if (Number(textHeight) < 8) {
      setHeightDirty(true);
      setHeightError("Мінімально 8 см");
    } else {
      setHeightError("");
    }
    // controls error -END

    // calc price
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
    // calc price -END
  }, [text, textHeight, textWidth]);

  const handelePriceChange = (newPrice) => {
    setPrice(newPrice);
  };

  const handeleAlignmentChange = (newAlignment) => {
    setTextAlign(newAlignment);
  };

  const handleFormatChange = (newFormat) => {
    setLettersFormat(newFormat);
  };

  const handleColor = (color) => {
    setColor(color);
  };

  const getSelectValue = () => {
    return font ? fonts.find((c) => c.value === font) : "";
  };

  const onChangeSelectValue = (newValue) => {
    setFont(newValue.value);
  };

  const handleTogleModal = () => {
    setIsOpen(!isOpen);
  };

  const onFormInscription = () => {
    setFormInscription(false);
  };

  const onOwnDesign = () => {
    setFormInscription(true);
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "text":
        setTextDirty(true);
        break;
      case "width":
        setWidthDirty(true);
        break;
      case "height":
        setHeightDirty(true);
        break;
      default:
        return;
    }
  };

  const handleTextChange = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const handleWidthChange = (event) => {
    setTextWidth(event.target.value);
  };

  const handleHeightChange = (event) => {
    setTextHeight(event.target.value);
  };

  return (
    <>
      <div className={s.header}></div>
      <Container>
        <div className={s.wrapper}>
          <div>
            <ScreenComponent
              text={text}
              textWidth={textWidth}
              textHeight={textHeight}
              setTextWidth={setTextWidth}
              setTextHeight={setTextHeight}
              font={font}
              color={color}
              alignment={textAlign}
              format={lettersFormat}
              price={price}
            />
            <p className={s.warrningText}>
              Зображення може спотворюватися для двох та більше рядків. Ми
              погоджуємо макет перед запуском.
            </p>
          </div>
          <div className={s.componentsWrapper}>
            <Tabs
              activeBtn={formInscription}
              onFormInscription={onFormInscription}
              onOwnDesign={onOwnDesign}
            />
            {formInscription ? (
              <FormInscription
              textAlign={textAlign}
                lettersFormat={lettersFormat}
                color={color}
                text={text}
                font={font}
                price={price}
                textDirty={textDirty}
                widthDirty={widthDirty}
                heightDirty={heightDirty}
                textError={textError}
                widthError={widthError}
                heightError={heightError}
                textWidth={textWidth}
                textHeight={textHeight}
                blurHandler={blurHandler}
                handleColor={handleColor}
                getSelectValue={getSelectValue()}
                onChangeSelectValue={onChangeSelectValue}
                onTextChange={handleTextChange}
                onWidthChange={handleWidthChange}
                onHeightChange={handleHeightChange}
                setTextAlign={setTextAlign}
                setLettersFormat={setLettersFormat}
                onPriceChange={handelePriceChange}
                openModal={handleTogleModal}
              />
            ) : (
              <OwnDesign openModal={handleTogleModal} />
            )}
          </div>
        </div>
        {isOpen && (
          <ModalFeedback onClose={handleTogleModal}>
            <FormFeedback
              formInscription={formInscription}
              textAlign={textAlign}
              lettersFormat={lettersFormat}
              color={color}
              text={text}
              font={font}
              price={price}
              width={textWidth}
              height={textHeight}
            />
          </ModalFeedback>
        )}
      </Container>
      <ToastContainer />
    </>
  );
};

export default App;
