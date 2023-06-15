import { useState, useEffect } from "react";
import Container from "./Container/Container";
import ScreenComponent from "./Screen/Screen";
import Tabs from "./Tabs/Tabs";
import FormInscription from "./FormInscription/FormInscription";
import OwnDesign from "./OwnDesign/OwnDesign";
import ModalFeedback from "./ModalFeedback/ModalFeedback";
import FormFeedback from "./FormFeedback/FormFeedback";
import fonts from "./FormInscription/Options/fonts";
import serviceCost from "../shared/lib/serviceCost";
import makePriceCalculator from "../shared/lib/priceCalculator";
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

  useEffect(() => {
    const {
      independentExpenses,
      symbolPrice,
      sheetMaterialPricePerMeter,
      ledStripPricePerMeter,
      materialPricePerMeter,
      costOfCuttingAndEngravingPricePerMeter,
      profitability,
    } = serviceCost;
    if (text && textWidth && textHeight && color) {
      const symbolQuantityText = text.split(" ").join("").length;
      const lengthOfLedStripInMeters = ((textWidth + textHeight) * 2) / 10000;

      const calculatePrice = makePriceCalculator({
        independentExpenses,
        symbolPrice,
        sheetMaterialPricePerMeter,
        ledStripPricePerMeter,
        materialPricePerMeter,
        costOfCuttingAndEngravingPricePerMeter,
        profitability,
      });

      const totalPrice = calculatePrice(
        textWidth / 100,
        textHeight / 100,
        symbolQuantityText,
        lengthOfLedStripInMeters
      );
      setPrice(totalPrice);
    }
  }, [color, text, textHeight, textWidth]);

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

  const handleTextChange = (event) => {
    const newText = event.target.value;
    setText(newText);
  };

  const handleWidthChange = (event) => {
    const newWidth = event.target.value;
    setTextWidth(newWidth);
  };

  const handleHeightChange = (event) => {
    const newHeight = event.target.value;
    setTextHeight(newHeight);
  };

  console.log(textHeight);

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
    </>
  );
};

export default App;
