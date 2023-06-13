import { useState } from "react";
import s from "./ColorPiker.module.scss";
import clsx from "clsx";

export function ColorPicker({
  options,
  setColor,
  color,
  textWidth,
  textHeight,
}) {
  const [activeOptionIdx, setActiveOptionIdx] = useState(0);

  const setActiveOptionsIndAndColor = (index, color) => {
    setActiveOptionIdx(index);
    setColor(color);
  };

  const makeOptionClassName = (index) => {
    return index === activeOptionIdx ? s.activeOption : s.option;
  };

  const handleWarningText = textWidth || textHeight ? true : false;

  return (
    <div
      className={clsx(s.container, handleWarningText && s.activeWarrningText)}
    >
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
