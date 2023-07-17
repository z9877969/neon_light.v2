import { useEffect, useState } from "react";

import { AiFillExclamationCircle } from "react-icons/ai";
import ColorPicker from "./ColorPicker/ColorPicker";
import TextOptionsInputs from "./TextOptionsInputs/TextOptionsInputs";
import TextPositionAndFormat from "./TextPositionAndFormat/TextPositionAndFormat";
import clsx from "clsx";
import s from "./FormInscription.module.scss";

const FormInscription = ({
  price,
  color,
  font,
  text,
  textWidth,
  textHeight,
  blurHandler,
  textDirty,
  textError,
  widthDirty,
  widthError,
  heightDirty,
  heightError,
  getSelectValue,
  handleColor,
  onChangeSelectValue,
  onTextChange,
  onWidthChange,
  onHeightChange,
  openModal,
  onAlignmentChange,
  onFormatChange,
  alignment,
  format,
}) => {
  const [validForm, setValidForm] = useState(false);

  const numberWithSpaces = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    openModal();
  };

  useEffect(() => {
    if (widthError || heightError || textError) {
      setValidForm(false);
    } else {
      setValidForm(true);
    }
  }, [heightError, textError, widthError]);

  return (
    <>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className={s.textSettings}>
          <div className={s.inputWrapper}>
            <textarea
              onBlur={(e) => blurHandler(e)}
              className={s.textArea}
              name="text"
              placeholder="Введіть текст"
              value={text}
              onChange={onTextChange}
            />
            {textDirty && textError && (
              <span className={s.errorMessage}>{textError}</span>
            )}
          </div>
          <div className={s.options}>
            <TextOptionsInputs
              widthDirty={widthDirty}
              widthError={widthError}
              heightDirty={heightDirty}
              heightError={heightError}
              textWidth={textWidth}
              textHeight={textHeight}
              font={font}
              blurHandler={blurHandler}
              onWidthChange={onWidthChange}
              onHeightChange={onHeightChange}
              getSelectValue={getSelectValue}
              onChangeSelectValue={onChangeSelectValue}
            />
            <TextPositionAndFormat
              onAlignmentChange={onAlignmentChange}
              onFormatChange={onFormatChange}
              alignment={alignment}
              format={format}
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
                disabled={!validForm}
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
