import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";

import { ReactComponent as IconPin } from "../../images/pin.svg";
import s from "./FormFeedback.module.scss";
import style from "../../shared/components/InputField/InputField.module.scss";
import errorStyle from "../../shared/components/ErrorMessage/ErrorMessage.module.scss";
import { validationSchema } from "./YupValidationSchema";
import InputField from "../../shared/components/InputField/InputField";
import ErrorMessageField from "../../shared/components/ErrorMessage/ErrorMessage";
import CheckBoxGroup from "../../shared/components/CheckBoxGroup/CheckBoxGroup";
import { addOrder } from "../../services/orderAPI";
const initialValues = {
  name: "",
  phone: "",
  email: "",
  comment: "",
  file: null,
  communicateBy: ["email"],
};

const FormFeedback = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];

    setSelectedFile(file);
  };

  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("phone", values.phone);
    formData.append("email", values.email);
    formData.append("comment", values.comment);
    formData.append("file", selectedFile);
    values.communicateBy.forEach((el) => {
      formData.append("communicateBy[]", el);
    });

    try {
      await addOrder(formData);
      toast.success("Ваші дані були успішно надіслані!");
      resetForm();
      setSelectedFile(null);
    } catch (error) {
      toast.error(`Сталась помилка. ${error.response.data.message}`);
    }
  };

  return (
    <>
      <div className={s.FormBox}>
        <p className={s.FormTitle}>Зв’язатися з нами</p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className={s.InputBox}>
              <InputField
                className={style.FormInput}
                name="name"
                placeholder="Ваше ім’я"
              />
              <ErrorMessageField
                className={errorStyle.errorMessage}
                name="name"
              />
            </div>
            <div className={s.InputBox}>
              <InputField
                className={style.FormInput}
                name="phone"
                placeholder="Номер телефону"
              />
              <ErrorMessageField
                className={errorStyle.errorMessage}
                name="phone"
              />
            </div>
            <div className={s.InputBox}>
              <InputField
                className={style.FormInput}
                name="email"
                placeholder="Електронна пошта"
              />
              <ErrorMessageField
                className={errorStyle.errorMessage}
                name="email"
              />
            </div>
            <Field
              className={s.FormTextArea}
              as="textarea"
              name="comment"
              placeholder="Коментар"
            />
            <label htmlFor="file" className={s.FileInputLabel}>
              <IconPin className={s.FileInputIcon} />
              {selectedFile ? (
                <span className={s.FileName}>{selectedFile.name}</span>
              ) : (
                <span className={s.FileName}>
                  "Натисніть тут, якщо ви хочете додати свій файл"
                </span>
              )}
              <Field
                type="file"
                id="file"
                name="file"
                accept=".png, .jpg, .jpeg, .gif"
                className={s.FileInput}
                onChange={handleFileChange}
              />
            </label>
            <p className={s.TextContact}>
              Ви можете зв'язатися з нами за допомогою електронної пошти,
              Telegram або Viber.
            </p>
            <div className={s.CheckBox}>
              <CheckBoxGroup
                name="communicateBy"
                options={[
                  { label: "Email", value: "email", checked: true },
                  { label: "Viber", value: "viber" },
                  { label: "Telegram", value: "telegram" },
                ]}
              />
              <ErrorMessageField
                className={errorStyle.errorMessage}
                name="communicateBy"
              />
            </div>
            <button className={s.Button} type="submit">
              Надіслати
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default FormFeedback;
