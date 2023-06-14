import { Formik, Form, Field } from "formik";
// import * as yup from "yup";
import clsx from "clsx";
import { AiFillExclamationCircle } from "react-icons/ai";
import Options from "./Options/Options";
import TextPositionAndFormat from "./TextPositionAndFormat/TextPositionAndFormat";
import ColorPicker from "./ColorPicker/ColorPicker";
import BtnOpenModal from "../BtnOpenModal/BtnOpenMoadl";
import ErrorMessageField from "../../shared/components/ErrorMessage/ErrorMessage";
import s from "./FormInscription.module.scss";

// const schema = yup.object().shape({
//   positionText: yup.string(),
//   styleText: yup.string(),
//   text: yup.string().required("*Обовязкове поле"),
//   color: yup.string().required("*Обовязкове поле"),
//   font: yup.string().required("*Обовязкове поле"),
//   width: yup.number().max(200, "*максимум 200 см").required("*Обовязкове поле"),
//   height: yup.number().min(6, "*мінімум 6 см").required("*Обовязкове поле"),
// });

const FormInscription = ({
  price,
  color,
  text,
  textWidth,
  textHeight,
  getSelectValue,
  handleColor,
  onChangeSelectValue,
  onTextChange,
  onWidthChange,
  onHeightChange,
  openModal,
}) => {
  const initalValues = {
    font: "comfortaa",
    positionText: "start",
    styleText: "none",
    text: "",
    color: "",
    width: 0,
    height: 0,
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
    openModal();
  };

  return (
    <>
      <Formik
        initialValues={initalValues}
        // validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form autoComplete="off">
          <div className={s.textSettings}>
            <div className={s.inputWrapper}>
              <Field
                className={s.textArea}
                as="textarea"
                name="text"
                placeholder="Введіть текст"
                value={text}
                onChange={handleTextChange}
              />
              <ErrorMessageField className={s.errorMessage} name="text" />
            </div>
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
