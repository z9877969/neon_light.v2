import { useState } from "react";
// import { Field } from "formik";
import s from "./ColorPiker.module.scss";

export function ColorPicker({ options, setColor, color }) {
  const [activeOptionIdx, setActiveOptionIdx] = useState(0);

  const setActiveOptionsIndAndColor = (index, color) => {
    setActiveOptionIdx(index);
    setColor(color);
  };

  const makeOptionClassName = (index) => {
    return index === activeOptionIdx ? s.activeOption : s.option;
  };

  return (
    <div className={s.container}>
      <div className={s.textWrapper}>
        <p className={s.title}>Колір</p>
        <p className={s.text}>Виберіть колір вашої неонової вивіски</p>
      </div>
      <div className={s.colorPicker}>
        {options.map(({ color }, index) => (
          <button
            key={index}
            className={makeOptionClassName(index)}
            style={{ backgroundColor: color }}
            onClick={() => setActiveOptionsIndAndColor(index, color)}
            type="button"
            name="color"
          />
        ))}
      </div>
      {color && (
        <p className={s.warrningText}>
          Зверніть увагу: колір продукту на вашому екрані може відрізнятися від
          реального через індивідуальні налаштування екрану.
        </p>
      )}
    </div>
  );
}

export default ColorPicker;
