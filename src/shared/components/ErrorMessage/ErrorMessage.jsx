import React from "react";
import { ErrorMessage } from "formik";
import s from "./ErrorMessage.module.scss";

const ErrorMessageField = ({ name }) => {
  return (
    <ErrorMessage name={name} component="div" className={s.errorMessage} />
  );
};

export default ErrorMessageField;
