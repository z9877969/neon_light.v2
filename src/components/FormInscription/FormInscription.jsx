import { Formik, Form } from "formik";
import Options from "./Options/Options";
import TextPositionAndFormat from "./TextPositionAndFormat/TextPositionAndFormat";
import ColorPicker from "./ColorPicker/ColorPicker";
import colorPickerOptions from "./ColorPicker/colorPickerOptions";
import BtnOpenModal from "../BtnOpenModal/BtnOpenMoadl";
import s from "./FormInscription.module.scss";
import InputField from "../../shared/components/InputField/InputField";
import { AiFillExclamationCircle } from "react-icons/ai";
import clsx from "clsx";

const FormInscription = ({
  price,
  color,
  text,
  font,
  textWidth,
  textHeight,
  getSelectValue,
  handleColor,
  onChangeSelectValue,
  onTextChange,
  onWidthChange,
  onHeightChange,
}) => {
  const initalValues = {
    text,
    color,
    font,
    width: textWidth,
    height: textHeight,
  };

  const handleTextChange = (event) => {
    const newText = event.target.value;
    onTextChange(newText);
  };

  const handleWidthChange = (newWidth) => {
    onWidthChange(newWidth);
  };

  const handleHeightChange = (newHeight) => {
    onHeightChange(newHeight);
  };

  const numberWithSpaces = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const handleSubmit = (values, { resetForm }) => {
    resetForm();
  };

  return (
    <>
      <Formik initialValues={initalValues} onSubmit={handleSubmit}>
        <Form autoComplete="off">
          <div className={s.textSettings}>
            <InputField
              className={s.textarea}
              type="textarea"
              name="text"
              placeholder="Введіть текст"
              value={text}
              onChange={handleTextChange}
            />
            <div className={s.options}>
              <Options
                textWidth={textWidth}
                textHeight={textHeight}
                onWidthChange={handleWidthChange}
                onHeightChange={handleHeightChange}
                getSelectValue={getSelectValue}
                onChangeSelectValue={onChangeSelectValue}
              />
              <TextPositionAndFormat />
            </div>
          </div>
          <div>
            <ColorPicker
              textWidth={textWidth}
              textHeight={textHeight}
              color={color}
              options={colorPickerOptions}
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
                <BtnOpenModal type="submit" text="Точна ціна" />
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
        </Form>
      </Formik>
    </>
  );
};

export default FormInscription;
