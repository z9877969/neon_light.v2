import "react-toastify/dist/ReactToastify.css";

import Container from "./Container/Container";
import FormFeedback from "./FormFeedback/FormFeedback";
import FormInscription from "./FormInscription/FormInscription";
import ModalFeedback from "./ModalFeedback/ModalFeedback";
import OwnDesign from "./OwnDesign/OwnDesign";
import { ScreenComponent } from "./Screen";
import Tabs from "./Tabs/Tabs";
import { ToastContainer } from "react-toastify";
import s from "./App.module.scss";
import useError from "../hooks/useError";
import useFormInscription from "../hooks/useFormInscription";
import usePrice from "../hooks/usePrice";
import { useState } from "react";
import useToggle from "../hooks/useToggle";

const App = () => {
  const [formInscription, setFormInscription] = useState(true);
  const { isModalOpen, handleToggleModal } = useToggle();
  const {
    text,
    sides,
    fontOption,
    color,
    textAlign,
    lettersFormat,
    setText,
    setSides,
    setFontOption,
    setColor,
    setTextAlign,
    setLettersFormat,
  } = useFormInscription();
  const { errorText, errorTextWidth, errorTextHeight } = useError({
    text,
    textWidth: sides.width,
    textHeight: sides.height,
  });
  const { price, setPrice } = usePrice({
    text,
    textWidth: sides.width,
    textHeight: sides.height,
  });

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
              sides={sides}
              setSides={setSides}
              setText={setText}
              font={fontOption.label}
              color={color}
              textAlign={textAlign}
              lettersFormat={lettersFormat}
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
                fontOption={fontOption}
                price={price}
                errorText={errorText}
                errorTextWidth={errorTextWidth}
                errorTextHeight={errorTextHeight}
                textWidth={sides.width}
                textHeight={sides.height}
                setColor={setColor}
                setFontOption={setFontOption}
                setText={setText}
                setTextAlign={setTextAlign}
                setLettersFormat={setLettersFormat}
                setSides={setSides}
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
              width={sides.width}
              height={sides.height}
            />
          </ModalFeedback>
        )}
      </Container>
      <ToastContainer />
    </>
  );
};

export default App;
