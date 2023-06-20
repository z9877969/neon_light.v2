import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";

import { ReactComponent as IconPin } from "../../images/pin.svg";
import s from "./FormFeedback.module.scss";
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
  file: "",
  communicateBy: ["email"],
};

const FormFeedback = ({
  formInscription,
  positionText,
  styleText,
  color,
  font,
  price,
  width,
  height,
  text,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState("");

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];

    if (file) {
      const supportedFormats = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/gif",
      ];
      const maxSize = 5 * 1024 * 1024;

      if (!supportedFormats.includes(file.type)) {
        setFileError("*Тільки файли з розширеннями png, jpg, jpeg, gif!");
      } else if (file.size > maxSize) {
        setFileError("*Розмір файлу повинен бути не більше 5 МБ!");
      } else {
        setFileError("");
      }
    } else {
      setFileError("");
    }

    setSelectedFile(file);
  };

  const handleSubmit = async (values, { resetForm }) => {
    if (fileError) {
      return;
    }
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("phone", values.phone);
    formData.append("email", values.email);
    formData.append("comment", values.comment);

    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    values.communicateBy.forEach((el) => {
      formData.append("communicateBy[]", el);
    });

    if (formInscription) {
      formData.append("order[positionText]", positionText);
      formData.append("order[styleText]", styleText);
      formData.append("order[color]", color);
      formData.append("order[font]", font);
      formData.append("order[price]", price);
      formData.append("order[width]", width);
      formData.append("order[height]", height);
      formData.append("order[text]", text);
    } else {
      if (!selectedFile) {
        setFileError("*Додайте зображення власного макету!");
        return;
      }
    }

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
              <InputField name="name" placeholder="Ваше ім’я" />
              <ErrorMessageField name="name" />
            </div>
            <div className={s.InputBox}>
              <InputField name="phone" placeholder="Номер телефону" />
              <ErrorMessageField name="phone" />
            </div>
            <div className={s.InputBox}>
              <InputField name="email" placeholder="Електронна пошта" />
              <ErrorMessageField name="email" />
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
              {fileError && (
                <div className={errorStyle.errorMessage}>{fileError}</div>
              )}
            </label>
            <p className={s.TextContact}>
              Ви можете зв'язатися з нами за допомогою електронної пошти,
              Telegram або Viber.
            </p>
            <div className={s.CheckBox}>
              <CheckBoxGroup
                name="communicateBy"
                options={[
                  { label: "Email", value: "email", defaultChecked: true },
                  { label: "Viber", value: "viber" },
                  { label: "Telegram", value: "telegram" },
                ]}
              />
              <ErrorMessageField name="communicateBy" />
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
