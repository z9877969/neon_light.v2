import React from "react";
import { ErrorMessage } from "formik";

const ErrorMessageField = ({ name, className }) => {
  return <ErrorMessage name={name} component="div" className={className} />;
};

export default ErrorMessageField;
