import React from "react";
import { Field } from "formik";

const InputField = ({
  name,
  type,
  placeholder,
  className,
  value,
  onChange,
}) => {
  return (
    <Field
      className={className}
      type={type}
      name={name}
      placeholder={placeholder}
      // value={value}
      // onChange={onChange}
    />
  );
};

export default InputField;
