import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Container from "./Container/Container";
import ScreenComponent from "./Screen/Screen";
import Tabs from "./Tabs/Tabs";
import FormInscription from "./FormInscription/FormInscription";
import OwnDesign from "./OwnDesign/OwnDesign";
import ModalFeedback from "./ModalFeedback/ModalFeedback";
import FormFeedback from "./FormFeedback/FormFeedback";
import fonts from "./FormInscription/Options/fonts";
import calculatePrice from "../shared/lib/priceCalculator";
import s from "./App.module.scss";

const App = () => {
  const [formInscription, setFormInscription] = useState(true);
  const [text, setText] = useState("Введіть текст");
  const [textWidth, setTextWidth] = useState("");
  const [textHeight, setTextHeight] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [font, setFont] = useState("comfortaa");
  const [color, setColor] = useState("#FEFEFE");
  const [price, setPrice] = useState("");
  const [positionText, setPositionText] = useState("start");
  const [styleText, setStyleText] = useState("none");
  const [textDirty, setTextDirty] = useState(false);
  const [widthDirty, setWidthDirty] = useState(false);
  const [heightDirty, setHeightDirty] = useState(false);
  const [textError, setTextError] = useState("");
  const [widthError, setWidthError] = useState("*Обовязкове поле");
  const [heightError, setHeightError] = useState("*Обовязкове поле");

  const textWidthToHeightRatio = 4;

  // useEffect(() => {
  //   setFont("comfortaa")
  // }, [])

  useEffect(() => {
    if (!text) {
      setTextError("Обовязкове поле");
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
    } else {
      setHeightError("");
    }
    if (text && textWidth && textHeight) {
      const symbolQuantityText = text.split(" ").join("").length;
      const lengthOfLedStripInMeters = ((textWidth + textHeight) * 2) / 10000;

      const totalPrice = calculatePrice(
        textWidth / 100,
        textHeight / 100,
        symbolQuantityText,
        lengthOfLedStripInMeters
      );
      setPrice(totalPrice);
    }
  }, [text, textHeight, textWidth]);

  const handelePriceChange = (newPrice) => {
    setPrice(newPrice);
  };

  const handeleAlignmentChange = (newAlignment) => {
    setPositionText(newAlignment);
  };

  const handleFormatChange = (newFormat) => {
    setStyleText(newFormat);
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

  const handleTextChange = (e) => {
    setText(e.target.value);
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
    let newHeight = (event.target.value);
    let heightError = "";

    if (newHeight > 51) {
      newHeight = 50;
    }


    const newWidth = Math.round(newHeight * textWidthToHeightRatio);
    setTextHeight(newHeight);
    setTextWidth(newWidth);
    setHeightError(heightError);
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
            font={font}
            color={color}
            alignment={positionText}
            format={styleText}
            price={price}
          />
          <div className={s.componentsWrapper}>
            <Tabs
              activeBtn={formInscription}
              onFormInscription={onFormInscription}
              onOwnDesign={onOwnDesign}
            />
            {formInscription ? (
              <FormInscription
                alignment={positionText}
                format={styleText}
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
                onAlignmentChange={handeleAlignmentChange}
                onFormatChange={handleFormatChange}
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
            <FormFeedback />
          </ModalFeedback>
        )}
      </Container>
      <ToastContainer />
    </>
  );
};

export default App;

