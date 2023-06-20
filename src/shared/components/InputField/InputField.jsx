import React from "react";
import { Field } from "formik";
import s from "./InputField.module.scss";

const InputField = ({ name, placeholder }) => {
  return (
    <Field
      className={s.FormInput}
      type="text"
      name={name}
      placeholder={placeholder}
    />
  );
};

export default InputField;
