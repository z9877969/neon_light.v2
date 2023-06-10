import { useState } from "react";
import { Formik, Form, Field } from "formik";
import Options from "./Options/Options";
import TextPositionAndFormat from "./TextPositionAndFormat/TextPositionAndFormat";
import ColorPicker from "./ColorPicker/ColorPicker";
import colorPickerOptions from "./ColorPicker/colorPickerOptions";
import BtnOpenModal from "../BtnOpenModal/BtnOpenMoadl";
import s from "./FormInscription.module.scss";

const initalValues = {
  text: "",
  fonts: "alumini sans",
  width: "",
  height: "",
};

const FormInscription = ({ text, onTextChange }) => {
  const [state, setState] = useState({
    text: "",
    fonts: "",
    width: "",
    height: "",
    color: "",
    price: "",
    positionText: "",
    styleText: "",
  });

  const handleTextChange = (event) => {
    const newText = event.target.value;
    onTextChange(newText); 
  };

  const handleColor = (color) => {
    setState((prevState) => ({ ...prevState, color }));
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    console.log(state);
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
            <div>
              <Options />
              <TextPositionAndFormat />
            </div>
          </div>
          <ColorPicker options={colorPickerOptions} setColor={handleColor} />

          <div className={s.ordering}>
            <p className={s.coment}>
              Додайте більше характеристик і перейдіть до оформлення замовлення.
            </p>
            <div className={s.wrapper}>
              <p>0.00 грн</p>
              <BtnOpenModal type="submit" text="Точна ціна" />
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
