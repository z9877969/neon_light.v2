import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";

import Container from "./Container/Container";
import FormFeedback from "./FormFeedback/FormFeedback";
import FormInscription from "./FormInscription/FormInscription";
import ModalFeedback from "./ModalFeedback/ModalFeedback";
import OwnDesign from "./OwnDesign/OwnDesign";
import { ScreenComponent } from "./Screen";
import Tabs from "./Tabs/Tabs";
import { ToastContainer } from "react-toastify";
import fonts from "./FormInscription/TextOptionsInputs/fonts";
import useToggle from "../hooks/useToggle";
import useFormInscription from "../hooks/useFormInscription";
import useError from "../hooks/useError";
import usePrice from "../hooks/usePrice";
import s from "./App.module.scss";

const App = () => {
  const [formInscription, setFormInscription] = useState(true);
  const { isModalOpen, handleToggleModal } = useToggle();
  const {
    text,
    textWidth,
    textHeight,
    font,
    color,
    positionText,
    styleText,
    setText,
    setTextWidth,
    setTextHeight,
    setFont,
    setColor,
    setPositionText,
    setStyleText,
  } = useFormInscription();
  const { errorText, errorTextWidth, errorTextHeight } = useError({
    text,
    textWidth,
    textHeight,
  });
  const { price, setPrice } = usePrice({ text, textWidth, textHeight });
  // const textWidthToHeightRatio = 4;

  const getSelectValue = () => {
    return font ? fonts.find((c) => c.value === font) : "";
  };

  const onFormInscription = () => {
    setFormInscription(false);
  };

  const onOwnDesign = () => {
    setFormInscription(true);
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
              alignment={positionText}
              format={styleText}
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
                alignment={positionText}
                format={styleText}
                color={color}
                text={text}
                font={font}
                price={price}
                errorText={errorText}
                errorTextWidth={errorTextWidth}
                errorTextHeight={errorTextHeight}
                textWidth={textWidth}
                textHeight={textHeight}
                handleColor={setColor}
                getSelectValue={getSelectValue()}
                onChangeSelectValue={setFont}
                onTextChange={setText}
                onWidthChange={setTextWidth}
                onHeightChange={setTextHeight}
                onAlignmentChange={setPositionText}
                onFormatChange={setStyleText}
                onPriceChange={setPrice}
                openModal={handleToggleModal}
              />
            ) : (
              <OwnDesign openModal={handleToggleModal} />
            )}
          </div>
        </div>
        {isModalOpen && (
          <ModalFeedback onClose={handleToggleModal}>
            <FormFeedback
              formInscription={formInscription}
              positionText={positionText}
              styleText={styleText}
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
