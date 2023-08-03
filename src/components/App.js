import "react-toastify/dist/ReactToastify.css";

import { useCallback, useState } from "react";

import Container from "./Container/Container";
import FormFeedback from "./FormFeedback/FormFeedback";
import FormInscription from "./FormInscription/FormInscription";
import ModalFeedback from "./ModalFeedback/ModalFeedback";
import OwnDesign from "./OwnDesign/OwnDesign";
import { ScreenComponent } from "./Screen";
import Tabs from "./Tabs/Tabs";
import { ToastContainer } from "react-toastify";
import s from "./App.module.scss";
// import { useDisplayingText } from "hooks/useDisplayingText";
import useError from "../hooks/useError";
import useFormInscription from "../hooks/useFormInscription";
import usePrice from "../hooks/usePrice";
import useToggle from "../hooks/useToggle";

const App = () => {
  const [formInscription, setFormInscription] = useState(true);
  const { isModalOpen, handleToggleModal } = useToggle();
  const {
    text,
    textWidth,
    textHeight,
    fontOption,
    color,
    textAlign,
    lettersFormat,
    setText,
    setTextWidth,
    setTextHeight,
    setFontOption,
    setColor,
    setTextAlign,
    setLettersFormat,
  } = useFormInscription();
  const { errorText, errorTextWidth, errorTextHeight } = useError({
    text,
    textWidth,
    textHeight,
  });
  const { price, setPrice } = usePrice({ text, textWidth, textHeight });
  const [isTextSizeError, setIsTextSizeError] = useState(false);

  const onFormInscription = () => {
    setFormInscription(false);
  };

  const onOwnDesign = () => {
    setFormInscription(true);
  };

  const handleChangeText = useCallback(
    (text) => {
      if (isTextSizeError) return;
      setText(text);
    },
    [isTextSizeError, setText]
  );

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
              setText={setText}
              font={fontOption.label}
              color={color}
              textAlign={textAlign}
              lettersFormat={lettersFormat}
              price={price}
              setIsTextSizeError={setIsTextSizeError}
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
                fontOption={fontOption}
                price={price}
                errorText={errorText}
                errorTextWidth={errorTextWidth}
                errorTextHeight={errorTextHeight}
                textWidth={textWidth}
                textHeight={textHeight}
                setColor={setColor}
                setFontOption={setFontOption}
                handleChangeText={handleChangeText}
                setTextAlign={setTextAlign}
                setLettersFormat={setLettersFormat}
                onWidthChange={setTextWidth}
                onHeightChange={setTextHeight}
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
              textAlign={textAlign}
              lettersFormat={lettersFormat}
              color={color}
              text={text}
              font={fontOption.value}
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
