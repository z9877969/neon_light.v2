import { Formik, Form, Field } from "formik";
import Options from "./Options/Options";
import TextPositionAndFormat from "./TextPositionAndFormat/TextPositionAndFormat";
import ColorPicker from "./ColorPicker/ColorPicker";
import colorPickerOptions from "./ColorPicker/colorPickerOptions";
import BtnOpenModal from "../BtnOpenModal/BtnOpenMoadl";
import s from "./FormInscription.module.scss";

const initalValues = {
  textarea: "",
  width: 0,
  height: 0,
};

const FormInscription = () => {
  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
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
              name="textarea"
              placeholder="Введіть текст"
            ></Field>
            <div>
              <Options />
              <TextPositionAndFormat />
            </div>
          </div>
          <ColorPicker options={colorPickerOptions} />

          <div className={s.ordering}>
            <p className={s.coment}>
              Додайте більше характеристик і перейдіть до оформлення замовлення.
            </p>
            <div className={s.wrapper}>
              <p>0.00 грн</p>
              <BtnOpenModal type="submit" text="Точна ціна" />
            </div>
          </div>
          <p className={s.warrningText}>
            Ціна не є остаточною. Залиште заявку, щоб отримати точний
            розрахунок. Ми зв'яжемося з вами протягом одного робочого дня.
          </p>
        </Form>
      </Formik>
    </>
  );
};

export default FormInscription;
