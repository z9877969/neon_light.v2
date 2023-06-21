import React from "react";
import { Field, useField } from "formik";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaViber, FaTelegramPlane } from "react-icons/fa";
import s from "./CheckBoxGroup.module.scss";

const CheckBoxGroup = ({ name, options }) => {
  const [, meta] = useField(name);

  const getIcon = (value) => {
    switch (value) {
      case "email":
        return <MdOutlineMailOutline className={s.CheckBoxIcon} />;
      case "viber":
        return <FaViber className={s.CheckBoxIcon} />;
      case "telegram":
        return <FaTelegramPlane className={s.CheckBoxIcon} />;
      default:
        return null;
    }
  };

  return (
    <>
      {options.map((option) => (
        <label
          htmlFor={option.value}
          key={option.value}
          className={s.CheckBoxLabel}
        >
          <Field
            type="checkbox"
            id={option.value}
            name={name}
            value={option.value}
            checked={meta.value.includes(option.value)}
            className={s.CheckBoxInput}
          />
          <span className={s.CheckBoxCustomInput}>{getIcon(option.value)}</span>
        </label>
      ))}
    </>
  );
};

export default CheckBoxGroup;
