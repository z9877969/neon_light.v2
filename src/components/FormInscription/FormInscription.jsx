import { Formik, Form, Field } from "formik";
import Options from "./Options";
import TextPositionAndFormat from "./TextPositionAndFormat";
import Colorpicker from "./Colorpicker";
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
          <Field
            type="textarea"
            name="textarea"
            placeholder="Введіть текст"
          ></Field>

          <Options />
          <TextPositionAndFormat />

          <Colorpicker />
          <div className={s.ordering}>
            <p className={s.coment}>
              Додайте більше характеристик і перейдіть до оформлення замовлення.
            </p>
            <div className={s.wrapper}>
              <p>0.00 грн</p>
              <BtnOpenModal type="submit" text="Точна ціна" />
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default FormInscription;
