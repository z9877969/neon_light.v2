import { AiFillExclamationCircle } from "react-icons/ai";
import ColorPicker from "./ColorPicker/ColorPicker";
import TextOptionsInputs from "./TextOptionsInputs/TextOptionsInputs";
import TextPositionAndFormat from "./TextPositionAndFormat/TextPositionAndFormat";
import clsx from "clsx";
import s from "./FormInscription.module.scss";
import { useState } from "react";

const FormInscription = ({
  price,
  color,
  fontOption,
  text,
  textWidth,
  textHeight,
  errorText,
  errorTextWidth,
  errorTextHeight,
  setFontOption,
  handleColor,
  onTextChange,
  onWidthChange,
  onHeightChange,
  openModal,
  setTextAlign,
  setLettersFormat,
  textAlign,
  lettersFormat,
}) => {
  const [validForm, setValidForm] = useState(true);

  const numberWithSpaces = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errorText || errorTextWidth || errorTextHeight) {
      return setValidForm(false);
    }

    setValidForm(true);
    openModal();
  };

  return (
    <>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className={s.textSettings}>
          <div className={s.inputWrapper}>
            <textarea
              className={s.textArea}
              name="text"
              placeholder="Введіть текст"
              value={text}
              onChange={(e) => onTextChange(e.target.value)}
            />
            {errorText && !validForm && (
              <span className={s.errorMessage}>{errorText}</span>
            )}
          </div>
          <div className={s.options}>
            <TextOptionsInputs
              validForm={validForm}
              errorTextHeight={errorTextHeight}
              errorTextWidth={errorTextWidth}
              textWidth={textWidth}
              textHeight={textHeight}
              fontOption={fontOption}
              setFontOption={setFontOption}
              onWidthChange={onWidthChange}
              onHeightChange={onHeightChange}
            />
            <TextPositionAndFormat
              setTextAlign={setTextAlign}
              setLettersFormat={setLettersFormat}
              textAlign={textAlign}
              lettersFormat={lettersFormat}
            />
          </div>
        </div>
        <div>
          <ColorPicker
            textWidth={textWidth}
            textHeight={textHeight}
            color={color}
            setColor={handleColor}
          />

          <div className={clsx(s.ordering, !price && s.withOutWarningText)}>
            {!price && (
              <p className={s.coment}>
                Додайте більше характеристик і перейдіть до оформлення
                замовлення.
              </p>
            )}
            <div className={s.wrapper}>
              <b className={s.price}>
                {numberWithSpaces(Math.round(price))} грн
              </b>

              <button
                aria-label="Price"
                // disabled={!validForm}
                type="submit"
                className={s.btnOpenModal}
              >
                Точна ціна
              </button>
            </div>
          </div>
        </div>
        {price && (
          <div className={s.warrningTextWrapper}>
            <AiFillExclamationCircle
              style={{
                width: "16px",
                height: "16px",
                fill: "#DA1414",
              }}
            />
            <p className={s.warrningText}>
              Ціна не є остаточною. Залиште заявку, щоб отримати точний
              розрахунок. Ми зв'яжемося з вами протягом одного робочого дня.
            </p>
          </div>
        )}
      </form>
    </>
  );
};

export default FormInscription;
