import { Formik, Form, Field } from "formik";
import Options from "./Options/Options";
import TextPositionAndFormat from "./TextPositionAndFormat/TextPositionAndFormat";
import ColorPicker from "./ColorPicker/ColorPicker";
import colorPickerOptions from "./ColorPicker/colorPickerOptions";
import BtnOpenModal from "../BtnOpenModal/BtnOpenMoadl";
import s from "./FormInscription.module.scss";

const FormInscription = ({
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
  onFontChange,
  font,
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

  const handleFontChange = (newFont) => {
    onFontChange(newFont)
  }

  // const numberWithSpaces = (x) => {
  //   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  // };

  const handleSubmit = (values, { resetForm }) => {
    resetForm();
  };

  return (
    <>
      <Formik initialValues={initalValues} onSubmit={handleSubmit}>
        <Form autoComplete="off">
          <div className={s.textSettings}>
            <Field
              className={s.textarea}
              type="textarea"
              name="text"
              placeholder="Введіть текст"
              value={text}
              onChange={handleTextChange}
            ></Field>
            <div className={s.options}>
              <Options
                textWidth={textWidth}
                textHeight={textHeight}
                onWidthChange={handleWidthChange}
                onHeightChange={handleHeightChange}
                onFontChange={handleFontChange}
                font={font}
                getSelectValue={getSelectValue}
                onChangeSelectValue={onChangeSelectValue}
              />
              <TextPositionAndFormat />
            </div>
          </div>
          <div>
            <ColorPicker
              color={color}
              options={colorPickerOptions}
              setColor={handleColor}
            />

            <div className={s.ordering}>
              <p className={s.coment}>
                Додайте більше характеристик і перейдіть до оформлення
                замовлення.
              </p>
              <div className={s.wrapper}>
                <b className={s.price}>
                  {/* {numberWithSpaces(Math.round(state.price))} грн */}
                  0.00 грн
                </b>
                <BtnOpenModal type="submit" text="Точна ціна" />
              </div>
            </div>
          </div>
          {/* <p className={s.warrningText}>
            Ціна не є остаточною. Залиште заявку, щоб отримати точний
            розрахунок. Ми зв'яжемося з вами протягом одного робочого дня.
          </p> */}
        </Form>
      </Formik>
    </>
  );
};

export default FormInscription;
